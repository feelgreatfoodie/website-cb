'use client';

import { useState, useEffect, useCallback } from 'react';
import { create } from 'zustand';

const STORAGE_KEY = 'cb-reduced-motion';

interface ReducedMotionStore {
  /** User's manual override: true = off, false = on, null = follow OS */
  override: boolean | null;
  setOverride: (value: boolean | null) => void;
}

export const useReducedMotionStore = create<ReducedMotionStore>((set) => ({
  override: null,
  setOverride: (value) => {
    if (value === null) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, value ? '1' : '0');
    }
    set({ override: value });
  },
}));

/**
 * Returns true if reduced motion should be active.
 * Priority: manual override > OS preference.
 */
function getOsPreference() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useReducedMotion(): boolean {
  const override = useReducedMotionStore((s) => s.override);
  const [osPrefers, setOsPrefers] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      useReducedMotionStore.setState({ override: stored === '1' });
    }
  }, []);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setOsPrefers(mql.matches);

    const handler = (e: MediaQueryListEvent) => setOsPrefers(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return override !== null ? override : osPrefers;
}

/**
 * Hook for the toggle button — returns current state and a toggle function.
 */
export function useReducedMotionToggle() {
  const setOverride = useReducedMotionStore((s) => s.setOverride);
  const isReduced = useReducedMotion();

  const toggle = useCallback(() => {
    // If currently reduced, turn animations on (override = false)
    // If currently not reduced, turn animations off (override = true)
    setOverride(!isReduced);
  }, [isReduced, setOverride]);

  return { isReduced, toggle };
}

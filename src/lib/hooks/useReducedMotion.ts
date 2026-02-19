'use client';

import { useSyncExternalStore } from 'react';
import { useEffect, useCallback } from 'react';
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

function subscribeMotion(callback: () => void) {
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getMotionServerSnapshot() {
  return false;
}

/**
 * Returns true if reduced motion should be active.
 * Priority: manual override > OS preference.
 */
export function useReducedMotion(): boolean {
  const override = useReducedMotionStore((s) => s.override);
  const osPrefers = useSyncExternalStore(subscribeMotion, getMotionSnapshot, getMotionServerSnapshot);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      useReducedMotionStore.setState({ override: stored === '1' });
    }
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
    setOverride(!isReduced);
  }, [isReduced, setOverride]);

  return { isReduced, toggle };
}

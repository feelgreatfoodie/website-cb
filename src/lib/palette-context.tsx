'use client';

import {
  createContext,
  useContext,
  useSyncExternalStore,
  useMemo,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import {
  type PaletteColors,
  hexToInt,
  getPalette,
} from '@/config/palettes';

const STORAGE_KEY = 'cb-palette-id';

interface PaletteContext {
  paletteId: string;
  colors: PaletteColors;
  int: Record<keyof PaletteColors, number>;
  switchPalette: (id: string) => void;
}

const Ctx = createContext<PaletteContext | null>(null);

function applyColorsToDOM(colors: PaletteColors) {
  const root = document.documentElement;
  root.style.setProperty('--background', colors.background);
  root.style.setProperty('--background-light', colors.backgroundLight);
  root.style.setProperty('--accent', colors.accent);
  root.style.setProperty('--cta', colors.cta);
  root.style.setProperty('--foreground', colors.foreground);
  root.style.setProperty('--stream1', colors.stream1);
  root.style.setProperty('--stream2', colors.stream2);
  root.style.setProperty('--stream3', colors.stream3);
}

function computeInts(colors: PaletteColors) {
  return Object.fromEntries(
    Object.entries(colors).map(([k, v]) => [k, hexToInt(v)])
  ) as Record<keyof PaletteColors, number>;
}

function subscribePalette(callback: () => void) {
  window.addEventListener('cb-palette-change', callback);
  return () => window.removeEventListener('cb-palette-change', callback);
}

function getStoredPaletteId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServerPaletteId(): string | null {
  return null;
}

export function ThemeProvider({
  paletteId: serverPaletteId,
  colors: serverColors,
  children,
}: {
  paletteId: string;
  colors: PaletteColors;
  children: ReactNode;
}) {
  const storedId = useSyncExternalStore(subscribePalette, getStoredPaletteId, getServerPaletteId);

  const activePaletteId = useMemo(() => {
    if (storedId && storedId !== serverPaletteId) {
      const palette = getPalette(storedId);
      if (palette.id === storedId) return storedId;
    }
    return serverPaletteId;
  }, [storedId, serverPaletteId]);

  const activeColors = useMemo(() => {
    if (activePaletteId !== serverPaletteId) {
      return getPalette(activePaletteId).colors;
    }
    return serverColors;
  }, [activePaletteId, serverPaletteId, serverColors]);

  const activeInt = useMemo(() => computeInts(activeColors), [activeColors]);

  // Apply CSS variables when palette changes from server default
  useEffect(() => {
    if (activePaletteId !== serverPaletteId) {
      applyColorsToDOM(activeColors);
    }
  }, [activePaletteId, serverPaletteId, activeColors]);

  const switchPalette = useCallback((id: string) => {
    const palette = getPalette(id);
    applyColorsToDOM(palette.colors);
    try {
      localStorage.setItem(STORAGE_KEY, palette.id);
    } catch {
      // localStorage unavailable
    }
    window.dispatchEvent(new Event('cb-palette-change'));
  }, []);

  return (
    <Ctx.Provider value={{ paletteId: activePaletteId, colors: activeColors, int: activeInt, switchPalette }}>
      {children}
    </Ctx.Provider>
  );
}

export function usePalette() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('usePalette must be used within ThemeProvider');
  return ctx;
}

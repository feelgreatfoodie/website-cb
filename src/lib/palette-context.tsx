'use client';

import {
  createContext,
  useContext,
  useState,
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

export function ThemeProvider({
  paletteId: serverPaletteId,
  colors: serverColors,
  children,
}: {
  paletteId: string;
  colors: PaletteColors;
  children: ReactNode;
}) {
  const [paletteId, setPaletteId] = useState(serverPaletteId);
  const [colors, setColors] = useState(serverColors);
  const [int, setInt] = useState(() => computeInts(serverColors));

  // Hydrate localStorage palette override after mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && stored !== serverPaletteId) {
        const palette = getPalette(stored);
        if (palette.id === stored) {
          setPaletteId(stored);
          setColors(palette.colors);
          setInt(computeInts(palette.colors));
          applyColorsToDOM(palette.colors);
        }
      }
    } catch { /* localStorage unavailable */ }
  }, [serverPaletteId]);

  const switchPalette = useCallback((id: string) => {
    const palette = getPalette(id);
    setPaletteId(palette.id);
    setColors(palette.colors);
    setInt(computeInts(palette.colors));
    applyColorsToDOM(palette.colors);
    try {
      localStorage.setItem(STORAGE_KEY, palette.id);
    } catch {
      // localStorage unavailable
    }
  }, []);

  return (
    <Ctx.Provider value={{ paletteId, colors, int, switchPalette }}>
      {children}
    </Ctx.Provider>
  );
}

export function usePalette() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('usePalette must be used within ThemeProvider');
  return ctx;
}

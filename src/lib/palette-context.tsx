'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { type PaletteColors, hexToInt } from '@/config/palettes';

interface PaletteContext {
  colors: PaletteColors;
  /** Three.js integer colors for use in shaders/materials */
  int: Record<keyof PaletteColors, number>;
}

const Ctx = createContext<PaletteContext | null>(null);

export function ThemeProvider({
  colors,
  children,
}: {
  colors: PaletteColors;
  children: ReactNode;
}) {
  const int = Object.fromEntries(
    Object.entries(colors).map(([k, v]) => [k, hexToInt(v)])
  ) as Record<keyof PaletteColors, number>;

  return <Ctx.Provider value={{ colors, int }}>{children}</Ctx.Provider>;
}

export function usePalette(): PaletteContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('usePalette must be used within ThemeProvider');
  return ctx;
}

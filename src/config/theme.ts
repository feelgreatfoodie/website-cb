/**
 * Legacy theme re-exports — components that still import from here
 * get the default palette values. Prefer using usePalette() context
 * or Tailwind semantic classes instead.
 */
export { palettes, getPalette, getAllPalettes, hexToInt, DEFAULT_PALETTE_ID } from './palettes';
export type { PaletteColors, Palette } from './palettes';

import { palettes } from './palettes';

const defaultColors = palettes[0].colors;

/** @deprecated Use Tailwind semantic classes or usePalette() */
export const colors = {
  portoDusk: defaultColors.background,
  portoDuskLight: defaultColors.backgroundLight,
  riverReflection: defaultColors.accent,
  terracotta: defaultColors.cta,
  mistWhite: defaultColors.foreground,
  streamCyan: defaultColors.stream1,
  streamMagenta: defaultColors.stream2,
  streamGold: defaultColors.stream3,
} as const;

/** @deprecated Use usePalette() + computed glow styles */
export const glows = {
  river: `0 0 20px color-mix(in srgb, var(--accent) 40%, transparent), 0 0 60px color-mix(in srgb, var(--accent) 20%, transparent)`,
  terracotta: `0 0 20px color-mix(in srgb, var(--cta) 40%, transparent), 0 0 60px color-mix(in srgb, var(--cta) 20%, transparent)`,
  cyan: `0 0 20px color-mix(in srgb, var(--stream1) 40%, transparent), 0 0 60px color-mix(in srgb, var(--stream1) 20%, transparent)`,
  magenta: `0 0 20px color-mix(in srgb, var(--stream2) 40%, transparent), 0 0 60px color-mix(in srgb, var(--stream2) 20%, transparent)`,
  gold: `0 0 20px color-mix(in srgb, var(--stream3) 40%, transparent), 0 0 60px color-mix(in srgb, var(--stream3) 20%, transparent)`,
} as const;

/** @deprecated Use usePalette() for dynamic gradient strings */
export const gradients = {
  heroBg: `linear-gradient(180deg, var(--background) 0%, var(--background-light) 100%)`,
  riverStatic: `linear-gradient(135deg, var(--background) 0%, color-mix(in srgb, var(--accent) 20%, transparent) 50%, var(--background) 100%)`,
} as const;

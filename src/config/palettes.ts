export interface PaletteColors {
  background: string;
  backgroundLight: string;
  accent: string;
  cta: string;
  foreground: string;
  stream1: string;
  stream2: string;
  stream3: string;
}

export interface Palette {
  id: string;
  name: string;
  category: 'portuguese' | 'tech';
  colors: PaletteColors;
}

export const palettes: Palette[] = [
  {
    id: 'porto-data-streams',
    name: 'Porto Data Streams',
    category: 'portuguese',
    colors: {
      background: '#2E004B',
      backgroundLight: '#4B0082',
      accent: '#1E90FF',
      cta: '#E2725B',
      foreground: '#F8F9FA',
      stream1: '#00FFFF',
      stream2: '#FF00FF',
      stream3: '#FFD700',
    },
  },
  {
    id: 'azulejo-algorithms',
    name: 'Azulejo Algorithms',
    category: 'portuguese',
    colors: {
      background: '#0A1628',
      backgroundLight: '#132244',
      accent: '#0047AB',
      cta: '#FFB800',
      foreground: '#F2F7FF',
      stream1: '#0047AB',
      stream2: '#2F4F4F',
      stream3: '#FFB800',
    },
  },
  {
    id: 'nazare-wavefronts',
    name: 'Nazaré Wavefronts',
    category: 'portuguese',
    colors: {
      background: '#0A2342',
      backgroundLight: '#133366',
      accent: '#20B2AA',
      cta: '#FF5733',
      foreground: '#F8F9FA',
      stream1: '#20B2AA',
      stream2: '#FF5733',
      stream3: '#4DC8E0',
    },
  },
  {
    id: 'pastel-de-nata',
    name: 'Pastel de Nata',
    category: 'portuguese',
    colors: {
      background: '#1A120B',
      backgroundLight: '#2D1F14',
      accent: '#E3A018',
      cta: '#00CED1',
      foreground: '#FFF4BC',
      stream1: '#00CED1',
      stream2: '#E3A018',
      stream3: '#8B6E52',
    },
  },
  {
    id: 'autumn-ai',
    name: 'Autumn AI',
    category: 'tech',
    colors: {
      background: '#1A0E05',
      backgroundLight: '#2E1A0A',
      accent: '#DAA520',
      cta: '#00E5FF',
      foreground: '#FDF5E6',
      stream1: '#00E5FF',
      stream2: '#DAA520',
      stream3: '#C46B2D',
    },
  },
  {
    id: 'forest-floor',
    name: 'Forest Floor',
    category: 'tech',
    colors: {
      background: '#1B241B',
      backgroundLight: '#2A3A2A',
      accent: '#4F7942',
      cta: '#7FFFD4',
      foreground: '#E8F5E8',
      stream1: '#7FFFD4',
      stream2: '#4F7942',
      stream3: '#B87333',
    },
  },
  {
    id: 'mediterranean-code',
    name: 'Mediterranean Code',
    category: 'tech',
    colors: {
      background: '#001A33',
      backgroundLight: '#003355',
      accent: '#008080',
      cta: '#FF4500',
      foreground: '#F5F5DC',
      stream1: '#008080',
      stream2: '#FF4500',
      stream3: '#4488AA',
    },
  },
  {
    id: 'oceanic-insights',
    name: 'Oceanic Insights',
    category: 'tech',
    colors: {
      background: '#001F3F',
      backgroundLight: '#003060',
      accent: '#00FFEF',
      cta: '#FF7F50',
      foreground: '#F0F8FF',
      stream1: '#00FFEF',
      stream2: '#FF7F50',
      stream3: '#4ECDC4',
    },
  },
];

export const DEFAULT_PALETTE_ID = 'porto-data-streams';

export function getPalette(id: string): Palette {
  return palettes.find((p) => p.id === id) ?? palettes[0];
}

export function getAllPalettes(): Palette[] {
  return palettes;
}

/** Convert a hex string like '#FF00FF' to a Three.js integer like 0xFF00FF */
export function hexToInt(hex: string): number {
  return parseInt(hex.replace('#', ''), 16);
}

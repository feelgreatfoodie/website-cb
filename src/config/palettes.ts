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
    id: 'pastel-de-nata',
    name: 'Pastel de Nata',
    category: 'portuguese',
    colors: {
      background: '#FFF8F0',
      backgroundLight: '#F5EDE3',
      accent: '#E3A018',
      cta: '#00CED1',
      foreground: '#2C1810',
      stream1: '#00CED1',
      stream2: '#E3A018',
      stream3: '#8B6E52',
    },
  },
];

export const DEFAULT_PALETTE_ID = 'nazare-wavefronts';

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

export const onesheetMap: Record<string, string> = {
  'azulejo-algorithms': '/onesheets/onesheeter-azulejo-algorithms.pdf',
  'nazare-wavefronts': '/onesheets/onesheeter-nazare-wavefronts.pdf',
  'pastel-de-nata': '/onesheets/onesheeter-pastel-de-nata.pdf',
};

export const onesheetPreviewMap: Record<string, string> = {
  'azulejo-algorithms': '/onesheet-previews/preview-azulejo-algorithms.png',
  'nazare-wavefronts': '/onesheet-previews/preview-nazare-wavefronts.png',
  'pastel-de-nata': '/onesheet-previews/preview-pastel-de-nata.png',
};

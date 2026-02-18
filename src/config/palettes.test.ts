import { describe, it, expect } from 'vitest';
import {
  palettes,
  getPalette,
  getAllPalettes,
  hexToInt,
  DEFAULT_PALETTE_ID,
} from './palettes';

describe('palettes', () => {
  it('exports at least one palette', () => {
    expect(palettes.length).toBeGreaterThan(0);
  });

  it('every palette has all required color keys', () => {
    const requiredKeys = [
      'background',
      'backgroundLight',
      'accent',
      'cta',
      'foreground',
      'stream1',
      'stream2',
      'stream3',
    ];
    for (const p of palettes) {
      for (const key of requiredKeys) {
        expect(p.colors).toHaveProperty(key);
        expect(p.colors[key as keyof typeof p.colors]).toMatch(/^#[0-9A-Fa-f]{6}$/);
      }
    }
  });

  it('every palette has a unique id', () => {
    const ids = palettes.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every palette category is valid', () => {
    for (const p of palettes) {
      expect(['portuguese', 'tech']).toContain(p.category);
    }
  });
});

describe('getPalette', () => {
  it('returns the correct palette for a valid id', () => {
    const palette = getPalette('nazare-wavefronts');
    expect(palette.id).toBe('nazare-wavefronts');
    expect(palette.name).toBe('Nazaré Wavefronts');
  });

  it('falls back to first palette for unknown id', () => {
    const palette = getPalette('nonexistent-palette');
    expect(palette.id).toBe(palettes[0].id);
  });

  it('returns the default palette by DEFAULT_PALETTE_ID', () => {
    const palette = getPalette(DEFAULT_PALETTE_ID);
    expect(palette.id).toBe(DEFAULT_PALETTE_ID);
  });
});

describe('getAllPalettes', () => {
  it('returns all palettes', () => {
    expect(getAllPalettes()).toEqual(palettes);
  });
});

describe('hexToInt', () => {
  it('converts white', () => {
    expect(hexToInt('#FFFFFF')).toBe(0xffffff);
  });

  it('converts black', () => {
    expect(hexToInt('#000000')).toBe(0x000000);
  });

  it('converts a color', () => {
    expect(hexToInt('#1E90FF')).toBe(0x1e90ff);
  });

  it('handles lowercase', () => {
    expect(hexToInt('#ff00ff')).toBe(0xff00ff);
  });
});

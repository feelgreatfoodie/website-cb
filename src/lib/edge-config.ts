import { createClient } from '@vercel/edge-config';
import { DEFAULT_PALETTE_ID } from '@/config/palettes';

const edgeConfig = process.env.EDGE_CONFIG
  ? createClient(process.env.EDGE_CONFIG)
  : null;

export async function getActivePaletteId(): Promise<string> {
  try {
    if (!edgeConfig) return DEFAULT_PALETTE_ID;
    const id = await edgeConfig.get<string>('activePaletteId');
    return id ?? DEFAULT_PALETTE_ID;
  } catch {
    return DEFAULT_PALETTE_ID;
  }
}

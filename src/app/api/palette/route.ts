import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getPalette } from '@/config/palettes';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { paletteId } = (await req.json()) as { paletteId: string };
  const palette = getPalette(paletteId);
  if (!palette) {
    return NextResponse.json({ error: 'Invalid palette' }, { status: 400 });
  }

  const edgeConfigId = process.env.EDGE_CONFIG_ID;
  const vercelToken = process.env.VERCEL_API_TOKEN;

  if (!edgeConfigId || !vercelToken) {
    return NextResponse.json(
      { error: 'Edge Config not configured' },
      { status: 500 }
    );
  }

  const res = await fetch(
    `https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${vercelToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            operation: 'upsert',
            key: 'activePaletteId',
            value: paletteId,
          },
        ],
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: 'Failed to update Edge Config', detail: text },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, paletteId });
}

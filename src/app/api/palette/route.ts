import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { palettes } from '@/config/palettes';

const paletteSchema = z.object({
  paletteId: z.string().refine(
    (id) => palettes.some((p) => p.id === id),
    { message: 'Invalid palette ID.' }
  ),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const result = paletteSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.issues[0]?.message ?? 'Invalid input.' }, { status: 400 });
  }

  const { paletteId } = result.data;

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
    console.error('Edge Config update failed:', text);
    return NextResponse.json(
      { error: 'Failed to update Edge Config' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, paletteId });
}

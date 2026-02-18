'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { type Palette } from '@/config/palettes';

export function PaletteGrid({
  palettes,
  activePaletteId,
}: {
  palettes: Palette[];
  activePaletteId: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [applying, setApplying] = useState<string | null>(null);

  const handleApply = async (id: string) => {
    setApplying(id);
    const res = await fetch('/api/palette', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paletteId: id }),
    });

    if (res.ok) {
      startTransition(() => router.refresh());
    }
    setApplying(null);
  };

  const categories = ['portuguese'] as const;

  return (
    <div className="space-y-10">
      {categories.map((cat) => (
        <div key={cat}>
          <h2 className="mb-4 font-mono text-xs tracking-[0.3em] uppercase text-foreground/40">
            Portuguese Heritage
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {palettes
              .filter((p) => p.category === cat)
              .map((palette) => {
                const isActive = palette.id === activePaletteId;
                const isApplying = applying === palette.id;
                const c = palette.colors;

                return (
                  <div
                    key={palette.id}
                    className="relative overflow-hidden rounded-xl border transition-all duration-200"
                    style={{
                      background: c.background,
                      borderColor: isActive ? c.accent : `${c.accent}33`,
                    }}
                  >
                    {/* Color swatches */}
                    <div className="flex h-16">
                      {Object.entries(c).map(([key, hex]) => (
                        <div
                          key={key}
                          className="flex-1"
                          style={{ background: hex }}
                          title={`${key}: ${hex}`}
                        />
                      ))}
                    </div>

                    {/* Info + preview */}
                    <div className="p-4">
                      <h3
                        className="mb-1 font-mono text-sm font-bold"
                        style={{ color: c.foreground }}
                      >
                        {palette.name}
                      </h3>

                      {/* Mini preview */}
                      <div
                        className="mb-3 mt-2 rounded-md p-3"
                        style={{ background: c.backgroundLight }}
                      >
                        <div
                          className="mb-1 font-mono text-[10px] tracking-wider"
                          style={{ color: c.accent }}
                        >
                          PREVIEW
                        </div>
                        <div className="flex gap-2">
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ background: c.stream1 }}
                          />
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ background: c.stream2 }}
                          />
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ background: c.stream3 }}
                          />
                        </div>
                        <div
                          className="mt-1 font-mono text-[10px]"
                          style={{ color: c.foreground }}
                        >
                          Sample text
                        </div>
                        <div
                          className="mt-1 inline-block rounded px-2 py-0.5 font-mono text-[10px]"
                          style={{ background: c.cta, color: c.background }}
                        >
                          CTA
                        </div>
                      </div>

                      {/* Apply button */}
                      <button
                        onClick={() => handleApply(palette.id)}
                        disabled={isActive || isPending}
                        className="mt-2 w-full rounded-md px-3 py-1.5 font-mono text-xs tracking-wider transition-all duration-200 disabled:opacity-40"
                        style={{
                          background: isActive ? 'transparent' : c.cta,
                          color: isActive ? c.accent : c.background,
                          border: isActive
                            ? `1px solid ${c.accent}44`
                            : 'none',
                        }}
                      >
                        {isApplying
                          ? 'Applying...'
                          : isActive
                            ? 'Active'
                            : 'Apply'}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { palettes } from '@/config/palettes';
import { usePalette } from '@/lib/palette-context';
import { trackEvent } from '@/lib/analytics';
import { useToast } from '@/components/ui/Toast';

function PaletteSwatch({ colors }: { colors: { background: string; accent: string; cta: string; stream1: string } }) {
  return (
    <div className="flex gap-0.5">
      <span className="h-3 w-3 rounded-full" style={{ background: colors.background, border: '1px solid rgba(255,255,255,0.15)' }} />
      <span className="h-3 w-3 rounded-full" style={{ background: colors.accent }} />
      <span className="h-3 w-3 rounded-full" style={{ background: colors.cta }} />
      <span className="h-3 w-3 rounded-full" style={{ background: colors.stream1 }} />
    </div>
  );
}

export function PaletteSwitcher() {
  const { paletteId, switchPalette } = usePalette();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const toast = useToast();

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  const current = palettes.find((p) => p.id === paletteId) ?? palettes[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-accent/20 bg-transparent px-3 py-1.5 font-mono text-[11px] tracking-wider text-foreground/60 transition-all hover:border-accent/40 hover:text-foreground/90"
        aria-label="Switch color palette"
        aria-expanded={open}
      >
        <PaletteSwatch colors={current.colors} />
        <span className="hidden xl:inline">{current.name}</span>
        <svg
          className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path d="M3 5l3 3 3-3" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="glass absolute right-0 top-full z-50 mt-2 w-[calc(100vw-2rem)] max-w-64 overflow-hidden rounded-xl p-2 shadow-2xl sm:w-64"
          >
            <p className="mb-2 px-2 pt-1 font-mono text-[11px] tracking-[0.3em] text-foreground/30">
              CHOOSE YOUR PALETTE
            </p>
            {palettes.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  trackEvent('palette_switch', { palette_id: p.id });
                  switchPalette(p.id);
                  toast(`Palette: ${p.name}`);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-all hover:bg-accent/10 ${
                  p.id === paletteId ? 'bg-accent/15' : ''
                }`}
              >
                <PaletteSwatch colors={p.colors} />
                <span className="font-mono text-xs text-foreground/80">{p.name}</span>
                {p.id === paletteId && (
                  <svg className="ml-auto h-3 w-3 text-accent" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M10 3L4.5 8.5 2 6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

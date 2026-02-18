'use client';

import { m } from 'framer-motion';
import { fadeInUp } from '@/lib/animations/scroll-variants';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export function AvailabilityPill({ status }: { status: string }) {
  const reducedMotion = useReducedMotion();

  if (!status) return null;

  return (
    <m.div variants={fadeInUp} className="mb-6 flex justify-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-background/40 px-4 py-1.5 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
          {!reducedMotion && (
            <m.span
              className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
              animate={{ scale: [1, 2], opacity: [0.75, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wider text-foreground/60">
          {status}
        </span>
      </div>
    </m.div>
  );
}

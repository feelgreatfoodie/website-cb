'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { timeline, type TimelineEntry } from '@/config/timeline';
import { cn } from '@/lib/utils/cn';
import { fadeInUp } from '@/lib/animations/scroll-variants';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

const streamColors: Record<TimelineEntry['stream'], string> = {
  data: 'var(--stream1)',
  sales: 'var(--stream2)',
  poker: 'var(--stream3)',
};

export function Timeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  const handleToggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const expanded = expandedIndex !== null ? timeline[expandedIndex] : null;

  return (
    <m.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="w-full"
    >
      {/* Desktop: horizontal inline layout */}
      <div className="hidden sm:block">
        <div className="relative flex items-center justify-between px-2">
          {/* Connecting line spanning full width */}
          <div className="absolute left-2 right-2 top-1/2 h-px -translate-y-1/2 bg-foreground/15" />

          {timeline.map((entry, index) => {
            const isLast = index === timeline.length - 1;
            const isActive = expandedIndex === index;

            return (
              <button
                key={`${entry.year}-${entry.org}`}
                onClick={() => handleToggle(index)}
                className={cn(
                  'group relative z-10 flex flex-col items-center gap-2',
                  'focus-visible:outline-none'
                )}
                aria-label={`${entry.year} — ${entry.title} at ${entry.org}`}
                aria-expanded={isActive}
              >
                {/* Year label */}
                <span
                  className={cn(
                    'font-mono text-[11px] transition-colors duration-200',
                    isActive ? 'text-foreground font-semibold' : 'text-foreground/50'
                  )}
                >
                  {entry.year}
                </span>

                {/* Node dot */}
                <span className="relative flex items-center justify-center">
                  <span
                    className={cn(
                      'block rounded-full transition-all duration-300',
                      isActive ? 'h-4 w-4' : 'h-3 w-3 group-hover:h-3.5 group-hover:w-3.5'
                    )}
                    style={{ backgroundColor: streamColors[entry.stream] }}
                  />
                  {/* Focus ring */}
                  <span
                    className="absolute inset-[-4px] rounded-full opacity-0 ring-2 ring-accent group-focus-visible:opacity-100"
                  />
                  {/* Pulse on last node */}
                  {isLast && !reducedMotion && (
                    <m.span
                      className="absolute inset-[-3px] rounded-full border"
                      style={{ borderColor: streamColors[entry.stream] }}
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                </span>

                {/* Title label */}
                <span
                  className={cn(
                    'max-w-[90px] text-center font-mono text-[11px] leading-tight transition-colors duration-200',
                    isActive ? 'text-foreground/90' : 'text-foreground/40 group-hover:text-foreground/60'
                  )}
                >
                  {entry.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Expanded detail card (desktop) */}
        <AnimatePresence mode="wait">
          {expanded && expandedIndex !== null && (
            <m.div
              key={expandedIndex}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-6 glass rounded-lg border border-accent/20 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-mono text-sm font-semibold text-foreground">
                    {expanded.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-foreground/60">
                    {expanded.org}
                    <span className="mx-2 text-foreground/20">·</span>
                    {expanded.year}–{expanded.endYear ?? expanded.year}
                  </p>
                </div>
                <span
                  className="rounded px-2 py-1 font-mono text-[11px] font-medium"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${streamColors[expanded.stream]} 20%, transparent)`,
                    color: streamColors[expanded.stream],
                  }}
                >
                  {expanded.stream.charAt(0).toUpperCase() + expanded.stream.slice(1)}
                </span>
              </div>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {expanded.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-foreground/70">
                    <span
                      className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: streamColors[expanded.stream] }}
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile: vertical compact layout */}
      <div className="sm:hidden">
        <div className="relative ml-4 border-l border-foreground/15 pl-6">
          {timeline.map((entry, index) => {
            const isLast = index === timeline.length - 1;
            const isActive = expandedIndex === index;

            return (
              <div key={`${entry.year}-${entry.org}`} className="relative pb-6 last:pb-0">
                {/* Node dot on the line */}
                <span className="absolute -left-6 top-0.5 flex -translate-x-1/2 items-center justify-center">
                  <span
                    className={cn(
                      'block rounded-full transition-all duration-300',
                      isActive ? 'h-3.5 w-3.5' : 'h-2.5 w-2.5'
                    )}
                    style={{ backgroundColor: streamColors[entry.stream] }}
                  />
                  {isLast && !reducedMotion && (
                    <m.span
                      className="absolute inset-[-3px] rounded-full border"
                      style={{ borderColor: streamColors[entry.stream] }}
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                </span>

                <button
                  onClick={() => handleToggle(index)}
                  className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:rounded"
                  aria-label={`${entry.year} — ${entry.title} at ${entry.org}`}
                  aria-expanded={isActive}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-foreground/50">
                      {entry.year}
                    </span>
                    <span
                      className={cn(
                        'font-mono text-xs transition-colors',
                        isActive ? 'text-foreground' : 'text-foreground/70'
                      )}
                    >
                      {entry.title}
                    </span>
                  </div>
                  <p className="mt-0.5 font-mono text-[11px] text-foreground/40">
                    {entry.org}
                  </p>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <m.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-3 space-y-1.5">
                        {entry.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-[11px] text-foreground/60">
                            <span
                              className="mt-1 h-1 w-1 flex-shrink-0 rounded-full"
                              style={{ backgroundColor: streamColors[entry.stream] }}
                            />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </m.div>
  );
}

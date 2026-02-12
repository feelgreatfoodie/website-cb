'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timeline, type TimelineEntry } from '@/config/timeline';
import { cn } from '@/lib/utils/cn';
import { fadeInUp } from '@/lib/animations/scroll-variants';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

const streamColors: Record<TimelineEntry['stream'], string> = {
  data: 'var(--stream1)',
  sales: 'var(--stream2)',
  poker: 'var(--stream3)',
};

interface TimelineNodeProps {
  entry: TimelineEntry;
  isLast: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

function TimelineNode({ entry, isLast, isExpanded, onToggle }: TimelineNodeProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col items-center min-w-[200px] snap-center">
      {/* Circle node */}
      <button
        onClick={onToggle}
        className={cn(
          'relative w-20 h-20 rounded-full flex items-center justify-center',
          'border-2 transition-all duration-300',
          'hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
          'group'
        )}
        style={{
          borderColor: streamColors[entry.stream],
          backgroundColor: isExpanded ? streamColors[entry.stream] : 'transparent',
        }}
        aria-label={`${entry.year} - ${entry.title}`}
        aria-expanded={isExpanded}
      >
        <span
          className={cn(
            'text-sm font-bold transition-colors',
            isExpanded ? 'text-background' : 'text-foreground'
          )}
        >
          {entry.year}
        </span>

        {/* Pulsing ring for current (last) entry */}
        {isLast && !reducedMotion && (
          <motion.span
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: streamColors[entry.stream] }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </button>

      {/* Title */}
      <h3 className="mt-4 text-sm font-semibold text-center text-foreground/90 max-w-[180px]">
        {entry.title}
      </h3>

      {/* Expanded detail card */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 w-[280px] glass rounded-lg p-4 border border-accent/20"
          >
            {/* Organization */}
            <p className="text-xs text-foreground/70 mb-2">{entry.org}</p>

            {/* Stream badge */}
            <div
              className="inline-block px-2 py-1 rounded text-[11px] font-medium mb-3"
              style={{
                backgroundColor: `${streamColors[entry.stream]}33`,
                color: streamColors[entry.stream],
              }}
            >
              {entry.stream.charAt(0).toUpperCase() + entry.stream.slice(1)}
            </div>

            {/* Highlights */}
            <ul className="space-y-2">
              {entry.highlights.map((highlight, idx) => (
                <li key={idx} className="text-[11px] text-foreground/80 flex items-start gap-2">
                  <span
                    className="mt-1 w-1 h-1 rounded-full flex-shrink-0"
                    style={{ backgroundColor: streamColors[entry.stream] }}
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Timeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="w-full"
    >
      {/* Horizontal scroll container - desktop */}
      <div className="hidden sm:block overflow-x-auto scrollbar-thin scrollbar-thumb-accent/20 scrollbar-track-transparent">
        <div className="flex gap-8 min-w-max px-4 py-8 snap-x snap-mandatory">
          {timeline.map((entry, index) => (
            <div key={entry.year} className="relative flex items-center">
              <TimelineNode
                entry={entry}
                isLast={index === timeline.length - 1}
                isExpanded={expandedIndex === index}
                onToggle={() => handleToggle(index)}
              />

              {/* Connecting line */}
              {index < timeline.length - 1 && (
                <div
                  className="absolute left-[calc(100%-2rem)] top-10 w-8 h-0.5"
                  style={{
                    backgroundColor: streamColors[timeline[index + 1].stream],
                    opacity: 0.3,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Vertical stack - mobile */}
      <div className="sm:hidden flex flex-col gap-8 px-4 py-8">
        {timeline.map((entry, index) => (
          <div key={entry.year} className="relative flex flex-col items-center">
            <TimelineNode
              entry={entry}
              isLast={index === timeline.length - 1}
              isExpanded={expandedIndex === index}
              onToggle={() => handleToggle(index)}
            />

            {/* Connecting line - vertical */}
            {index < timeline.length - 1 && (
              <div
                className="absolute top-20 w-0.5 h-8"
                style={{
                  backgroundColor: streamColors[timeline[index + 1].stream],
                  opacity: 0.3,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

'use client';

import { m } from 'framer-motion';

const categoryColorVar: Record<string, string> = {
  language: 'var(--stream1)',
  cloud: 'var(--stream2)',
  data: 'var(--stream3)',
  ai: 'var(--accent)',
};

interface SkillPillProps {
  name: string;
  category: string;
  index: number;
}

export function SkillPill({ name, category, index }: SkillPillProps) {
  const color = categoryColorVar[category] ?? 'var(--accent)';

  return (
    <m.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{
        scale: 1.08,
        boxShadow: `0 0 16px color-mix(in srgb, ${color} 40%, transparent)`,
      }}
      className="inline-flex items-center rounded-full px-3 py-1.5 font-mono text-[11px] font-semibold tracking-wide transition-shadow sm:px-4 sm:py-2 sm:text-xs"
      style={{
        border: `1px solid color-mix(in srgb, ${color} 40%, transparent)`,
        background: `color-mix(in srgb, ${color} 10%, transparent)`,
        color: color,
      }}
    >
      {name}
    </m.span>
  );
}

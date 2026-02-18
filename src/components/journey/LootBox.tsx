'use client';

import { m, AnimatePresence } from 'framer-motion';

interface LootBoxProps {
  skills: readonly string[];
  color: string;
  isOpen: boolean;
}

export function LootBox({ skills, color, isOpen }: LootBoxProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap gap-2 pt-4">
            {skills.map((skill, i) => (
              <m.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                className="rounded-md px-3 py-1.5 font-mono text-xs tracking-wide"
                style={{
                  background: `${color}18`,
                  border: `1px solid ${color}44`,
                  color,
                }}
              >
                {skill}
              </m.span>
            ))}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

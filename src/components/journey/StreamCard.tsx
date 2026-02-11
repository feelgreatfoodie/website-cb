'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface StreamCardProps {
  label: string;
  years: number;
  color: string;
  description: string;
  onHover: (hovered: boolean) => void;
  onClick: () => void;
  isRevealed: boolean;
}

export function StreamCard({
  label,
  years,
  color,
  description,
  onHover,
  onClick,
  isRevealed,
}: StreamCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      className={cn(
        'glass relative w-full cursor-pointer rounded-xl p-6 text-left transition-all duration-300',
        isRevealed && 'ring-1'
      )}
      style={{
        borderColor: hovered ? color : undefined,
        boxShadow: hovered
          ? `0 0 30px ${color}33, inset 0 0 30px ${color}11`
          : undefined,
        outlineColor: isRevealed ? color : undefined,
      }}
      onMouseEnter={() => {
        setHovered(true);
        onHover(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
        onHover(false);
      }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="mb-3 flex items-baseline justify-between">
        <span
          className="font-mono text-xs tracking-[0.3em] uppercase"
          style={{ color }}
        >
          {label}
        </span>
        <span
          className="font-mono text-3xl font-bold bloom-text"
          style={{ color }}
        >
          {years}
          <span className="ml-1 text-sm font-normal opacity-60">yrs</span>
        </span>
      </div>

      <p className="text-sm leading-relaxed text-foreground/70">
        {description}
      </p>

      {!isRevealed && (
        <div
          className="mt-4 text-center font-mono text-xs tracking-wider"
          style={{ color: `${color}88` }}
        >
          [ CLICK TO REVEAL SKILLS ]
        </div>
      )}
    </motion.button>
  );
}

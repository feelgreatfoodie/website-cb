'use client';

import { cn } from '@/lib/utils/cn';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface GlowTextProps extends HTMLMotionProps<'span'> {
  color?: string;
  intensity?: 'low' | 'medium' | 'high';
}

const intensityMap = {
  low: '0.2',
  medium: '0.4',
  high: '0.6',
};

export function GlowText({
  color = '#1E90FF',
  intensity = 'medium',
  className,
  children,
  ...props
}: GlowTextProps) {
  const alpha = intensityMap[intensity];

  return (
    <motion.span
      className={cn('inline-block', className)}
      style={{
        color,
        textShadow: `0 0 10px ${color}${Math.round(parseFloat(alpha) * 255)
          .toString(16)
          .padStart(2, '0')}, 0 0 40px ${color}${Math.round(
          parseFloat(alpha) * 0.5 * 255
        )
          .toString(16)
          .padStart(2, '0')}`,
      }}
      {...props}
    >
      {children}
    </motion.span>
  );
}

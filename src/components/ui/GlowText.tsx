'use client';

import { cn } from '@/lib/utils/cn';
import { m, type HTMLMotionProps } from 'framer-motion';
import { usePalette } from '@/lib/palette-context';

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
  color,
  intensity = 'medium',
  className,
  children,
  ...props
}: GlowTextProps) {
  const { colors } = usePalette();
  const resolvedColor = color ?? colors.cta;
  const alpha = intensityMap[intensity];

  return (
    <m.span
      className={cn('inline-block', className)}
      style={{
        color: resolvedColor,
        textShadow: `0 0 10px ${resolvedColor}${Math.round(parseFloat(alpha) * 255)
          .toString(16)
          .padStart(2, '0')}, 0 0 40px ${resolvedColor}${Math.round(
          parseFloat(alpha) * 0.5 * 255
        )
          .toString(16)
          .padStart(2, '0')}`,
      }}
      {...props}
    >
      {children}
    </m.span>
  );
}

'use client';

import { cn } from '@/lib/utils/cn';
import { m, type HTMLMotionProps } from 'framer-motion';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-cta text-white hover:brightness-110 shadow-[0_0_20px_color-mix(in_srgb,var(--cta)_40%,transparent)]',
  secondary:
    'bg-transparent border border-accent text-accent hover:bg-accent/10 shadow-[0_0_15px_color-mix(in_srgb,var(--accent)_20%,transparent)]',
  ghost:
    'bg-transparent text-foreground hover:text-accent hover:bg-white/5',
};

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <m.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'rounded-lg px-6 py-3 font-semibold tracking-wide transition-colors duration-200',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </m.button>
  );
}

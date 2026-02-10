'use client';

import { cn } from '@/lib/utils/cn';
import { motion, type HTMLMotionProps } from 'framer-motion';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-[#E2725B] text-white hover:bg-[#d4654e] shadow-[0_0_20px_rgba(226,114,91,0.4)]',
  secondary:
    'bg-transparent border border-[#1E90FF] text-[#1E90FF] hover:bg-[#1E90FF]/10 shadow-[0_0_15px_rgba(30,144,255,0.2)]',
  ghost:
    'bg-transparent text-[#F8F9FA] hover:text-[#1E90FF] hover:bg-white/5',
};

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'rounded-lg px-6 py-3 font-semibold tracking-wide transition-colors duration-200',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E90FF]',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

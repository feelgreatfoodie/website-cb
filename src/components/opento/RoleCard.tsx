'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations/scroll-variants';

interface RoleCardProps {
  description: string;
}

export function RoleCard({ description }: RoleCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      className="glass flex h-full items-center rounded-xl border-t-2 border-t-accent/40 p-5 transition-shadow duration-300 hover:shadow-[0_0_30px_color-mix(in_srgb,var(--accent)_15%,transparent)] sm:p-6"
    >
      <p className="text-sm leading-relaxed text-foreground/70">
        {description}
      </p>
    </motion.div>
  );
}

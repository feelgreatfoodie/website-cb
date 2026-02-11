'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations/scroll-variants';

interface RoleCardProps {
  title: string;
  description: string;
  brings: readonly string[];
}

export function RoleCard({ title, description, brings }: RoleCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      className="glass rounded-xl p-4 transition-shadow duration-300 hover:shadow-[0_0_30px_color-mix(in_srgb,var(--accent)_15%,transparent)] sm:p-6"
    >
      <h3 className="mb-3 font-mono text-base font-bold tracking-wide text-accent sm:text-lg">
        {title}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-foreground/70">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {brings.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

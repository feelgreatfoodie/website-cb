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
      className="glass flex h-full flex-col rounded-xl border-t-2 border-t-accent/40 p-5 transition-shadow duration-300 hover:shadow-[0_0_30px_color-mix(in_srgb,var(--accent)_15%,transparent)] sm:p-6"
    >
      <h3 className="mb-2 font-mono text-lg font-bold tracking-wide text-accent sm:text-xl">
        {title}
      </h3>
      <p className="mb-5 text-sm leading-relaxed text-foreground/70">
        {description}
      </p>

      <div className="mt-auto border-t border-accent/10 pt-4">
        <div className="flex flex-wrap gap-1.5">
          {brings.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-accent/8 px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-accent/80"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

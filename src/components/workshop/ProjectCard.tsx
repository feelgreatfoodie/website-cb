'use client';

import { motion } from 'framer-motion';

interface ProjectCardProps {
  name: string;
  description: string;
  problem: string;
  whyNow: string;
  tags: readonly string[];
}

export function ProjectCard({
  name,
  description,
  problem,
  whyNow,
  tags,
}: ProjectCardProps) {
  return (
    <motion.div
      className="glass group rounded-xl p-4 transition-all duration-300 hover:shadow-[0_0_40px_color-mix(in_srgb,var(--accent)_15%,transparent)] hover:border-accent/40 sm:p-6"
    >
      <h3 className="mb-1 font-mono text-lg font-bold text-cta">
        {name}
      </h3>
      <p className="mb-4 text-sm text-foreground/60">{description}</p>

      <div className="mb-3">
        <span className="font-mono text-[10px] tracking-[0.3em] text-accent/50">
          PROBLEM
        </span>
        <p className="mt-1 text-sm leading-relaxed text-foreground/80">
          {problem}
        </p>
      </div>

      <div className="mb-4">
        <span className="font-mono text-[10px] tracking-[0.3em] text-accent/50">
          WHY NOW
        </span>
        <p className="mt-1 text-sm leading-relaxed text-foreground/80">
          {whyNow}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-accent/10 px-2 py-1 font-mono text-[10px] tracking-wide text-accent/70"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

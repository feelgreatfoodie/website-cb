'use client';

import { motion } from 'framer-motion';
import type { MediumPost } from '@/lib/medium';

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function BlogCard({ post }: { post: MediumPost }) {
  return (
    <motion.a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="glass group block rounded-xl transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_40px_color-mix(in_srgb,var(--accent)_15%,transparent)]"
      whileHover={{ y: -4 }}
    >
      {/* Thumbnail */}
      {post.thumbnail && (
        <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
          <img
            src={post.thumbnail}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      )}

      <div className="p-4 sm:p-5">
        {/* Date */}
        {post.pubDate && (
          <p className="mb-2 font-mono text-[10px] tracking-[0.3em] text-foreground/40">
            {formatDate(post.pubDate)}
          </p>
        )}

        {/* Title */}
        <h3 className="mb-3 font-mono text-sm font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-accent sm:text-base">
          {post.title}
        </h3>

        {/* Tags */}
        {post.categories.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {post.categories.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-accent/10 px-2 py-1 font-mono text-[10px] tracking-wide text-accent/70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-cta transition-all duration-300 group-hover:gap-2.5">
          Read on Medium
          <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </motion.a>
  );
}

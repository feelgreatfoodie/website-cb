'use client';

import Image from 'next/image';
import { m } from 'framer-motion';
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
    <m.a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="glass group flex h-full flex-col rounded-xl transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_40px_color-mix(in_srgb,var(--accent)_15%,transparent)]"
      whileHover={{ y: -4 }}
    >
      {/* Thumbnail */}
      {post.thumbnail && (
        <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-t-xl">
          <Image
            src={post.thumbnail}
            alt={`Thumbnail for ${post.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Date — fixed zone */}
        <div className="h-5 shrink-0">
          {post.pubDate && (
            <p className="font-mono text-[11px] tracking-[0.3em] text-foreground/60">
              {formatDate(post.pubDate)}
            </p>
          )}
        </div>

        {/* Title — fixed zone, 3 lines max */}
        <div className="mt-2 h-[3.5rem] shrink-0 sm:h-[4rem]">
          <h3 className="line-clamp-3 font-mono text-sm font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-accent sm:text-base">
            {post.title}
          </h3>
        </div>

        {/* Tags — fixed zone, single visible row */}
        <div className="mt-3 h-7 shrink-0 overflow-hidden">
          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.categories.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-accent/10 px-2 py-1 font-mono text-[11px] tracking-wide text-accent/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA — pinned to bottom */}
        <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-cta transition-all duration-300 group-hover:gap-2.5">
          Read on Medium
          <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </m.a>
  );
}

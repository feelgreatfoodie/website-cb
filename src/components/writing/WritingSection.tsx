'use client';

import { m } from 'framer-motion';
import { BlogCard } from './BlogCard';
import { writing } from '@/config/content';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';
import { trackEvent } from '@/lib/analytics';
import type { MediumPost } from '@/lib/medium';

function GhostCard() {
  return (
    <div className="glass flex flex-col items-center justify-center rounded-xl p-8 text-center">
      {/* Medium icon */}
      <svg
        className="mb-4 h-10 w-10 text-foreground/15"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42S14.2 15.54 14.2 12s1.52-6.42 3.38-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
      {/* Skeleton lines */}
      <div className="mb-2 h-2 w-24 rounded-full bg-foreground/8" />
      <div className="mb-1 h-2.5 w-32 rounded-full bg-foreground/10" />
      <div className="h-2.5 w-20 rounded-full bg-foreground/8" />
    </div>
  );
}

export function WritingSection({ posts }: { posts: MediumPost[] }) {
  const hasPosts = posts.length > 0;

  return (
    <section
      id="writing"
      className="relative bg-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <m.div
          className="mb-8 text-center sm:mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <m.p
            variants={fadeInUp}
            className="mb-2 font-mono text-xs tracking-[0.4em] text-cta"
          >
            {writing.subtitle}
          </m.p>
          <m.h2
            variants={fadeInUp}
            className="font-mono text-2xl font-bold tracking-[0.15em] text-foreground sm:text-3xl md:text-4xl"
          >
            {writing.title}
          </m.h2>
        </m.div>

        {/* Cards grid or ghost fallback */}
        <m.div
          className="grid gap-4 sm:gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {hasPosts ? (
            posts.map((post) => (
              <m.div key={post.link} variants={fadeInUp} className="h-full">
                <BlogCard post={post} />
              </m.div>
            ))
          ) : (
            <>
              {[0, 1, 2].map((i) => (
                <m.div key={i} variants={fadeInUp}>
                  <GhostCard />
                </m.div>
              ))}
            </>
          )}
        </m.div>

        {/* Status message when posts unavailable */}
        {!hasPosts && (
          <p className="mt-6 text-center font-mono text-xs tracking-wider text-foreground/40">
            Posts unavailable right now
          </p>
        )}

        {/* CTA link — always visible */}
        <m.div
          className="mt-8 text-center sm:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a
            href={writing.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('blog_cta_click')}
            className="group inline-flex items-center gap-2 font-mono text-sm tracking-wider text-foreground/50 transition-colors hover:text-accent"
          >
            {writing.ctaLabel}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </a>
        </m.div>
      </div>
    </section>
  );
}

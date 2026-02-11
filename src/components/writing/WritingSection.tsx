'use client';

import { motion } from 'framer-motion';
import { BlogCard } from './BlogCard';
import { writing } from '@/config/content';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';
import { trackEvent } from '@/lib/analytics';
import type { MediumPost } from '@/lib/medium';

export function WritingSection({ posts }: { posts: MediumPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section
      id="writing"
      className="relative bg-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="mb-8 text-center sm:mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.p
            variants={fadeInUp}
            className="mb-2 font-mono text-xs tracking-[0.4em] text-cta"
          >
            {writing.subtitle}
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-mono text-2xl font-bold tracking-[0.15em] text-foreground sm:text-3xl md:text-4xl"
          >
            {writing.title}
          </motion.h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid gap-4 sm:gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {posts.map((post) => (
            <motion.div key={post.link} variants={fadeInUp}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA link */}
        <motion.div
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
        </motion.div>
      </div>
    </section>
  );
}

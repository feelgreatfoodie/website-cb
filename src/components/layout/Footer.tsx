'use client';

import { motion } from 'framer-motion';
import { footer } from '@/config/content';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';

export function Footer() {
  return (
    <footer className="relative border-t border-accent/10 bg-background py-16">
      <motion.div
        className="mx-auto max-w-4xl px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.p
          variants={fadeInUp}
          className="mb-8 font-mono text-2xl font-bold italic tracking-wide text-cta"
        >
          {footer.signoff}
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="mb-8 flex flex-wrap items-center justify-center gap-6"
        >
          <a
            href={`mailto:${footer.links.email}`}
            className="group font-mono text-sm text-foreground/60 transition-all duration-300 hover:text-accent"
          >
            <span className="inline-block transition-shadow duration-300 group-hover:bloom-text">
              {footer.links.email}
            </span>
          </a>

          <span className="text-foreground/20">|</span>

          <a
            href={`tel:${footer.links.phone.replace(/[^\d+]/g, '')}`}
            className="group font-mono text-sm text-foreground/60 transition-all duration-300 hover:text-accent"
          >
            <span className="inline-block transition-shadow duration-300 group-hover:bloom-text">
              {footer.links.phone}
            </span>
          </a>

          <span className="text-foreground/20">|</span>

          <a
            href={footer.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group font-mono text-sm text-foreground/60 transition-all duration-300 hover:text-accent"
          >
            <span className="inline-block transition-shadow duration-300 group-hover:bloom-text">
              LinkedIn
            </span>
          </a>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="font-mono text-xs text-foreground/20"
        >
          {footer.links.website}
        </motion.p>

        {/* Hidden admin link — only visible on hover */}
        <a
          href="/admin"
          className="mt-6 inline-block opacity-0 transition-opacity duration-500 hover:opacity-60"
          aria-label="Admin"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-foreground/30"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </a>
      </motion.div>
    </footer>
  );
}

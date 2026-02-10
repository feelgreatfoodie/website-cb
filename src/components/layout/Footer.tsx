'use client';

import { motion } from 'framer-motion';
import { footer } from '@/config/content';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';

export function Footer() {
  return (
    <footer
      className="relative border-t border-[#1E90FF]/10 py-16"
      style={{ background: '#2E004B' }}
    >
      <motion.div
        className="mx-auto max-w-4xl px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.p
          variants={fadeInUp}
          className="mb-8 font-mono text-2xl font-bold italic tracking-wide text-[#E2725B]"
        >
          {footer.signoff}
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="mb-8 flex flex-wrap items-center justify-center gap-6"
        >
          <a
            href={`mailto:${footer.links.email}`}
            className="group font-mono text-sm text-[#F8F9FA]/60 transition-all duration-300 hover:text-[#1E90FF]"
          >
            <span className="inline-block transition-shadow duration-300 group-hover:[text-shadow:0_0_10px_rgba(30,144,255,0.4)]">
              {footer.links.email}
            </span>
          </a>

          <span className="text-[#F8F9FA]/20">|</span>

          <a
            href={`tel:${footer.links.phone.replace(/[^\d+]/g, '')}`}
            className="group font-mono text-sm text-[#F8F9FA]/60 transition-all duration-300 hover:text-[#1E90FF]"
          >
            <span className="inline-block transition-shadow duration-300 group-hover:[text-shadow:0_0_10px_rgba(30,144,255,0.4)]">
              {footer.links.phone}
            </span>
          </a>

          <span className="text-[#F8F9FA]/20">|</span>

          <a
            href={footer.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group font-mono text-sm text-[#F8F9FA]/60 transition-all duration-300 hover:text-[#1E90FF]"
          >
            <span className="inline-block transition-shadow duration-300 group-hover:[text-shadow:0_0_10px_rgba(30,144,255,0.4)]">
              LinkedIn
            </span>
          </a>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="font-mono text-xs text-[#F8F9FA]/20"
        >
          {footer.links.website}
        </motion.p>
      </motion.div>
    </footer>
  );
}

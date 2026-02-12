'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { footer } from '@/config/content';
import { onesheetMap } from '@/config/onesheet-map';
import { usePalette } from '@/lib/palette-context';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';

function SignatureReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReduced = useReducedMotion();

  return (
    <div ref={ref} className="relative mx-auto mb-6 h-[6.6rem] w-full max-w-[22rem] sm:mb-8 sm:h-[21rem] sm:max-w-[78rem]">
      <img
        src="/signature-white.png"
        alt="Christian Bourlier signature"
        className="h-full w-full object-contain"
        style={
          prefersReduced || !isInView
            ? {}
            : {
                clipPath: 'inset(0 0 0 0)',
                animation: 'signatureReveal 1.5s ease-out forwards',
              }
        }
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      <style>{`
        @keyframes signatureReveal {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0 0 0); }
        }
      `}</style>
    </div>
  );
}

export function Footer() {
  const { paletteId } = usePalette();
  const pdfUrl = onesheetMap[paletteId] ?? onesheetMap['porto-data-streams'];

  return (
    <footer className="relative bg-background py-16">
      {/* Gradient separator */}
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, var(--accent), transparent)',
        }}
      />

      <motion.div
        className="mx-auto max-w-4xl px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Section nav */}
        <motion.nav
          variants={fadeInUp}
          className="mb-6 flex flex-wrap items-center justify-center gap-1.5 sm:mb-10 sm:gap-3"
          aria-label="Footer navigation"
        >
          {footer.sections
            .filter((s) => s.label !== 'One-Sheeter' && s.label !== 'Contact')
            .map((section, i, arr) => (
              <span key={section.anchor} className="flex items-center gap-3">
                <a
                  href={section.anchor}
                  className="font-mono text-xs tracking-wider text-foreground/40 transition-colors hover:text-accent"
                >
                  {section.label}
                </a>
                {i < arr.length - 1 && (
                  <span className="text-foreground/10">·</span>
                )}
              </span>
            ))}
        </motion.nav>

        {/* Signature animation */}
        <SignatureReveal />

        {/* Contact links */}
        <motion.div
          variants={fadeInUp}
          className="mb-6 flex flex-wrap items-center justify-center gap-3 sm:mb-8 sm:flex-nowrap sm:gap-6"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const decoded = atob(footer.links.emailEncoded);
              window.location.href = `mailto:${decoded}`;
            }}
            className="group font-mono text-xs text-foreground/60 transition-all duration-300 hover:text-accent sm:text-sm"
          >
            <span className="inline-block transition-shadow duration-300 group-hover:bloom-text">
              Email Me
            </span>
          </a>

          <span className="text-foreground/20">|</span>

          <a
            href={footer.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group font-mono text-xs text-foreground/60 transition-all duration-300 hover:text-accent sm:text-sm"
          >
            <span className="inline-block transition-shadow duration-300 group-hover:bloom-text">
              LinkedIn
            </span>
          </a>

          <span className="text-foreground/20">|</span>

          <a
            href={footer.links.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="group font-mono text-xs text-foreground/60 transition-all duration-300 hover:text-accent sm:text-sm"
          >
            <span className="inline-block transition-shadow duration-300 group-hover:bloom-text">
              Medium
            </span>
          </a>

          <span className="text-foreground/20">|</span>

          <a
            href={pdfUrl}
            download
            className="group font-mono text-xs text-foreground/60 transition-all duration-300 hover:text-accent sm:text-sm"
          >
            <span className="inline-block transition-shadow duration-300 group-hover:bloom-text">
              One-Sheeter
            </span>
          </a>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="mt-2 font-mono text-xs text-foreground/20"
        >
          {footer.links.website}
        </motion.p>

        {/* Hidden admin link — only visible on hover */}
        <a
          href="/admin"
          className="mt-6 inline-block opacity-[0.08] transition-opacity duration-500 hover:opacity-60"
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

'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { m, useInView } from 'framer-motion';
import { footer, decodeEmail } from '@/config/content';
import { onesheetMap } from '@/config/palettes';
import { usePalette } from '@/lib/palette-context';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { useAnalyticsToggle } from '@/components/ui/CookieConsent';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';

function SignatureReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReduced = useReducedMotion();
  const { colors } = usePalette();

  // Detect light background: if R+G+B > 382 (of 765), signature needs darkening
  const bg = colors.background;
  const r = parseInt(bg.slice(1, 3), 16);
  const g = parseInt(bg.slice(3, 5), 16);
  const b = parseInt(bg.slice(5, 7), 16);
  const isLightBg = r + g + b > 382;

  return (
    <div ref={ref} className="relative mx-auto mb-6 h-[6.6rem] w-full max-w-[22rem] sm:mb-8 sm:h-[21rem] sm:max-w-[78rem]">
      <Image
        src="/signature-white.webp"
        alt="Christian Bourlier signature"
        fill
        sizes="(max-width: 640px) 22rem, 78rem"
        className="object-contain"
        style={{
          ...(isLightBg ? { filter: 'brightness(0)' } : {}),
          ...(prefersReduced || !isInView
            ? {}
            : {
                clipPath: 'inset(0 0 0 0)',
                animation: 'signatureReveal 1.5s ease-out forwards',
              }),
        }}
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
  const pdfUrl = onesheetMap[paletteId] ?? onesheetMap['nazare-wavefronts'];
  const toggleAnalytics = useAnalyticsToggle();

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

      <m.div
        className="mx-auto max-w-4xl px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Section nav */}
        <m.nav
          variants={fadeInUp}
          className="mb-6 flex flex-wrap items-center justify-center gap-1.5 sm:mb-10 sm:gap-3"
          aria-label="Footer navigation"
        >
          {footer.sections
            .filter((s) => s.label !== 'Contact')
            .map((section, i, arr) => (
              <span key={section.anchor} className="flex items-center gap-3">
                <a
                  href={section.anchor}
                  className="font-mono text-xs tracking-wider text-foreground/60 transition-colors hover:text-accent"
                >
                  {section.label}
                </a>
                {i < arr.length - 1 && (
                  <span className="text-foreground/10">·</span>
                )}
              </span>
            ))}
        </m.nav>

        {/* Signature animation */}
        <SignatureReveal />

        {/* Contact links */}
        <m.div
          variants={fadeInUp}
          className="mb-6 flex flex-wrap items-center justify-center gap-3 sm:mb-8 sm:flex-nowrap sm:gap-6"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `mailto:${decodeEmail()}`;
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
            href="https://rezzed.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group font-mono text-xs text-foreground/60 transition-all duration-300 hover:text-accent sm:text-sm"
          >
            <span className="inline-block transition-shadow duration-300 group-hover:bloom-text">
              Rezzed.ai
            </span>
          </a>

          <span className="text-foreground/20">|</span>

          <a
            href={footer.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group font-mono text-xs text-foreground/60 transition-all duration-300 hover:text-accent sm:text-sm"
          >
            <span className="inline-block transition-shadow duration-300 group-hover:bloom-text">
              GitHub
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
        </m.div>

        <m.div
          variants={fadeInUp}
          className="mt-2 flex items-center justify-center gap-2"
        >
          <p className="font-mono text-xs text-foreground/20">
            {footer.links.website}
          </p>
          <span className="text-foreground/10">·</span>
          <button
            type="button"
            onClick={toggleAnalytics}
            className="font-mono text-xs text-foreground/20 transition-colors hover:text-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:rounded"
            aria-label="Toggle analytics settings"
          >
            Analytics Settings
          </button>
        </m.div>

        {/* Hidden admin link — subtle, visible on hover */}
        <a
          href="/admin"
          className="mt-6 inline-block opacity-[0.15] transition-opacity duration-500 hover:opacity-60"
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
      </m.div>
    </footer>
  );
}

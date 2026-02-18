'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { footer, decodeEmail } from '@/config/content';
import { useActiveSection } from '@/lib/hooks/useActiveSection';
import { PaletteSwitcher } from './PaletteSwitcher';
import { MotionToggle } from './MotionToggle';

const navLinks = footer.sections.filter(
  (s) => s.label !== 'Hero'
);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close on Escape key + restore focus to hamburger
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [menuOpen]);

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  // Focus trap: keep Tab cycling within nav dropdown
  const handleFocusTrap = useCallback((e: KeyboardEvent) => {
    if (e.key !== 'Tab' || !mobileNavRef.current) return;
    const focusable = mobileNavRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.addEventListener('keydown', handleFocusTrap);
    const timer = setTimeout(() => {
      const firstLink = mobileNavRef.current?.querySelector<HTMLElement>('a[href]');
      firstLink?.focus();
    }, 100);
    return () => {
      document.removeEventListener('keydown', handleFocusTrap);
      clearTimeout(timer);
    };
  }, [menuOpen, handleFocusTrap]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 shadow-lg shadow-black/10 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Left: home + email + LinkedIn + Medium */}
        <div className="flex items-center gap-1 sm:gap-3">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex h-10 w-10 items-center justify-center rounded-lg font-mono text-[11px] tracking-wider text-foreground/60 transition-colors hover:text-accent sm:h-auto sm:w-auto"
            title="Back to top"
          >
            <svg className="h-5 w-5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M3 12l9-9 9 9" />
              <path d="M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" />
            </svg>
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `mailto:${decodeEmail()}`;
            }}
            className="flex h-10 w-10 items-center justify-center rounded-lg font-mono text-[11px] tracking-wider text-foreground/60 transition-colors hover:text-accent sm:h-auto sm:w-auto"
            title="Send email"
          >
            <svg className="h-5 w-5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13 2 4" />
            </svg>
          </a>
          <a
            href={footer.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-lg font-mono text-[11px] tracking-wider text-foreground/60 transition-colors hover:text-accent sm:h-auto sm:w-auto"
            title="LinkedIn"
          >
            <svg className="h-5 w-5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href={footer.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-lg font-mono text-[11px] tracking-wider text-foreground/60 transition-colors hover:text-accent sm:h-auto sm:w-auto"
            title="GitHub"
          >
            <svg className="h-5 w-5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href={footer.links.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-lg font-mono text-[11px] tracking-wider text-foreground/60 transition-colors hover:text-accent sm:h-auto sm:w-auto"
            title="Medium"
          >
            <svg className="h-5 w-5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42S14.2 15.54 14.2 12s1.52-6.42 3.38-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
            </svg>
          </a>
          <a
            href={footer.links.rezzedai}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-lg font-mono text-[11px] tracking-wider text-foreground/60 transition-colors hover:text-accent sm:h-auto sm:w-auto"
            title="Rezzed.ai"
          >
            <svg className="h-5 w-5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
          </a>
        </div>

        {/* Desktop nav links — hidden on mobile, inline on lg+ */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((s) => (
            <a
              key={s.anchor}
              href={s.anchor}
              className={`font-mono text-[11px] tracking-[0.15em] transition-colors hover:text-accent ${
                s.anchor === `#${activeSection}` ? 'text-accent' : 'text-foreground/60'
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>

        {/* Right: Let's Connect CTA + PaletteSwitcher + MotionToggle + hamburger */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center rounded-full bg-cta px-4 py-1.5 font-mono text-[11px] font-semibold tracking-wider text-white transition-colors hover:brightness-110 animate-[ctaPulse_3s_ease-in-out_infinite]"
          >
            Let&apos;s Connect
          </a>
          <PaletteSwitcher />
          <MotionToggle />
          <button
            ref={hamburgerRef}
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative lg:hidden flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-accent/10"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <div className="flex w-5 flex-col items-center gap-[5px]">
              <span
                className={`block h-[1.5px] w-5 bg-foreground/60 transition-all duration-300 ${
                  menuOpen ? 'translate-y-[6.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-[1.5px] w-5 bg-foreground/60 transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-[1.5px] w-5 bg-foreground/60 transition-all duration-300 ${
                  menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Compact nav dropdown — right-anchored, auto-height */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="glass absolute right-4 top-full mt-1 z-40 w-64 rounded-xl py-2 shadow-xl shadow-black/20"
          >
            <nav ref={mobileNavRef} className="flex flex-col" aria-label="Navigation">
              {navLinks.map((s) => (
                <a
                  key={s.anchor}
                  href={s.anchor}
                  onClick={() => {
                    setMenuOpen(false);
                    hamburgerRef.current?.focus();
                  }}
                  className={`px-4 py-2.5 font-mono text-[11px] tracking-[0.15em] transition-colors hover:bg-accent/10 hover:text-accent ${
                    s.anchor === `#${activeSection}`
                      ? 'text-accent bg-accent/5'
                      : 'text-foreground/60'
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}

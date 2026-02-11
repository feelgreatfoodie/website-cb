'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { footer } from '@/config/content';
import { palettes } from '@/config/palettes';
import { usePalette } from '@/lib/palette-context';
import { trackEvent } from '@/lib/analytics';

function PaletteSwatch({ colors }: { colors: { background: string; accent: string; cta: string; stream1: string } }) {
  return (
    <div className="flex gap-0.5">
      <span className="h-3 w-3 rounded-full" style={{ background: colors.background, border: '1px solid rgba(255,255,255,0.15)' }} />
      <span className="h-3 w-3 rounded-full" style={{ background: colors.accent }} />
      <span className="h-3 w-3 rounded-full" style={{ background: colors.cta }} />
      <span className="h-3 w-3 rounded-full" style={{ background: colors.stream1 }} />
    </div>
  );
}

function PaletteSwitcher() {
  const { paletteId, switchPalette } = usePalette();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  const current = palettes.find((p) => p.id === paletteId) ?? palettes[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-accent/20 bg-transparent px-3 py-1.5 font-mono text-[10px] tracking-wider text-foreground/60 transition-all hover:border-accent/40 hover:text-foreground/90"
        aria-label="Switch color palette"
        aria-expanded={open}
      >
        <PaletteSwatch colors={current.colors} />
        <span className="hidden sm:inline">{current.name}</span>
        <svg
          className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path d="M3 5l3 3 3-3" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="glass absolute right-0 top-full z-50 mt-2 w-[calc(100vw-2rem)] max-w-64 overflow-hidden rounded-xl p-2 shadow-2xl sm:w-64"
          >
            <p className="mb-2 px-2 pt-1 font-mono text-[9px] tracking-[0.3em] text-foreground/30">
              CHOOSE YOUR PALETTE
            </p>
            {palettes.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  trackEvent('palette_switch', { palette_id: p.id });
                  switchPalette(p.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-all hover:bg-accent/10 ${
                  p.id === paletteId ? 'bg-accent/15' : ''
                }`}
              >
                <PaletteSwatch colors={p.colors} />
                <span className="font-mono text-xs text-foreground/80">{p.name}</span>
                {p.id === paletteId && (
                  <svg className="ml-auto h-3 w-3 text-accent" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M10 3L4.5 8.5 2 6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const navLinks = footer.sections.filter(
  (s) => s.label !== 'Hero'
);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [menuOpen]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 shadow-lg shadow-black/10 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Left: home + contact links */}
        <div className="flex items-center gap-4 sm:gap-3">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex h-10 w-10 items-center justify-center rounded-lg font-mono text-[10px] tracking-wider text-foreground/40 transition-colors hover:text-accent sm:h-auto sm:w-auto"
            title="Back to top"
          >
            <svg className="h-5 w-5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M3 12l9-9 9 9" />
              <path d="M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" />
            </svg>
          </a>
          <a
            href={`mailto:${footer.links.email}`}
            className="flex h-10 w-10 items-center justify-center rounded-lg font-mono text-[10px] tracking-wider text-foreground/40 transition-colors hover:text-accent sm:h-auto sm:w-auto"
            title={footer.links.email}
          >
            <svg className="h-5 w-5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13 2 4" />
            </svg>
          </a>
          <a
            href={`tel:${footer.links.phone.replace(/[^\d+]/g, '')}`}
            className="flex h-10 w-10 items-center justify-center rounded-lg font-mono text-[10px] tracking-wider text-foreground/40 transition-colors hover:text-accent sm:h-auto sm:w-auto"
            title={footer.links.phone}
          >
            <svg className="h-5 w-5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
          </a>
          <a
            href={footer.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-lg font-mono text-[10px] tracking-wider text-foreground/40 transition-colors hover:text-accent sm:h-auto sm:w-auto"
            title="LinkedIn"
          >
            <svg className="h-5 w-5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href={footer.links.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-lg font-mono text-[10px] tracking-wider text-foreground/40 transition-colors hover:text-accent sm:h-auto sm:w-auto"
            title="Medium"
          >
            <svg className="h-5 w-5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42S14.2 15.54 14.2 12s1.52-6.42 3.38-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
            </svg>
          </a>
        </div>

        {/* Center: section nav (hidden on small screens) */}
        <nav className="hidden items-center gap-4 md:flex" aria-label="Main navigation">
          {navLinks.map((s) => (
            <a
              key={s.anchor}
              href={s.anchor}
              className="font-mono text-[10px] tracking-[0.15em] text-foreground/35 transition-colors hover:text-accent"
            >
              {s.label}
            </a>
          ))}
        </nav>

        {/* Right: palette switcher + hamburger */}
        <div className="flex items-center gap-2">
          <PaletteSwitcher />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-accent/10 md:hidden"
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

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[64px] bottom-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col items-center gap-1 px-6 pt-8" aria-label="Mobile navigation">
              {navLinks.map((s, i) => (
                <motion.a
                  key={s.anchor}
                  href={s.anchor}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="w-full rounded-lg py-3 text-center font-mono text-sm tracking-[0.15em] text-foreground/60 transition-colors hover:bg-accent/10 hover:text-accent"
                >
                  {s.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

'use client';

import { useKonami } from '@/lib/hooks/useKonami';
import { AnimatePresence, m } from 'framer-motion';
import { useEffect } from 'react';

// Pre-computed outside render to satisfy React Compiler purity rules
const BURST_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  angle: (Math.PI * 2 * i) / 20,
  dist: 150 + ((i * 13 + 7) % 20) * 5, // deterministic spread 150–245
  hue: (i / 20) * 360,
}));

function ParticleBurst() {
  const particles = BURST_PARTICLES;

  return (
    <>
      {particles.map((p, i) => (
        <m.div
          key={i}
          className="absolute h-2 w-2 rounded-full"
          style={{ background: `hsl(${p.hue}, 100%, 60%)` }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(p.angle) * p.dist,
            y: Math.sin(p.angle) * p.dist,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      ))}
    </>
  );
}

export function KonamiOverlay() {
  const activated = useKonami();

  useEffect(() => {
    if (activated) {
      document.documentElement.classList.add('konami-active');
      return () => {
        document.documentElement.classList.remove('konami-active');
      };
    }
  }, [activated]);

  return (
    <>
      <style>{`
        .konami-active ::-webkit-scrollbar-thumb {
          background: linear-gradient(
            180deg,
            #ff0000, #ff7700, #ffff00, #00ff00, #0000ff, #8b00ff
          ) !important;
        }
      `}</style>
      <AnimatePresence>
        {activated && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
          >
            <m.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'backOut' }}
              className="rounded-2xl bg-black/80 px-6 py-6 backdrop-blur-lg sm:px-12 sm:py-8"
            >
              <p className="font-mono text-2xl font-bold tracking-[0.2em] text-cta sm:text-4xl">
                CHEAT CODE ACTIVATED
              </p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="pointer-events-auto mt-3 block text-center font-mono text-sm text-foreground/70 transition-colors hover:text-accent"
              >
                Send Christian a pastel de nata
              </a>
            </m.div>
            {/* Particle burst */}
            <ParticleBurst />
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

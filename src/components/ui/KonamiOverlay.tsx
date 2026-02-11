'use client';

import { useKonami } from '@/lib/hooks/useKonami';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'backOut' }}
              className="rounded-2xl bg-black/80 px-6 py-6 backdrop-blur-lg sm:px-12 sm:py-8"
            >
              <p className="font-mono text-2xl font-bold tracking-[0.2em] text-cta sm:text-4xl">
                CHEAT CODE ACTIVATED
              </p>
              <p className="mt-2 text-center font-mono text-xs text-foreground/50">
                +30 lives
              </p>
            </motion.div>
            {/* Particle burst */}
            {Array.from({ length: 20 }).map((_, i) => {
              const angle = (Math.PI * 2 * i) / 20;
              const dist = 150 + Math.random() * 100;
              return (
                <motion.div
                  key={i}
                  className="absolute h-2 w-2 rounded-full"
                  style={{
                    background: `hsl(${(i / 20) * 360}, 100%, 60%)`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface Testimonial {
  readonly quote: string;
  readonly author: string;
  readonly role: string;
}

interface TestimonialCarouselProps {
  testimonials: readonly Testimonial[];
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

export function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const prefersReduced = useReducedMotion();

  const goTo = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index]
  );

  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext]);

  // Touch: distinguish tap (pause) from swipe (navigate)
  const touchStartX = useRef(0);
  const touchStartTime = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
    touchStartTime.current = Date.now();
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goNext();
        else goPrev();
      }
    },
    [goNext, goPrev]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { goNext(); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { goPrev(); e.preventDefault(); }
  };

  const current = testimonials[index];

  return (
    <div
      className="mx-auto max-w-2xl focus-visible:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Testimonials"
      aria-roledescription="carousel"
    >
      <div className="relative min-h-[220px] sm:min-h-[200px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.blockquote
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="glass rounded-xl p-5 text-center sm:p-8"
            aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
          >
            <p className="mb-4 text-base italic leading-relaxed text-foreground/80 sm:text-lg">
              &ldquo;{current.quote}&rdquo;
            </p>
            <footer className="font-mono text-sm text-accent">
              — {current.author},{' '}
              <span className="text-foreground/60">{current.role}</span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {/* Controls: arrows + dots + pause/play */}
      <div className="mt-6 flex items-center justify-center gap-3">
        {/* Prev arrow */}
        <button
          onClick={goPrev}
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-full text-foreground/25 transition-colors hover:text-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Previous testimonial"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path d="M9 2L4 7l5 5" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="relative h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              style={{
                width: i === index ? '1.5rem' : '0.5rem',
                backgroundColor: i === index
                  ? 'var(--accent)'
                  : 'color-mix(in srgb, var(--foreground) 20%, transparent)',
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            >
              {/* Progress animation on active dot */}
              {i === index && !prefersReduced && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-accent/40"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 6, ease: 'linear' }}
                  key={`progress-${index}`}
                />
              )}
            </button>
          ))}
        </div>

        {/* Next arrow */}
        <button
          onClick={goNext}
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-full text-foreground/25 transition-colors hover:text-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Next testimonial"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path d="M5 2l5 5-5 5" />
          </svg>
        </button>

      </div>
    </div>
  );
}

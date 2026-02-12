'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { fadeInUp } from '@/lib/animations/scroll-variants';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface Metric {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
}

function AnimatedNumber({ value, suffix, reducedMotion, inView }: { value: number; suffix: string; reducedMotion: boolean; inView: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current || !ref.current) return;
    hasAnimated.current = true;

    if (reducedMotion) {
      ref.current.textContent = `${value}${suffix}`;
      return;
    }

    const controls = animate(0, value, {
      duration: 2,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = `${Math.round(v)}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [inView, value, suffix, reducedMotion]);

  return (
    <span ref={ref} className="font-mono text-2xl font-bold text-foreground sm:text-3xl">
      {reducedMotion ? `${value}${suffix}` : `0${suffix}`}
    </span>
  );
}

export function MetricsBar({ metrics }: { metrics: readonly Metric[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-50px' });
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={containerRef}
      variants={fadeInUp}
      className="mb-8 flex items-center justify-center gap-6 sm:gap-10"
    >
      {metrics.map((metric, i) => (
        <div key={metric.label} className="flex items-center gap-6 sm:gap-10">
          {i > 0 && <div className="h-8 w-px bg-accent/20" />}
          <div className="flex flex-col items-center">
            <AnimatedNumber
              value={metric.value}
              suffix={metric.suffix}
              reducedMotion={reducedMotion}
              inView={inView}
            />
            <span className="font-mono text-[11px] tracking-[0.2em] text-foreground/60">
              {metric.label}
            </span>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

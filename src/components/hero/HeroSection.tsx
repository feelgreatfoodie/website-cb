'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { CanvasErrorBoundary } from './CanvasErrorBoundary';
import { Button } from '@/components/ui/Button';
import { GlowText } from '@/components/ui/GlowText';
import { TestimonialCarousel } from '@/components/bossfight/TestimonialCarousel';
import { hero, intentOverrides, bossfight } from '@/config/content';
import { useQuestStore } from '@/lib/hooks/useQuestStore';
import { useVisitorIntent } from '@/lib/hooks/useVisitorIntent';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';
import { trackEvent } from '@/lib/analytics';
import { useToast } from '@/components/ui/Toast';

function RiverScenePlaceholder() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          'linear-gradient(135deg, var(--background) 0%, color-mix(in srgb, var(--accent) 13%, transparent) 50%, var(--background) 100%)',
      }}
    />
  );
}

const RiverScene = dynamic(
  () => import('./RiverScene').then((mod) => ({ default: mod.RiverScene })),
  { ssr: false, loading: () => <RiverScenePlaceholder /> }
);

export function HeroSection() {
  const startQuest = useQuestStore((s) => s.startQuest);
  const toast = useToast();
  const intent = useVisitorIntent();
  const hasTrackedIntent = useRef(false);

  // Track visitor intent once on mount
  useEffect(() => {
    if (intent !== 'default' && !hasTrackedIntent.current) {
      hasTrackedIntent.current = true;
      trackEvent('visitor_intent', { intent });
    }
  }, [intent]);

  const overrides = intentOverrides[intent] ?? {};
  const subheadline = overrides.subheadline ?? hero.subheadline;
  const ctaLabel = overrides.ctaLabel ?? hero.cta;

  const handleQuestStart = () => {
    trackEvent('hero_cta_click');
    startQuest();
    toast('Quest started');
    const journeyEl = document.getElementById('journey');
    journeyEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background"
    >
      <CanvasErrorBoundary fallback={<RiverScenePlaceholder />}>
        <RiverScene />
      </CanvasErrorBoundary>

      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={fadeInUp}
          className="mb-2 font-mono text-3xl font-bold tracking-[0.15em] text-foreground sm:text-5xl sm:tracking-[0.2em] md:text-6xl lg:text-7xl"
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mb-8 font-mono text-sm tracking-[0.3em] text-accent sm:text-base"
        >
          {subheadline}
        </motion.p>

        <motion.p variants={fadeInUp} className="mb-12 text-xl sm:text-2xl">
          <span className="text-foreground">I build the system </span>
          <GlowText intensity="high">AND</GlowText>
          <span className="text-foreground"> close the deal.</span>
        </motion.p>

        <motion.div variants={fadeInUp}>
          <Button
            variant="primary"
            onClick={handleQuestStart}
            className="text-base px-8 py-3 sm:text-lg sm:px-10 sm:py-4"
            aria-label="Start exploring Christian Bourlier's quest"
          >
            {ctaLabel}
          </Button>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-12">
          <TestimonialCarousel testimonials={bossfight.testimonials} />
        </motion.div>
      </motion.div>

      {/* Scroll indicator — CSS animation to avoid FM in critical path */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-[fadeIn_1s_2s_both]">
        <div className="h-10 w-6 rounded-full border-2 border-accent/40 p-1 animate-[scrollBounce_2s_ease-in-out_infinite]">
          <div className="mx-auto h-2 w-1 rounded-full bg-accent" />
        </div>
      </div>
    </section>
  );
}

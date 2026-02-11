'use client';

import { motion } from 'framer-motion';
import { RiverScene } from './RiverScene';
import { Button } from '@/components/ui/Button';
import { GlowText } from '@/components/ui/GlowText';
import { hero } from '@/config/content';
import { useQuestStore } from '@/lib/hooks/useQuestStore';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';

export function HeroSection() {
  const startQuest = useQuestStore((s) => s.startQuest);

  const handleQuestStart = () => {
    startQuest();
    const journeyEl = document.getElementById('journey');
    journeyEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background"
    >
      <RiverScene />

      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={fadeInUp}
          className="mb-2 font-mono text-5xl font-bold tracking-[0.2em] text-foreground sm:text-6xl lg:text-7xl"
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mb-8 font-mono text-sm tracking-[0.3em] text-accent sm:text-base"
        >
          {hero.subheadline}
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
            className="text-lg px-10 py-4"
            aria-label="Start exploring Christian Bourlier's quest"
          >
            {hero.cta}
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-10 w-6 rounded-full border-2 border-accent/40 p-1"
        >
          <div className="mx-auto h-2 w-1 rounded-full bg-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

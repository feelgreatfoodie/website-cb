'use client';

import { motion } from 'framer-motion';
import { EquationVisual } from './EquationVisual';
import { ArchitectureMap } from './ArchitectureMap';
import { Button } from '@/components/ui/Button';
import { bossfight } from '@/config/content';
import { useQuestStore } from '@/lib/hooks/useQuestStore';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';

export function BossFightSection() {
  const { equationRevealed, revealEquation } = useQuestStore();

  return (
    <section
      id="bossfight"
      className="relative min-h-[70vh] bg-background py-16 sm:min-h-screen sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          className="mb-8 text-center sm:mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            variants={fadeInUp}
            className="mb-6 font-mono text-2xl font-bold tracking-[0.15em] text-foreground sm:mb-8 sm:text-3xl md:text-4xl"
          >
            {bossfight.title}
          </motion.h2>

          {!equationRevealed && (
            <motion.div variants={fadeInUp}>
              <Button variant="secondary" onClick={revealEquation}>
                Reveal the Equation
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Equation reveal */}
        <div className="mb-8 sm:mb-16">
          <EquationVisual isRevealed={equationRevealed} />
        </div>

        {/* Architecture map */}
        <motion.div
          className="mb-8 sm:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="mb-6 text-center font-mono text-xs tracking-[0.4em] text-accent/80">
            {bossfight.approach.title}
          </p>
          <ArchitectureMap isVisible={equationRevealed} />

          {/* Approach taglines */}
          <motion.div
            className="mt-8 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={equationRevealed ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            {bossfight.approach.taglines.map((line) => (
              <p
                key={line}
                className="font-mono text-sm text-foreground/50"
              >
                → {line}
              </p>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

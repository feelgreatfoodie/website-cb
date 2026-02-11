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
      className="relative min-h-screen bg-background py-24"
    >
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          className="mb-16 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            variants={fadeInUp}
            className="mb-8 font-mono text-3xl font-bold tracking-[0.15em] text-foreground sm:text-4xl"
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
        <div className="mb-16">
          <EquationVisual isRevealed={equationRevealed} />
        </div>

        {/* Architecture map */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="mb-6 text-center font-mono text-xs tracking-[0.4em] text-accent/60">
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

        {/* Testimonial */}
        <motion.blockquote
          className="glass mx-auto max-w-2xl rounded-xl p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-lg italic leading-relaxed text-foreground/80">
            &ldquo;{bossfight.testimonial.quote}&rdquo;
          </p>
          <footer className="font-mono text-sm text-accent">
            — {bossfight.testimonial.author},{' '}
            <span className="text-foreground/50">
              {bossfight.testimonial.role}
            </span>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}

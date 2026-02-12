'use client';

import { motion } from 'framer-motion';
import { openTo } from '@/config/content';
import { RoleCard } from './RoleCard';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';

export function OpenToSection() {
  return (
    <section id="opento" className="relative bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          className="mb-16 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            variants={fadeInUp}
            className="mb-4 font-mono text-2xl font-bold tracking-[0.15em] text-foreground sm:text-3xl md:text-4xl"
          >
            {openTo.title}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="font-mono text-sm text-foreground/50"
          >
            {openTo.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {openTo.roles.map((role) => (
            <RoleCard
              key={role.title}
              title={role.title}
              description={role.description}
              brings={role.brings}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

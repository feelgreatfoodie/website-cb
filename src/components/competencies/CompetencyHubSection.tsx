'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { RadialHub } from './RadialHub';
import { competencies, implementation } from '@/config/content';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';

export function CompetencyHubSection() {
  return (
    <section
      id="competencies"
      className="relative bg-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="mb-8 text-center sm:mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            variants={fadeInUp}
            className="font-mono text-2xl font-bold tracking-[0.15em] text-foreground sm:text-3xl md:text-4xl"
          >
            {competencies.title}
          </motion.h2>
        </motion.div>

        <RadialHub items={competencies.hub} />

        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {implementation.certifications.map((cert) => (
            <motion.div
              key={cert.name}
              variants={fadeInUp}
              className="glass flex items-center gap-3 rounded-xl p-3"
            >
              <Image
                src={cert.badge}
                alt={cert.name}
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="font-mono text-xs font-semibold tracking-wide text-foreground">
                {cert.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

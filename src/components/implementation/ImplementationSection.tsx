'use client';

import { motion } from 'framer-motion';
import { implementation } from '@/config/content';
import { SkillPill } from './SkillPill';
import { CertBadge } from './CertBadge';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';

export function ImplementationSection() {
  return (
    <section id="implementation" className="relative bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          className="mb-8 text-center sm:mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.p
            variants={fadeInUp}
            className="mb-2 font-mono text-xs tracking-[0.4em] text-accent"
          >
            {implementation.subtitle}
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-mono text-2xl font-bold tracking-[0.15em] text-foreground sm:text-3xl md:text-4xl"
          >
            {implementation.title}
          </motion.h2>
        </motion.div>

        {/* Skill pills grid */}
        <div className="mb-8 flex flex-wrap justify-center gap-2 sm:mb-16 sm:gap-3">
          {implementation.skills.map((skill, i) => (
            <SkillPill
              key={skill.name}
              name={skill.name}
              category={skill.category}
              index={i}
            />
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {implementation.certifications.map((cert) => (
            <CertBadge key={cert.name} name={cert.name} badge={cert.badge} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

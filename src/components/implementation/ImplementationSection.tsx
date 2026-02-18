'use client';

import { m } from 'framer-motion';
import { implementation } from '@/config/content';
import { SkillPill } from './SkillPill';
import { CertBadge } from './CertBadge';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';

export function ImplementationSection() {
  return (
    <section id="implementation" className="relative bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <m.div
          className="mb-8 text-center sm:mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <m.p
            variants={fadeInUp}
            className="mb-2 font-mono text-xs tracking-[0.4em] text-accent"
          >
            {implementation.subtitle}
          </m.p>
          <m.h2
            variants={fadeInUp}
            className="font-mono text-2xl font-bold tracking-[0.15em] text-foreground sm:text-3xl md:text-4xl"
          >
            {implementation.title}
          </m.h2>
        </m.div>

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
        <m.div
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {implementation.certifications.map((cert) => (
            <CertBadge key={cert.name} name={cert.name} badge={cert.badge} />
          ))}
        </m.div>
      </div>
    </section>
  );
}

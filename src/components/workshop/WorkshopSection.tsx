'use client';

import { m } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { workshop } from '@/config/content';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';

export function WorkshopSection() {
  return (
    <section
      id="workshop"
      className="relative bg-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <m.div
          className="mb-8 text-center sm:mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <m.p
            variants={fadeInUp}
            className="mb-2 font-mono text-xs tracking-[0.4em] text-cta"
          >
            {workshop.tagline}
          </m.p>
          <m.h2
            variants={fadeInUp}
            className="font-mono text-2xl font-bold tracking-[0.15em] text-foreground sm:text-3xl md:text-4xl"
          >
            {workshop.title}
          </m.h2>
        </m.div>

        <m.div
          className="grid gap-4 sm:gap-6 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {workshop.projects.map((project) => (
            <m.div key={project.name} variants={fadeInUp} className="h-full">
              <ProjectCard
                name={project.name}
                description={project.description}
                problem={project.problem}
                whyNow={project.whyNow}
                tags={project.tags}
                image={'image' in project ? project.image : undefined}
                url={'url' in project ? project.url : undefined}
              />
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}

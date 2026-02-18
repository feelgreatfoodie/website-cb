'use client';

import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { TypewriterCLI } from './TypewriterCLI';
import { workshop } from '@/config/content';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';

export function WorkshopSection() {
  const cachebash = workshop.projects.find((p) => p.name === 'CacheBash');

  return (
    <section
      id="workshop"
      className="relative min-h-[70vh] bg-background py-16 sm:min-h-screen sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          className="mb-8 text-center sm:mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.p
            variants={fadeInUp}
            className="mb-2 font-mono text-xs tracking-[0.4em] text-cta"
          >
            {workshop.tagline}
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-mono text-2xl font-bold tracking-[0.15em] text-foreground sm:text-3xl md:text-4xl"
          >
            {workshop.title}
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid gap-4 sm:gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {workshop.projects.map((project) => (
            <motion.div key={project.name} variants={fadeInUp} className="h-full">
              <ProjectCard
                name={project.name}
                description={project.description}
                problem={project.problem}
                whyNow={project.whyNow}
                tags={project.tags}
                image={'image' in project ? project.image : undefined}
                url={'url' in project ? project.url : undefined}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CacheBash CLI demo */}
        {cachebash && 'cliCommands' in cachebash && (
          <motion.div
            className="mx-auto mt-12 max-w-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <TypewriterCLI commands={cachebash.cliCommands} />
          </motion.div>
        )}

      </div>
    </section>
  );
}

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { competencies, implementation } from '@/config/content';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';

const aiTags = [
  'Model Context Protocol (MCP)',
  'Agentic Workflows (ReAct)',
  'System Prompt Engineering',
  'LLM-as-a-judge (Evals)',
  'Vertex AI',
  'Anthropic API',
  'RAG Pipelines',
  'Multi-Model Orchestration',
  'Structured Output Validation',
  'Context Caching Strategies',
];

const coreTags = [
  'Python',
  'TypeScript',
  'SQL',
  'React / Next.js',
  'Node.js',
  'GCP',
  'BigQuery',
  'dbt',
  'Airflow',
  'Dataflow',
  'Docker',
  'Terraform',
  'CI/CD',
  'REST APIs',
];

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

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Left: GCP Certifications */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            <h3 className="font-mono text-xs tracking-[0.4em] text-accent">
              CERTIFICATIONS
            </h3>
            <div className="flex flex-col gap-4">
              {implementation.certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="glass flex items-center gap-4 rounded-xl p-4"
                >
                  <Image
                    src={cert.badge}
                    alt={cert.name}
                    width={56}
                    height={56}
                    className="h-14 w-14 object-contain"
                  />
                  <span className="font-mono text-sm font-semibold tracking-wide text-foreground">
                    {cert.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Tech tags */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            <h3 className="font-mono text-xs tracking-[0.4em] text-accent">
              AI & ML
            </h3>
            <div className="flex flex-wrap gap-2">
              {aiTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-cta/15 px-3 py-1.5 font-mono text-xs font-semibold tracking-wide text-cta"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="mt-4 font-mono text-xs tracking-[0.4em] text-accent">
              ENGINEERING
            </h3>
            <div className="flex flex-wrap gap-2">
              {coreTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-accent/10 px-3 py-1.5 font-mono text-xs tracking-wide text-accent/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

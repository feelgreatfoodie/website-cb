'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import {
  implementation,
  workshop,
  bossfight,
  openTo,
} from '@/config/content';

type Persona = 'recruiter' | 'client' | 'collaborator';

interface ExperienceFlowProps {
  persona: Persona;
  onBack: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

function SkillsCard() {
  const categories = [...new Set(implementation.skills.map((s) => s.category))];
  return (
    <m.section variants={itemVariants} className="glass rounded-lg border border-accent/20 p-6">
      <h2 className="mb-4 text-2xl font-bold text-foreground">Technical Skills</h2>
      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat}>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">{cat}</h3>
            <div className="flex flex-wrap gap-2">
              {implementation.skills
                .filter((s) => s.category === cat)
                .map((skill) => (
                  <span
                    key={skill.name}
                    className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm text-foreground/80"
                  >
                    {skill.name}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </m.section>
  );
}

function CertificationsCard() {
  return (
    <m.section variants={itemVariants} className="glass rounded-lg border border-accent/20 p-6">
      <h2 className="mb-4 text-2xl font-bold text-foreground">Certifications</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {implementation.certifications.map((cert) => (
          <div
            key={cert.name}
            className="flex items-center gap-3 rounded border border-accent/20 bg-accent/5 p-4"
          >
            <div className="text-lg font-bold text-accent">GCP</div>
            <p className="text-sm font-semibold text-foreground">{cert.name}</p>
          </div>
        ))}
      </div>
    </m.section>
  );
}

function ProjectsCard() {
  return (
    <m.section variants={itemVariants} className="glass rounded-lg border border-accent/20 p-6">
      <h2 className="mb-4 text-2xl font-bold text-foreground">Key Projects</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {workshop.projects.map((project) => (
          <div key={project.name} className="rounded border border-accent/20 bg-accent/5 p-4">
            <h3 className="mb-2 text-lg font-bold text-foreground">{project.name}</h3>
            <p className="mb-2 text-sm text-foreground/70">{project.description}</p>
            <p className="text-sm text-foreground/60">{project.problem}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-accent/20 px-2 py-1 text-[11px] text-foreground/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </m.section>
  );
}

function TestimonialsCard({ title }: { title: string }) {
  return (
    <m.section variants={itemVariants} className="glass rounded-lg border border-accent/20 p-6">
      <h2 className="mb-4 text-2xl font-bold text-foreground">{title}</h2>
      <div className="space-y-4">
        {bossfight.testimonials.slice(0, 3).map((t) => (
          <div key={t.author} className="rounded border border-accent/20 bg-accent/5 p-4">
            <p className="mb-3 text-sm italic text-foreground/80">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="text-sm font-semibold text-accent">
              — {t.author}, {t.role}
            </p>
          </div>
        ))}
      </div>
    </m.section>
  );
}

function RolesCard() {
  return (
    <m.section variants={itemVariants} className="glass rounded-lg border border-accent/20 p-6">
      <h2 className="mb-4 text-2xl font-bold text-foreground">Roles I Excel In</h2>
      <div className="space-y-3">
        {openTo.roles.map((role) => (
          <div key={role.title} className="rounded border border-accent/20 bg-accent/5 p-4">
            <h3 className="mb-1 text-lg font-bold text-foreground">{role.title}</h3>
            <p className="text-sm text-foreground/70">{role.description}</p>
          </div>
        ))}
      </div>
    </m.section>
  );
}

function ApproachCard() {
  const steps = [
    { title: 'Discovery', desc: 'Deep dive into your business context, constraints, and objectives.' },
    { title: 'Strategy', desc: 'Architecting solutions that balance technical excellence with business pragmatism.' },
    { title: 'Execution', desc: 'Iterative delivery with clear communication at every step.' },
    { title: 'Partnership', desc: 'Long-term thinking. Solutions that grow with you and empower your team.' },
  ];

  return (
    <m.section variants={itemVariants} className="glass rounded-lg border border-accent/20 p-6">
      <h2 className="mb-4 text-2xl font-bold text-foreground">My Approach</h2>
      <div className="space-y-4">
        {steps.map((s) => (
          <div key={s.title}>
            <h3 className="mb-1 text-lg font-semibold text-accent">{s.title}</h3>
            <p className="text-sm text-foreground/70">{s.desc}</p>
          </div>
        ))}
      </div>
    </m.section>
  );
}

export function ExperienceFlow({ persona, onBack }: ExperienceFlowProps) {
  const personaTitles: Record<Persona, string> = {
    recruiter: 'Recruiter View',
    client: 'Client View',
    collaborator: 'Collaborator View',
  };

  return (
    <m.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <m.div variants={itemVariants} className="mb-8">
        <Button
          onClick={onBack}
          variant="secondary"
          aria-label="Back to persona selection"
          className="mb-4"
        >
          &larr; Back
        </Button>
        <h2 className="text-3xl font-bold text-foreground">
          {personaTitles[persona]}
        </h2>
      </m.div>

      {persona === 'recruiter' && (
        <>
          <SkillsCard />
          <CertificationsCard />
          <ProjectsCard />
          <TestimonialsCard title="What Others Say" />
          <m.section variants={itemVariants} className="glass rounded-lg border border-accent/20 p-6">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Download Resume</h2>
            <p className="mb-4 text-sm text-foreground/70">
              Get a comprehensive overview of my experience and qualifications.
            </p>
            <Link href="/#onesheeter">
              <Button variant="primary" aria-label="View one-sheeter">
                View One-Sheeter
              </Button>
            </Link>
          </m.section>
        </>
      )}

      {persona === 'client' && (
        <>
          <ProjectsCard />
          <ApproachCard />
          <RolesCard />
          <TestimonialsCard title="Client Feedback" />
          <m.section variants={itemVariants} className="glass rounded-lg border border-accent/20 p-6">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Start a Conversation</h2>
            <p className="mb-4 text-sm text-foreground/70">
              Let&apos;s discuss how we can work together to solve your technical challenges.
            </p>
            <Link href="/#contact">
              <Button variant="primary" aria-label="Contact Christian">
                Get in Touch
              </Button>
            </Link>
          </m.section>
        </>
      )}

      {persona === 'collaborator' && (
        <>
          <SkillsCard />
          <ProjectsCard />
          <m.section variants={itemVariants} className="glass rounded-lg border border-accent/20 p-6">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Technical Writing</h2>
            <p className="mb-4 text-sm text-foreground/70">
              Insights on technical problem-solving, architecture decisions, and lessons learned.
            </p>
            <Link href="/#writing">
              <Button variant="primary" aria-label="Read articles">
                Browse Articles
              </Button>
            </Link>
          </m.section>
          <m.section variants={itemVariants} className="glass rounded-lg border border-accent/20 p-6">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Let&apos;s Connect</h2>
            <p className="mb-4 text-sm text-foreground/70">
              Always open to discussing new ideas, potential collaborations, or geeking out about technology.
            </p>
            <Link href="/#contact">
              <Button variant="primary" aria-label="Connect with Christian">
                Reach Out
              </Button>
            </Link>
          </m.section>
        </>
      )}
    </m.div>
  );
}

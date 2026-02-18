'use client';

import Image from 'next/image';
import { LiveStatusBadge } from '@/components/ui/LiveStatusBadge';
import { trackEvent } from '@/lib/analytics';

interface ProjectCardProps {
  name: string;
  description: string;
  problem: string;
  whyNow: string;
  tags: readonly string[];
  image?: string;
  url?: string;
}

export function ProjectCard({
  name,
  description,
  problem,
  whyNow,
  tags,
  image,
  url,
}: ProjectCardProps) {
  return (
    <div className="glass group flex h-full flex-col rounded-xl text-left transition-all duration-300 hover:shadow-[0_0_40px_color-mix(in_srgb,var(--accent)_15%,transparent)] hover:border-accent/40">
      {/* Header area — fixed height */}
      <div className="min-h-[120px] border-b border-accent/10 p-4 sm:p-6">
        {image && (
          <div className="mb-3 flex justify-center">
            <Image
              src={image}
              alt={`${name} icon`}
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
          </div>
        )}
        <h3 className="mb-1 font-mono text-lg font-bold text-cta">
          {name}
        </h3>
        <p className="text-sm text-foreground/60">{description}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-accent/10 px-2 py-0.5 font-mono text-[10px] tracking-wide text-accent/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Problem area — fixed height */}
      <div className="min-h-[100px] border-b border-accent/10 p-4 sm:px-6">
        <span className="font-mono text-[11px] tracking-[0.3em] text-accent/70">
          PROBLEM
        </span>
        <p className="mt-1 text-sm leading-relaxed text-foreground/80">
          {problem}
        </p>
      </div>

      {/* Why Now area — fixed height */}
      <div className="min-h-[100px] p-4 sm:px-6">
        <span className="font-mono text-[11px] tracking-[0.3em] text-accent/70">
          WHY NOW
        </span>
        <p className="mt-1 text-sm leading-relaxed text-foreground/80">
          {whyNow}
        </p>
      </div>

      {/* Footer: status + link */}
      <div className="mt-auto flex items-center justify-between border-t border-accent/10 px-4 py-3 sm:px-6">
        <LiveStatusBadge projectName={name} />
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('project_cta_click', { project: name, url })}
            className="font-mono text-[11px] tracking-wider text-cta transition-colors hover:text-accent"
          >
            Visit &rarr;
          </a>
        )}
      </div>
    </div>
  );
}

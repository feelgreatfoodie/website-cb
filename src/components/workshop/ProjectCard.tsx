'use client';

import { useState } from 'react';
import Image from 'next/image';
import { m, AnimatePresence } from 'framer-motion';
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
  const [showImage, setShowImage] = useState(false);

  return (
    <m.button
      type="button"
      className="glass group flex h-full w-full flex-col gap-6 rounded-xl p-6 text-left transition-all duration-300 hover:shadow-[0_0_40px_color-mix(in_srgb,var(--accent)_15%,transparent)] hover:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none sm:p-8 cursor-pointer"
      aria-label={showImage ? `${name}: collapse preview` : `${name}: show preview`}
      aria-expanded={showImage}
      onClick={() => {
        const next = !showImage;
        setShowImage(next);
        trackEvent('project_card_toggle', { project: name, action: next ? 'expand' : 'collapse' });
      }}
    >
      <AnimatePresence>
        {image && showImage && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="-mx-6 -mt-6 overflow-hidden rounded-t-xl sm:-mx-8 sm:-mt-8"
          >
            <div className="aspect-[2/1] rounded-lg bg-black/30 p-[10px]">
              <Image
                src={image}
                alt={`${name} screenshot`}
                width={800}
                height={400}
                className="h-full w-full rounded object-contain"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col justify-start">
        <h3 className="mb-1 font-mono text-lg font-bold text-cta">
          {name}
        </h3>
        <p className="text-sm text-foreground/60">{description}</p>
      </div>

      <div className="flex-1 flex flex-col justify-start">
        <span className="font-mono text-[11px] tracking-[0.3em] text-accent/70">
          PROBLEM
        </span>
        <p className="mt-1 text-sm leading-relaxed text-foreground/80">
          {problem}
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-start">
        <span className="font-mono text-[11px] tracking-[0.3em] text-accent/70">
          WHY NOW
        </span>
        <p className="mt-1 text-sm leading-relaxed text-foreground/80">
          {whyNow}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-accent/10 px-2 py-1 font-mono text-[11px] tracking-wide text-accent/70"
          >
            {tag}
          </span>
        ))}
      </div>

      {showImage ? (
        <div className="mt-4 flex items-center justify-between">
          <LiveStatusBadge projectName={name} />
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                trackEvent('project_cta_click', { project: name, url: url! });
              }}
              className="font-mono text-[11px] tracking-wider text-cta transition-colors hover:text-accent"
            >
              [ EXPERIENCE IT LIVE &rarr; ]
            </a>
          )}
        </div>
      ) : (
        <div className="mt-4 text-center font-mono text-[11px] tracking-wider text-cta/50">
          {image ? '[ CLICK TO SEE PREVIEW ]' : '[ PREVIEW COMING SOON ]'}
        </div>
      )}
    </m.button>
  );
}

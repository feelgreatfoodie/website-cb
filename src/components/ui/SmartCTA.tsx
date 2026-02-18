'use client';

import { useMemo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useQuestStore } from '@/lib/hooks/useQuestStore';
import { useActiveSection } from '@/lib/hooks/useActiveSection';
import { trackEvent } from '@/lib/analytics';
import { smartCta } from '@/config/content';
import { cn } from '@/lib/utils/cn';

type IconName = 'arrow' | 'eye' | 'download' | 'envelope';

function CtaIcon({ icon }: { icon: IconName }) {
  switch (icon) {
    case 'arrow':
      return (
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      );
    case 'eye':
      return (
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      );
    case 'download':
      return (
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      );
    case 'envelope':
      return (
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      );
  }
}

export function SmartCTA() {
  const questStarted = useQuestStore((s) => s.questStarted);
  const activeSection = useActiveSection();

  const currentStage = useMemo(() => {
    if (!activeSection) return null;
    return smartCta.stages.find((stage) =>
      (stage.sections as readonly string[]).includes(activeSection)
    );
  }, [activeSection]);

  // Don't render if quest hasn't started
  if (!questStarted) return null;

  // Don't render if current section is hidden
  if (activeSection && (smartCta.hiddenSections as readonly string[]).includes(activeSection)) return null;

  // Don't render if no matching stage
  if (!currentStage) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    trackEvent('smart_cta_click', {
      destination: currentStage.target,
      from_section: activeSection || 'unknown',
    });

    const targetElement = document.querySelector(currentStage.target);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AnimatePresence mode="wait">
      <m.a
        key={currentStage.target}
        href={currentStage.target}
        onClick={handleClick}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        aria-label={`${currentStage.label}: Navigate to ${currentStage.target.replace('#', '')} section`}
        className={cn(
          'fixed bottom-6 left-6 z-50',
          'flex items-center gap-2 px-4 py-3',
          'rounded-full border backdrop-blur-sm',
          'text-[12px] font-medium',
          'transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'print:hidden',
          currentStage.icon === 'envelope'
            ? 'border-cta/40 bg-cta/15 text-cta hover:bg-cta/25 animate-[ctaPulse_3s_ease-in-out_infinite]'
            : 'border-accent/20 bg-background/80 text-foreground/80 hover:border-accent/40 hover:bg-background/90 hover:text-foreground'
        )}
      >
        <CtaIcon icon={currentStage.icon} />
        <span>{currentStage.label}</span>
      </m.a>
    </AnimatePresence>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { m } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { trackEvent } from '@/lib/analytics';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

const STAGE_DELAY = 2400;

const STAGES = [
  {
    name: 'Ingest',
    subtitle: 'Raw event stream',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    data: `{"src":"google_ads","event":"click","cost":2.40}
{"src":"meta","event":"impression","cost":0.02}
{"src":"linkedin","event":"click","cost":4.50}`,
  },
  {
    name: 'Transform',
    subtitle: 'Clean & enrich',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 3 21 3 21 8" />
        <line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" />
        <line x1="15" y1="15" x2="21" y2="21" />
        <line x1="4" y1="4" x2="9" y2="9" />
      </svg>
    ),
    data: `✓ 3 events schema-validated
✓ Sessions resolved → s_4f21, s_8a03, s_1bc7
✓ UTM params merged, timestamps normalized`,
  },
  {
    name: 'Aggregate',
    subtitle: 'Multi-touch attribution',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
    data: `Google Ads  48 conv · $2.4k spend · 4.2× ROAS
Meta        31 conv · $1.8k spend · 2.8× ROAS
LinkedIn    22 conv · $4.5k spend · 1.6× ROAS`,
  },
  {
    name: 'Visualize',
    subtitle: 'Channel performance',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

const CHART_DATA = [
  { label: 'Google Ads', value: 4.2 },
  { label: 'Meta', value: 2.8 },
  { label: 'LinkedIn', value: 1.6 },
];

function ROASChart() {
  const maxValue = Math.max(...CHART_DATA.map((d) => d.value));

  return (
    <div className="space-y-3">
      {CHART_DATA.map((item, i) => (
        <div key={item.label}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-foreground/70 text-[12px]">{item.label}</span>
            <span className="text-accent font-semibold text-[12px]">
              {item.value}× ROAS
            </span>
          </div>
          <div className="h-3 rounded-full bg-foreground/10 overflow-hidden">
            <m.div
              className="h-full rounded-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${(item.value / maxValue) * 100}%` }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: 'easeOut' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export const PipelineDemo = () => {
  // -1 = idle, 0–3 = active stage index
  const [activeStage, setActiveStage] = useState(-1);
  const [expanded, setExpanded] = useState(false);
  const reducedMotion = useReducedMotion();
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const isOpen = expanded;

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const runPipeline = () => {
    clearTimeouts();
    trackEvent('pipeline_demo_run');

    if (reducedMotion) {
      setActiveStage(3);
      return;
    }

    setActiveStage(0);
    for (let i = 1; i <= 3; i++) {
      timeoutsRef.current.push(
        setTimeout(() => setActiveStage(i), STAGE_DELAY * i)
      );
    }
  };

  const resetPipeline = () => {
    clearTimeouts();
    setActiveStage(-1);
  };

  useEffect(() => {
    return () => clearTimeouts();
  }, []);

  const isVisible = (i: number) => i <= activeStage;
  const isActive = (i: number) => i === activeStage;
  const isRunning = activeStage >= 0 && activeStage < 3;
  const isComplete = activeStage >= 3;

  return (
    <div
      className="glass rounded-xl p-6 sm:p-8 cursor-pointer"
      onClick={() => setExpanded((prev) => !prev)}
    >
      {/* Header — always visible */}
      <div className={cn(isOpen ? 'mb-8' : 'mb-0')}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-[11px] font-semibold tracking-[0.3em] uppercase text-accent">
                Live Demo
              </span>
              <m.span
                className="text-accent font-mono text-sm"
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                ——&gt;
              </m.span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
              Interactive Data Pipeline
            </h3>
            <p className="text-[13px] text-foreground/60">
              From raw ad events to channel ROI — an attribution workflow
            </p>
          </div>

          {/* Persistent CTA in header */}
          <Button
            variant="primary"
            onClick={(e) => {
              e.stopPropagation();
              if (!expanded) setExpanded(true);
              if (isComplete) {
                resetPipeline();
                setTimeout(runPipeline, 100);
              } else if (activeStage === -1) {
                runPipeline();
              }
            }}
            disabled={isRunning}
            aria-label={isComplete ? 'Run pipeline again' : 'Run pipeline'}
            className={cn(
              'shrink-0 px-4 py-1.5 text-[12px]',
              isRunning && 'opacity-60 cursor-not-allowed'
            )}
          >
            {isComplete
              ? 'Run Again'
              : isRunning
                ? 'Processing...'
                : 'Run Pipeline'}
          </Button>
        </div>
      </div>

      {/* Collapsible body */}
      <m.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="overflow-hidden"
      >
        {/* Vertical timeline */}
        <div className="mb-8">
          {STAGES.map((stage, i) => (
            <div
              key={stage.name}
              className="grid grid-cols-[40px_1fr] gap-4 sm:gap-5"
            >
              {/* Timeline rail */}
              <div className="flex flex-col items-center">
                <m.div
                  className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-500',
                    isActive(i) && 'border-accent bg-accent/10 text-accent',
                    isVisible(i) &&
                      !isActive(i) &&
                      'border-accent/40 bg-accent/5 text-accent/60',
                    !isVisible(i) &&
                      'border-foreground/20 bg-background/50 text-foreground/30'
                  )}
                  animate={
                    isActive(i) ? { scale: [1, 1.08, 1] } : { scale: 1 }
                  }
                  transition={{
                    duration: 1.5,
                    repeat: isActive(i) ? Infinity : 0,
                  }}
                >
                  {stage.icon}
                </m.div>

                {i < STAGES.length - 1 && (
                  <div
                    className={cn(
                      'w-px flex-1 min-h-[16px] my-2 transition-colors duration-500',
                      isVisible(i) ? 'bg-accent/30' : 'bg-foreground/10'
                    )}
                  />
                )}
              </div>

              {/* Stage content */}
              <div className={cn('pb-6', i === STAGES.length - 1 && 'pb-0')}>
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span
                    className={cn(
                      'font-mono text-sm font-semibold transition-colors duration-500',
                      isActive(i)
                        ? 'text-accent'
                        : isVisible(i)
                          ? 'text-foreground/70'
                          : 'text-foreground/40'
                    )}
                  >
                    {stage.name}
                  </span>
                  <span
                    className={cn(
                      'text-[12px] transition-colors duration-500',
                      isVisible(i) ? 'text-foreground/50' : 'text-foreground/25'
                    )}
                  >
                    {stage.subtitle}
                  </span>
                </div>

                {/* Data bubble — appears when stage activates, persists after */}
                {isVisible(i) && (
                  <m.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{
                      opacity: isActive(i) ? 1 : 0.5,
                      y: 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className={cn(
                      'mt-2 rounded-lg border p-3 font-mono text-[12px] leading-relaxed transition-colors duration-500',
                      isActive(i)
                        ? 'border-accent/30 bg-accent/5'
                        : 'border-foreground/10 bg-background/30'
                    )}
                  >
                    {stage.data ? (
                      <pre className="whitespace-pre-wrap break-words text-foreground/80">
                        {stage.data}
                      </pre>
                    ) : (
                      <ROASChart />
                    )}
                  </m.div>
                )}
              </div>
            </div>
          ))}
        </div>

      </m.div>
    </div>
  );
};

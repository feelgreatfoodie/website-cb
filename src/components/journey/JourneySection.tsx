'use client';

import { useState, useRef, useEffect } from 'react';
import { m } from 'framer-motion';
import { NoteHighway } from './NoteHighway';
import { StreamCard } from './StreamCard';
import { Timeline } from './Timeline';
import { journey, streamTestimonials } from '@/config/content';
import { useQuestStore } from '@/lib/hooks/useQuestStore';
import { useScrollProgress } from '@/lib/hooks/useScrollProgress';
import { usePalette } from '@/lib/palette-context';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';
import { trackEvent } from '@/lib/analytics';

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useScrollProgress(sectionRef);
  const { revealedStreams, revealStream, toggleStream } = useQuestStore();
  const { colors } = usePalette();

  const cardsRef = useRef<HTMLDivElement>(null);

  // Auto-reveal skills when the cards scroll into view (progressive disclosure)
  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const streamIds = ['data', 'sales', 'poker'] as const;
          streamIds.forEach((id, i) => {
            if (!revealedStreams[id]) {
              setTimeout(() => revealStream(id), (i + 1) * 1200);
            }
          });
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [pausedStreams, setPausedStreams] = useState({
    data: false,
    sales: false,
    poker: false,
  });

  const handleHover = (streamId: string, hovered: boolean) => {
    setPausedStreams((prev) => ({ ...prev, [streamId]: hovered }));
  };

  // Resolve semantic color keys to actual hex values
  const resolveColor = (key: string) => {
    return colors[key as keyof typeof colors] ?? key;
  };

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-12 sm:py-16"
    >
      <NoteHighway scrollSpeed={scrollProgress} pausedStreams={pausedStreams} />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <m.div
          className="mb-6 text-center sm:mb-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <m.p
            variants={fadeInUp}
            className="mb-2 font-mono text-xs tracking-[0.4em] text-accent"
          >
            {journey.subtitle}
          </m.p>
          <m.h2
            variants={fadeInUp}
            className="font-mono text-2xl font-bold tracking-[0.15em] text-foreground sm:text-3xl md:text-4xl"
          >
            {journey.title}
          </m.h2>
        </m.div>

        <m.div
          ref={cardsRef}
          className="grid gap-3 sm:gap-4 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {journey.streams.map((stream) => (
            <m.div key={stream.id} variants={fadeInUp} className="h-full">
              <StreamCard
                label={stream.label}
                years={stream.years}
                color={resolveColor(stream.color)}
                description={stream.description}
                skills={stream.skills}
                isRevealed={revealedStreams[stream.id as keyof typeof revealedStreams]}
                onHover={(h) => handleHover(stream.id, h)}
                onClick={() => {
                  trackEvent('stream_reveal', { stream_id: stream.id });
                  toggleStream(stream.id as keyof typeof revealedStreams);
                }}
                testimonial={streamTestimonials[stream.id]}
              />
            </m.div>
          ))}
        </m.div>

        {/* Career Timeline */}
        <div className="mt-8 sm:mt-10">
          <Timeline />
        </div>
      </div>
    </section>
  );
}

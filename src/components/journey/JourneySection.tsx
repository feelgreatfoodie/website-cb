'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { NoteHighway } from './NoteHighway';
import { StreamCard } from './StreamCard';
import { journey } from '@/config/content';
import { useQuestStore } from '@/lib/hooks/useQuestStore';
import { useScrollProgress } from '@/lib/hooks/useScrollProgress';
import { usePalette } from '@/lib/palette-context';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';
import { trackEvent } from '@/lib/analytics';

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useScrollProgress(sectionRef);
  const { revealedStreams, revealStream } = useQuestStore();
  const { colors } = usePalette();

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
      className="relative min-h-[70vh] overflow-hidden bg-background py-16 sm:min-h-screen sm:py-24"
    >
      <NoteHighway scrollSpeed={scrollProgress} pausedStreams={pausedStreams} />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          className="mb-8 text-center sm:mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.p
            variants={fadeInUp}
            className="mb-2 font-mono text-xs tracking-[0.4em] text-accent"
          >
            {journey.subtitle}
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-mono text-2xl font-bold tracking-[0.15em] text-foreground sm:text-3xl md:text-4xl"
          >
            {journey.title}
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid gap-4 sm:gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {journey.streams.map((stream) => (
            <motion.div key={stream.id} variants={fadeInUp} className="h-full">
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
                  revealStream(stream.id as keyof typeof revealedStreams);
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

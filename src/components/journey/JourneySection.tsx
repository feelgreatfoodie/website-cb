'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { NoteHighway } from './NoteHighway';
import { StreamCard } from './StreamCard';
import { LootBox } from './LootBox';
import { journey } from '@/config/content';
import { useQuestStore } from '@/lib/hooks/useQuestStore';
import { useScrollProgress } from '@/lib/hooks/useScrollProgress';
import { usePalette } from '@/lib/palette-context';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';

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
      className="relative min-h-screen overflow-hidden bg-background py-24"
    >
      <NoteHighway scrollSpeed={scrollProgress} pausedStreams={pausedStreams} />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <motion.div
          className="mb-16 text-center"
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
            className="font-mono text-3xl font-bold tracking-[0.15em] text-foreground sm:text-4xl"
          >
            {journey.title}
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {journey.streams.map((stream) => (
            <motion.div key={stream.id} variants={fadeInUp}>
              <StreamCard
                label={stream.label}
                years={stream.years}
                color={resolveColor(stream.color)}
                description={stream.description}
                isRevealed={revealedStreams[stream.id as keyof typeof revealedStreams]}
                onHover={(h) => handleHover(stream.id, h)}
                onClick={() =>
                  revealStream(stream.id as keyof typeof revealedStreams)
                }
              />
              <LootBox
                skills={stream.skills}
                color={resolveColor(stream.color)}
                isOpen={revealedStreams[stream.id as keyof typeof revealedStreams]}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { m } from 'framer-motion';
import { openTo, oneSheeter } from '@/config/content';
import { onesheetMap, onesheetPreviewMap } from '@/config/palettes';
import { usePalette } from '@/lib/palette-context';
import { useQuestStore } from '@/lib/hooks/useQuestStore';
import { RoleCard } from './RoleCard';
import { PDFPreview } from '@/components/download/PDFPreview';
import { Button } from '@/components/ui/Button';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';
import { trackEvent } from '@/lib/analytics';

export function OpenToSection() {
  const { paletteId } = usePalette();
  const markDownloaded = useQuestStore((s) => s.markDownloaded);
  const pdfUrl = onesheetMap[paletteId] ?? onesheetMap['nazare-wavefronts'];
  const previewUrl =
    onesheetPreviewMap[paletteId] ??
    onesheetPreviewMap['nazare-wavefronts'];

  return (
    <section id="opento" className="relative bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <m.div
          className="mb-16 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <m.p
            variants={fadeInUp}
            className="mb-2 font-mono text-xs tracking-[0.4em] text-accent"
          >
            {openTo.subtitle}
          </m.p>
          <m.h2
            variants={fadeInUp}
            className="font-mono text-2xl font-bold tracking-[0.15em] text-foreground sm:text-3xl md:text-4xl"
          >
            {openTo.title}
          </m.h2>
        </m.div>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          {/* Left 60%: Role cards */}
          <m.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:w-3/5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {openTo.roles.map((role) => (
              <RoleCard
                key={role.title}
                description={role.description}
              />
            ))}
          </m.div>

          {/* Right 40%: One-sheeter */}
          <m.div
            id="onesheeter"
            className="flex flex-col items-center justify-center lg:w-2/5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <m.p
              variants={fadeInUp}
              className="mb-2 font-mono text-xs tracking-[0.4em] text-accent"
            >
              {oneSheeter.subtitle}
            </m.p>
            <m.h3
              variants={fadeInUp}
              className="mb-8 font-mono text-xl font-bold tracking-[0.15em] text-foreground sm:text-2xl"
            >
              {oneSheeter.title}
            </m.h3>
            <m.div variants={fadeInUp} className="mb-8">
              <PDFPreview
                previewSrc={previewUrl}
                alt="Christian Bourlier one-sheeter preview"
              />
            </m.div>
            <m.div variants={fadeInUp}>
              <a
                href={pdfUrl}
                download
                onClick={() => {
                  trackEvent('pdf_download', { palette_id: paletteId });
                  markDownloaded();
                }}
                className="inline-block"
              >
                <Button variant="primary" type="button">
                  {oneSheeter.ctaLabel}
                </Button>
              </a>
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  );
}

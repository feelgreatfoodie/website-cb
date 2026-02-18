'use client';

import Image from 'next/image';
import { m } from 'framer-motion';
import { oneSheeter, implementation } from '@/config/content';
import { onesheetMap, onesheetPreviewMap } from '@/config/palettes';
import { usePalette } from '@/lib/palette-context';
import { useQuestStore } from '@/lib/hooks/useQuestStore';
import { PDFPreview } from './PDFPreview';
import { Button } from '@/components/ui/Button';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';
import { trackEvent } from '@/lib/analytics';

export function OneSheeterSection() {
  const { paletteId } = usePalette();
  const markDownloaded = useQuestStore((s) => s.markDownloaded);
  const pdfUrl = onesheetMap[paletteId] ?? onesheetMap['nazare-wavefronts'];
  const previewUrl =
    onesheetPreviewMap[paletteId] ??
    onesheetPreviewMap['nazare-wavefronts'];

  return (
    <section id="onesheeter" className="relative bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <m.div
          className="text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <m.p
            variants={fadeInUp}
            className="mb-2 font-mono text-xs tracking-[0.4em] text-accent"
          >
            {oneSheeter.subtitle}
          </m.p>
          <m.h2
            variants={fadeInUp}
            className="mb-12 font-mono text-2xl font-bold tracking-[0.15em] text-foreground sm:text-3xl md:text-4xl"
          >
            {oneSheeter.title}
          </m.h2>
          <m.div variants={fadeInUp} className="mb-12">
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

          {/* GCP cert badges */}
          <m.div variants={fadeInUp} className="mt-8 flex items-center justify-center gap-6">
            {implementation.certifications.map((cert) => (
              <div key={cert.name} className="flex flex-col items-center gap-2">
                <Image
                  src={cert.badge}
                  alt={cert.name}
                  width={56}
                  height={56}
                  className="opacity-70 transition-opacity hover:opacity-100"
                />
                <span className="font-mono text-[11px] tracking-wider text-foreground/40">
                  {cert.name.replace('GCP ', '')}
                </span>
              </div>
            ))}
          </m.div>
        </m.div>
      </div>
    </section>
  );
}

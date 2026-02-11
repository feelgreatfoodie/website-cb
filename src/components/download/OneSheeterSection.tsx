'use client';

import { motion } from 'framer-motion';
import { oneSheeter } from '@/config/content';
import { onesheetMap, onesheetPreviewMap } from '@/config/onesheet-map';
import { usePalette } from '@/lib/palette-context';
import { useQuestStore } from '@/lib/hooks/useQuestStore';
import { PDFPreview } from './PDFPreview';
import { Button } from '@/components/ui/Button';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';
import { trackEvent } from '@/lib/analytics';

export function OneSheeterSection() {
  const { paletteId } = usePalette();
  const markDownloaded = useQuestStore((s) => s.markDownloaded);
  const pdfUrl = onesheetMap[paletteId] ?? onesheetMap['porto-data-streams'];
  const previewUrl =
    onesheetPreviewMap[paletteId] ??
    onesheetPreviewMap['porto-data-streams'];

  return (
    <section id="onesheeter" className="relative bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          className="text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            variants={fadeInUp}
            className="mb-4 font-mono text-2xl font-bold tracking-[0.15em] text-foreground sm:text-3xl md:text-4xl"
          >
            {oneSheeter.title}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mb-12 font-mono text-sm text-foreground/50"
          >
            {oneSheeter.subtitle}
          </motion.p>
          <motion.div variants={fadeInUp} className="mb-12">
            <PDFPreview
              previewSrc={previewUrl}
              alt="Christian Bourlier one-sheeter preview"
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

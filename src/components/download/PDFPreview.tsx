'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { m, useInView } from 'framer-motion';

interface PDFPreviewProps {
  previewSrc: string;
  alt: string;
}

function PlaceholderDoc() {
  return (
    <div className="flex h-72 items-center justify-center bg-gradient-to-b from-transparent to-accent/5">
      <div className="text-center">
        <svg
          viewBox="0 0 48 64"
          className="mx-auto mb-4 h-20 w-14"
          fill="none"
        >
          {/* Page */}
          <rect
            x="2"
            y="2"
            width="44"
            height="60"
            rx="3"
            className="fill-background-light/50 stroke-accent/40"
            strokeWidth={1.5}
          />
          {/* Folded corner */}
          <path
            d="M34 2 L46 14 L34 14 Z"
            className="fill-accent/10 stroke-accent/30"
            strokeWidth={1}
          />
          {/* Text lines */}
          <rect x="10" y="22" width="22" height="2" rx="1" className="fill-accent/25" />
          <rect x="10" y="28" width="28" height="2" rx="1" className="fill-accent/20" />
          <rect x="10" y="34" width="18" height="2" rx="1" className="fill-accent/15" />
          <rect x="10" y="40" width="24" height="2" rx="1" className="fill-accent/20" />
          <rect x="10" y="46" width="14" height="2" rx="1" className="fill-accent/10" />
        </svg>
        <p className="font-mono text-xs font-semibold tracking-[0.2em] text-accent/50">
          ONE-SHEETER
        </p>
        <p className="mt-1 font-mono text-[11px] text-foreground/50">
          PDF
        </p>
      </div>
    </div>
  );
}

export function PDFPreview({ previewSrc, alt }: PDFPreviewProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { once: true });

  return (
    <m.div
      ref={wrapperRef}
      className="relative mx-auto w-48 sm:w-56"
      style={{ perspective: '800px' }}
      initial={{ opacity: 0, rotateY: -15 }}
      animate={isInView ? { opacity: 1, rotateY: -5 } : { opacity: 0, rotateY: -15 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      whileHover={{ rotateY: 0, scale: 1.05 }}
    >
      <div className="glass overflow-hidden rounded-lg shadow-2xl">
        {imgFailed || !previewSrc ? (
          <PlaceholderDoc />
        ) : (
          <div className="relative">
            {!imgLoaded && (
              <div className="absolute inset-0">
                <PlaceholderDoc />
              </div>
            )}
            <Image
              src={previewSrc}
              alt={alt}
              width={224}
              height={290}
              className={`h-auto w-full transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgFailed(true)}
            />
          </div>
        )}
      </div>
      {/* Glow effect beneath */}
      <div
        className="absolute -bottom-4 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full blur-xl"
        style={{
          background:
            'color-mix(in srgb, var(--accent) 20%, transparent)',
        }}
      />
    </m.div>
  );
}

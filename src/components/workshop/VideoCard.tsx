'use client';

import { useState } from 'react';
import Image from 'next/image';
import { trackEvent } from '@/lib/analytics';

interface VideoCardProps {
  title: string;
  description: string;
  videoId: string;
  start?: number;
  end?: number;
}

export function VideoCard({
  title,
  description,
  videoId,
  start,
  end,
}: VideoCardProps) {
  const [playing, setPlaying] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const embedParams = new URLSearchParams({ autoplay: '1', rel: '0' });
  if (start !== undefined) embedParams.set('start', String(start));
  if (end !== undefined) embedParams.set('end', String(end));
  const embedUrl = `https://www.youtube.com/embed/${videoId}?${embedParams.toString()}`;

  return (
    <div className="glass group rounded-xl p-4 transition-all duration-300 hover:shadow-[0_0_40px_color-mix(in_srgb,var(--accent)_15%,transparent)] hover:border-accent/40 sm:p-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        {playing ? (
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              trackEvent('video_play', { video_id: videoId, video_title: title });
              setPlaying(true);
            }}
            className="absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`Play ${title}`}
          >
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors duration-300 group-hover:bg-black/20">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cta/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-1 h-7 w-7 text-background"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </button>
        )}
      </div>

      <h3 className="mt-4 font-mono text-lg font-bold text-cta">{title}</h3>
      <p className="mt-1 text-sm text-foreground/60">{description}</p>
    </div>
  );
}

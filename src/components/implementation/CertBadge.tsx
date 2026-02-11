'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations/scroll-variants';

interface CertBadgeProps {
  name: string;
  badge: string;
}

export function CertBadge({ name, badge }: CertBadgeProps) {
  // Split on last space before the specialty (e.g. "GCP Professional" + "Data Engineer")
  const parts = name.match(/^(.+Professional)\s+(.+)$/);
  const line1 = parts ? parts[1] : name;
  const line2 = parts ? parts[2] : '';

  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col items-center gap-3"
    >
      <div className="glass flex h-24 w-24 items-center justify-center rounded-xl sm:h-32 sm:w-32">
        <img
          src={badge}
          alt={name}
          className="h-16 w-16 object-contain sm:h-24 sm:w-24"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
      <div className="text-center font-mono text-xs text-foreground/50">
        <p>{line1}</p>
        {line2 && <p>{line2}</p>}
      </div>
    </motion.div>
  );
}

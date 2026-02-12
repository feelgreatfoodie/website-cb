'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { cn } from '@/lib/utils/cn';

interface PresenceData {
  online: boolean;
  lastSeen: string;
}

export function PresenceIndicator() {
  const [presence, setPresence] = useState<PresenceData | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Initial fetch
    const fetchPresence = async () => {
      try {
        const response = await fetch('/api/presence');
        if (response.ok) {
          const data = await response.json();
          setPresence(data);
        }
      } catch (error) {
        // Silently fail - presence is a nice-to-have feature
        console.error('Failed to fetch presence:', error);
      }
    };

    fetchPresence();

    // Poll every 30 seconds
    const interval = setInterval(fetchPresence, 30000);

    return () => clearInterval(interval);
  }, []);

  // Only show when online
  if (!presence?.online) {
    return null;
  }

  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1"
      role="status"
      aria-live="polite"
      aria-label="Christian is online"
    >
      <span
        className={cn(
          'size-1.5 rounded-full bg-emerald-400',
          !prefersReducedMotion && 'animate-pulse'
        )}
        aria-hidden="true"
      />
      <span className="text-[11px] text-foreground/60">
        Christian is online
      </span>
    </div>
  );
}

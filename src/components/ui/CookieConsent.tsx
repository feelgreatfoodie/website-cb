'use client';

import { useState, useCallback } from 'react';
import Script from 'next/script';
import { useToast } from '@/components/ui/Toast';

const CONSENT_KEY = 'cb-analytics-consent';
const GA_ID = 'G-N91F3VEKB4';

/**
 * Detect GDPR-regulated regions via browser timezone.
 * European timezones → GDPR. Covers EU 27, EEA, UK, and Switzerland.
 */
function isGdprRegion(): boolean {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz.startsWith('Europe/') || tz === 'Atlantic/Reykjavik';
  } catch {
    return false;
  }
}

function getStoredConsent(): 'granted' | 'denied' | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === 'granted' || stored === 'denied') return stored;
  return null;
}

/**
 * Determines whether GA should load:
 * - GDPR regions: only if explicitly granted
 * - Non-GDPR regions: unless explicitly denied (opt-out model)
 */
function shouldLoadGA(consent: 'granted' | 'denied' | null, isGdpr: boolean): boolean {
  if (consent === 'denied') return false;
  if (consent === 'granted') return true;
  // No stored preference: load for non-GDPR, block for GDPR
  return !isGdpr;
}

export function CookieConsent() {
  const [consent, setConsent] = useState<'granted' | 'denied' | null>(getStoredConsent);
  const [isGdpr] = useState(() => {
    if (typeof window === 'undefined') return false;
    return isGdprRegion();
  });

  const accept = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, 'granted');
    setConsent('granted');
  }, []);

  const decline = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, 'denied');
    setConsent('denied');
  }, []);

  const loadGA = shouldLoadGA(consent, isGdpr);

  // Only show banner for GDPR visitors who haven't made a choice
  const showBanner = isGdpr && consent === null;

  return (
    <>
      {loadGA && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="lazyOnload"
          />
          <Script id="gtag-init" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}

      {showBanner && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed bottom-0 left-0 right-0 z-[100] border-t border-accent/15 bg-background/95 px-4 py-3 backdrop-blur-md print:hidden"
        >
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
            <p className="font-mono text-[11px] tracking-wide text-foreground/60">
              This site uses analytics to improve your experience.
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={accept}
                type="button"
                className="rounded-md bg-accent/20 px-3 py-1 font-mono text-[11px] tracking-wider text-accent transition-colors hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Accept analytics"
              >
                Accept
              </button>
              <button
                onClick={decline}
                type="button"
                className="rounded-md px-3 py-1 font-mono text-[11px] tracking-wider text-foreground/50 transition-colors hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Decline analytics"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Toggle analytics consent from anywhere (e.g. footer link). */
export function useAnalyticsToggle() {
  const toast = useToast();

  const toggle = useCallback(() => {
    const current = getStoredConsent();
    if (current === 'denied' || current === null) {
      localStorage.setItem(CONSENT_KEY, 'granted');
      toast('Analytics enabled — reload to apply.');
    } else {
      localStorage.setItem(CONSENT_KEY, 'denied');
      toast('Analytics disabled — reload to apply.');
    }
  }, [toast]);

  return toggle;
}

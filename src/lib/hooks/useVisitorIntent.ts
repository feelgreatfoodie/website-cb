'use client';

import { useState } from 'react';

export type VisitorIntent = 'recruiter' | 'client' | 'engineer' | 'default';

export function useVisitorIntent(): VisitorIntent {
  const [intent] = useState<VisitorIntent>(() => {
    if (typeof window === 'undefined') return 'default';

    // 1. Explicit URL params take priority
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref') || params.get('utm_source') || '';
    if (['recruiter', 'hiring', 'talent'].includes(ref)) return 'recruiter';
    if (['client', 'customer', 'partner'].includes(ref)) return 'client';
    if (['engineer', 'dev', 'github', 'tech'].includes(ref)) return 'engineer';
    if (ref) return 'default';

    // 2. Referrer-based fallback (no params present)
    const referrer = document.referrer.toLowerCase();
    if (referrer.includes('linkedin.com')) return 'recruiter';
    if (referrer.includes('github.com')) return 'engineer';
    if (referrer.includes('medium.com')) return 'client';

    // 3. Direct traffic → default
    return 'default';
  });
  return intent;
}

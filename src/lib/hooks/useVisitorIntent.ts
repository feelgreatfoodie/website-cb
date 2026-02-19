'use client';

import { useState, useEffect } from 'react';

export type VisitorIntent = 'recruiter' | 'client' | 'engineer' | 'default';

export function useVisitorIntent(): VisitorIntent {
  const [intent, setIntent] = useState<VisitorIntent>('default');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref') || params.get('utm_source') || '';
    if (['recruiter', 'hiring', 'talent'].includes(ref)) {
      setIntent('recruiter');
      return;
    }
    if (['client', 'customer', 'partner'].includes(ref)) {
      setIntent('client');
      return;
    }
    if (['engineer', 'dev', 'github', 'tech'].includes(ref)) {
      setIntent('engineer');
      return;
    }
    if (ref) return;

    const referrer = document.referrer.toLowerCase();
    if (referrer.includes('linkedin.com')) {
      setIntent('recruiter');
      return;
    }
    if (referrer.includes('github.com')) {
      setIntent('engineer');
      return;
    }
    if (referrer.includes('medium.com')) {
      setIntent('client');
      return;
    }
  }, []);

  return intent;
}

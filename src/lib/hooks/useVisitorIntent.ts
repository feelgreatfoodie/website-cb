'use client';

import { useSyncExternalStore } from 'react';

export type VisitorIntent = 'recruiter' | 'client' | 'engineer' | 'default';

function subscribe() {
  return () => {};
}

function getSnapshot(): VisitorIntent {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref') || params.get('utm_source') || '';
  if (['recruiter', 'hiring', 'talent'].includes(ref)) return 'recruiter';
  if (['client', 'customer', 'partner'].includes(ref)) return 'client';
  if (['engineer', 'dev', 'github', 'tech'].includes(ref)) return 'engineer';
  if (ref) return 'default';

  const referrer = document.referrer.toLowerCase();
  if (referrer.includes('linkedin.com')) return 'recruiter';
  if (referrer.includes('github.com')) return 'engineer';
  if (referrer.includes('medium.com')) return 'client';

  return 'default';
}

function getServerSnapshot(): VisitorIntent {
  return 'default';
}

export function useVisitorIntent(): VisitorIntent {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

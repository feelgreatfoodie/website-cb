'use client';

import { useState, useEffect, useRef } from 'react';

const SECTION_IDS = [
  'hero', 'journey', 'competencies', 'opento', 'workshop',
  'bossfight', 'implementation', 'writing', 'onesheeter', 'contact',
];

export function useActiveSection(): string {
  const [active, setActive] = useState('hero');
  const ticking = useRef(false);

  useEffect(() => {
    const handler = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          const offset = window.innerHeight * 0.3;
          let current = 'hero';
          for (const id of SECTION_IDS) {
            const el = document.getElementById(id);
            if (el && el.offsetTop - offset <= window.scrollY) {
              current = id;
            }
          }
          setActive(current);
          ticking.current = false;
        });
      }
    };

    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return active;
}

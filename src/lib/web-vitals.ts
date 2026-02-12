import type { Metric } from 'web-vitals';

function sendToGA(metric: Metric) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', metric.name, {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_label: metric.id,
    non_interaction: true,
  });
}

export function reportWebVitals() {
  import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
    onCLS(sendToGA);
    onFCP(sendToGA);
    onINP(sendToGA);
    onLCP(sendToGA);
    onTTFB(sendToGA);
  });
}

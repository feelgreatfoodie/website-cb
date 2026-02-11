interface GtagFn {
  (command: 'config', targetId: string, params?: Record<string, unknown>): void;
  (command: 'event', action: string, params?: Record<string, unknown>): void;
  (command: 'set', params: Record<string, unknown>): void;
}

interface Window {
  gtag: GtagFn;
  dataLayer: Array<unknown>;
}

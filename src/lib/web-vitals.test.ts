import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('reportWebVitals', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('registers all five web vital callbacks', async () => {
    const onCLS = vi.fn();
    const onFCP = vi.fn();
    const onINP = vi.fn();
    const onLCP = vi.fn();
    const onTTFB = vi.fn();

    vi.doMock('web-vitals', () => ({
      onCLS,
      onFCP,
      onINP,
      onLCP,
      onTTFB,
    }));

    const { reportWebVitals } = await import('./web-vitals');
    reportWebVitals();

    // Wait for dynamic import to resolve
    await vi.dynamicImportSettled();

    expect(onCLS).toHaveBeenCalledOnce();
    expect(onFCP).toHaveBeenCalledOnce();
    expect(onINP).toHaveBeenCalledOnce();
    expect(onLCP).toHaveBeenCalledOnce();
    expect(onTTFB).toHaveBeenCalledOnce();
  });
});

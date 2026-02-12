import { describe, it, expect, vi, beforeEach } from 'vitest';
import { trackEvent } from './analytics';

describe('trackEvent', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('calls window.gtag with event name and params', () => {
    const gtagMock = vi.fn();
    vi.stubGlobal('gtag', gtagMock);
    Object.defineProperty(window, 'gtag', { value: gtagMock, writable: true });

    trackEvent('test_event', { category: 'test' });

    expect(gtagMock).toHaveBeenCalledWith('event', 'test_event', {
      category: 'test',
    });
  });

  it('does not throw when gtag is not defined', () => {
    // @ts-expect-error — intentionally testing undefined gtag
    delete window.gtag;

    expect(() => trackEvent('test_event')).not.toThrow();
  });

  it('calls gtag without params when none are provided', () => {
    const gtagMock = vi.fn();
    Object.defineProperty(window, 'gtag', { value: gtagMock, writable: true });

    trackEvent('simple_event');

    expect(gtagMock).toHaveBeenCalledWith('event', 'simple_event', undefined);
  });
});

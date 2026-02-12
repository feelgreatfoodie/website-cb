'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ background: '#0a0f1a', color: '#e0e0e0', fontFamily: 'monospace' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '0.15em', marginBottom: '1rem' }}>
            SOMETHING WENT WRONG
          </h2>
          <p style={{ fontSize: '0.875rem', opacity: 0.5, marginBottom: '2rem', maxWidth: '28rem' }}>
            {error.digest
              ? 'A critical error occurred. Please refresh the page.'
              : error.message || 'A critical error occurred.'}
          </p>
          <button
            onClick={reset}
            style={{ padding: '0.5rem 1.5rem', border: '1px solid rgba(100,200,200,0.3)', borderRadius: '0.5rem', background: 'rgba(100,200,200,0.1)', color: '#64c8c8', cursor: 'pointer', fontSize: '0.875rem' }}
          >
            Refresh
          </button>
        </div>
      </body>
    </html>
  );
}

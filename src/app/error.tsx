'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h2 className="mb-4 font-mono text-2xl font-bold tracking-wider text-foreground">
        SOMETHING WENT WRONG
      </h2>
      <p className="mb-8 max-w-md font-mono text-sm text-foreground/50">
        {error.digest
          ? 'An unexpected error occurred. Please try again.'
          : error.message || 'An unexpected error occurred.'}
      </p>
      <button
        onClick={reset}
        className="rounded-lg border border-accent/30 bg-accent/10 px-6 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent/20"
      >
        Try Again
      </button>
    </div>
  );
}

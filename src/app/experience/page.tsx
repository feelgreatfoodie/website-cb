import { PersonaPicker } from '@/components/experience/PersonaPicker';

export default function ExperiencePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="mb-4 text-center font-mono text-3xl font-bold tracking-[0.15em] text-foreground sm:text-4xl">
        THE CB EXPERIENCE
      </h1>
      <p className="mb-12 text-center text-foreground/70">
        Choose your perspective to see what matters most to you.
      </p>
      <PersonaPicker />
    </main>
  );
}

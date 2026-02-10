import { HeroSection } from '@/components/hero/HeroSection';

export default function Home() {
  return (
    <main>
      <HeroSection />

      {/* Phase 2: Journey / Note Highway */}
      <section
        id="journey"
        className="min-h-screen flex items-center justify-center"
        style={{ background: '#2E004B' }}
      >
        <p className="font-mono text-sm tracking-widest text-[#1E90FF]/40">
          // JOURNEY LOADING...
        </p>
      </section>

      {/* Phase 3: Workshop */}
      <section
        id="workshop"
        className="min-h-screen flex items-center justify-center"
        style={{ background: '#2E004B' }}
      >
        <p className="font-mono text-sm tracking-widest text-[#1E90FF]/40">
          // WORKSHOP LOADING...
        </p>
      </section>

      {/* Phase 4: Boss Fight */}
      <section
        id="bossfight"
        className="min-h-screen flex items-center justify-center"
        style={{ background: '#2E004B' }}
      >
        <p className="font-mono text-sm tracking-widest text-[#1E90FF]/40">
          // BOSS FIGHT LOADING...
        </p>
      </section>
    </main>
  );
}

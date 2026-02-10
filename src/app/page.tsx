import { HeroSection } from '@/components/hero/HeroSection';
import { JourneySection } from '@/components/journey/JourneySection';
import { WorkshopSection } from '@/components/workshop/WorkshopSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <JourneySection />
      <WorkshopSection />

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

import { HeroSection } from '@/components/hero/HeroSection';
import { JourneySection } from '@/components/journey/JourneySection';
import { WorkshopSection } from '@/components/workshop/WorkshopSection';
import { BossFightSection } from '@/components/bossfight/BossFightSection';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main>
        <HeroSection />
        <JourneySection />
        <WorkshopSection />
        <BossFightSection />
      </main>
      <Footer />
    </>
  );
}

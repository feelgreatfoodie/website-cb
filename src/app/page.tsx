import { HeroSection } from '@/components/hero/HeroSection';
import { JourneySection } from '@/components/journey/JourneySection';
import { CompetencyHubSection } from '@/components/competencies/CompetencyHubSection';
import { OpenToSection } from '@/components/opento/OpenToSection';
import { WorkshopSection } from '@/components/workshop/WorkshopSection';
import { BossFightSection } from '@/components/bossfight/BossFightSection';
import { ImplementationSection } from '@/components/implementation/ImplementationSection';
import { WritingSection } from '@/components/writing/WritingSection';
import { OneSheeterSection } from '@/components/download/OneSheeterSection';
import { ContactSection } from '@/components/contact/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { KonamiOverlay } from '@/components/ui/KonamiOverlay';
import { CursorTrail } from '@/components/ui/CursorTrail';
import { getMediumPosts } from '@/lib/medium';

export const revalidate = 3600;

export default async function Home() {
  const posts = await getMediumPosts(3);

  return (
    <>
      <Header />
      <ScrollProgress />
      <KonamiOverlay />
      <CursorTrail />
      <main>
        <HeroSection />
        <JourneySection />
        <CompetencyHubSection />
        <OpenToSection />
        <WorkshopSection />
        <BossFightSection />
        <ImplementationSection />
        <WritingSection posts={posts} />
        <OneSheeterSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

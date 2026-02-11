import { HeroSection } from '@/components/hero/HeroSection';
import { BelowFold } from '@/components/layout/BelowFold';
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
        <BelowFold posts={posts} />
      </main>
      <Footer />
    </>
  );
}

'use client';

import dynamic from 'next/dynamic';
import type { MediumPost } from '@/lib/medium';

function SectionPlaceholder() {
  return (
    <div
      className="min-h-[50vh]"
      style={{
        background:
          'linear-gradient(135deg, var(--background) 0%, color-mix(in srgb, var(--accent) 13%, transparent) 50%, var(--background) 100%)',
      }}
    />
  );
}

const JourneySection = dynamic(
  () => import('@/components/journey/JourneySection').then((m) => ({ default: m.JourneySection })),
  { loading: () => <SectionPlaceholder /> }
);
const CompetencyHubSection = dynamic(
  () => import('@/components/competencies/CompetencyHubSection').then((m) => ({ default: m.CompetencyHubSection })),
  { loading: () => <SectionPlaceholder /> }
);
const OpenToSection = dynamic(
  () => import('@/components/opento/OpenToSection').then((m) => ({ default: m.OpenToSection })),
  { loading: () => <SectionPlaceholder /> }
);
const WorkshopSection = dynamic(
  () => import('@/components/workshop/WorkshopSection').then((m) => ({ default: m.WorkshopSection })),
  { loading: () => <SectionPlaceholder /> }
);
const BossFightSection = dynamic(
  () => import('@/components/bossfight/BossFightSection').then((m) => ({ default: m.BossFightSection })),
  { loading: () => <SectionPlaceholder /> }
);
const ImplementationSection = dynamic(
  () => import('@/components/implementation/ImplementationSection').then((m) => ({ default: m.ImplementationSection })),
  { loading: () => <SectionPlaceholder /> }
);
const WritingSection = dynamic(
  () => import('@/components/writing/WritingSection').then((m) => ({ default: m.WritingSection })),
  { loading: () => <SectionPlaceholder /> }
);
const OneSheeterSection = dynamic(
  () => import('@/components/download/OneSheeterSection').then((m) => ({ default: m.OneSheeterSection })),
  { loading: () => <SectionPlaceholder /> }
);
const ContactSection = dynamic(
  () => import('@/components/contact/ContactSection').then((m) => ({ default: m.ContactSection })),
  { loading: () => <SectionPlaceholder /> }
);

export function BelowFold({ posts }: { posts: MediumPost[] }) {
  return (
    <>
      <JourneySection />
      <CompetencyHubSection />
      <OpenToSection />
      <WorkshopSection />
      <BossFightSection />
      <ImplementationSection />
      <WritingSection posts={posts} />
      <OneSheeterSection />
      <ContactSection />
    </>
  );
}

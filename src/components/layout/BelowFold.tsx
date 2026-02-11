'use client';

import dynamic from 'next/dynamic';
import type { MediumPost } from '@/lib/medium';

const JourneySection = dynamic(
  () => import('@/components/journey/JourneySection').then((m) => ({ default: m.JourneySection }))
);
const CompetencyHubSection = dynamic(
  () => import('@/components/competencies/CompetencyHubSection').then((m) => ({ default: m.CompetencyHubSection }))
);
const OpenToSection = dynamic(
  () => import('@/components/opento/OpenToSection').then((m) => ({ default: m.OpenToSection }))
);
const WorkshopSection = dynamic(
  () => import('@/components/workshop/WorkshopSection').then((m) => ({ default: m.WorkshopSection }))
);
const BossFightSection = dynamic(
  () => import('@/components/bossfight/BossFightSection').then((m) => ({ default: m.BossFightSection }))
);
const ImplementationSection = dynamic(
  () => import('@/components/implementation/ImplementationSection').then((m) => ({ default: m.ImplementationSection }))
);
const WritingSection = dynamic(
  () => import('@/components/writing/WritingSection').then((m) => ({ default: m.WritingSection }))
);
const OneSheeterSection = dynamic(
  () => import('@/components/download/OneSheeterSection').then((m) => ({ default: m.OneSheeterSection }))
);
const ContactSection = dynamic(
  () => import('@/components/contact/ContactSection').then((m) => ({ default: m.ContactSection }))
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

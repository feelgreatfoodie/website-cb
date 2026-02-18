'use client';

import dynamic from 'next/dynamic';
import type { MediumPost } from '@/lib/medium';

function SectionPlaceholder({ height = 'min-h-[50vh]' }: { height?: string }) {
  return (
    <div
      className={height}
      style={{
        background:
          'linear-gradient(135deg, var(--background) 0%, color-mix(in srgb, var(--accent) 13%, transparent) 50%, var(--background) 100%)',
      }}
    />
  );
}

function SectionDivider() {
  return (
    <div
      className="mx-auto h-px w-3/4 max-w-3xl"
      style={{
        background:
          'linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 20%, transparent), transparent)',
      }}
    />
  );
}

const JourneySection = dynamic(
  () => import('@/components/journey/JourneySection').then((m) => ({ default: m.JourneySection })),
  { loading: () => <SectionPlaceholder height="min-h-[80vh]" /> }
);
const CompetencyHubSection = dynamic(
  () => import('@/components/competencies/CompetencyHubSection').then((m) => ({ default: m.CompetencyHubSection })),
  { loading: () => <SectionPlaceholder height="min-h-[50vh]" /> }
);
const OpenToSection = dynamic(
  () => import('@/components/opento/OpenToSection').then((m) => ({ default: m.OpenToSection })),
  { loading: () => <SectionPlaceholder height="min-h-[50vh]" /> }
);
const WorkshopSection = dynamic(
  () => import('@/components/workshop/WorkshopSection').then((m) => ({ default: m.WorkshopSection })),
  { ssr: false, loading: () => <SectionPlaceholder height="min-h-[60vh]" /> }
);
const BossFightSection = dynamic(
  () => import('@/components/bossfight/BossFightSection').then((m) => ({ default: m.BossFightSection })),
  { ssr: false, loading: () => <SectionPlaceholder height="min-h-[40vh]" /> }
);
const WritingSection = dynamic(
  () => import('@/components/writing/WritingSection').then((m) => ({ default: m.WritingSection })),
  { loading: () => <SectionPlaceholder height="min-h-[40vh]" /> }
);
const ContactSection = dynamic(
  () => import('@/components/contact/ContactSection').then((m) => ({ default: m.ContactSection })),
  { loading: () => <SectionPlaceholder height="min-h-[50vh]" /> }
);

export function BelowFold({ posts }: { posts: MediumPost[] }) {
  return (
    <>
      <JourneySection />
      <SectionDivider />
      <CompetencyHubSection />
      <SectionDivider />
      <OpenToSection />
      <SectionDivider />
      <WorkshopSection />
      <SectionDivider />
      <BossFightSection />
      <SectionDivider />
      <WritingSection posts={posts} />
      <SectionDivider />
      <ContactSection />
    </>
  );
}

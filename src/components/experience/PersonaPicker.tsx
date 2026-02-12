'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ExperienceFlow } from './ExperienceFlow';
import { trackEvent } from '@/lib/analytics';

type Persona = 'recruiter' | 'client' | 'collaborator';

const personas: Array<{
  id: Persona;
  title: string;
  description: string;
  icon: React.ReactNode;
}> = [
  {
    id: 'recruiter',
    title: 'Recruiter',
    description: 'Evaluating technical talent and cultural fit for your organization.',
    icon: (
      <svg
        className="h-12 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: 'client',
    title: 'Client',
    description: 'Looking for a technical partner to solve complex business challenges.',
    icon: (
      <svg
        className="h-12 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
  },
  {
    id: 'collaborator',
    title: 'Collaborator',
    description: 'Exploring potential partnerships and shared technical interests.',
    icon: (
      <svg
        className="h-12 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
];

export function PersonaPicker() {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);

  const handlePersonaSelect = (persona: Persona) => {
    setSelectedPersona(persona);
    trackEvent('experience_persona_select', { persona });
  };

  const handleBack = () => {
    setSelectedPersona(null);
  };

  if (selectedPersona) {
    return <ExperienceFlow persona={selectedPersona} onBack={handleBack} />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {personas.map((persona) => (
        <div
          key={persona.id}
          className="glass group relative flex flex-col items-center rounded-lg border border-accent/20 p-6 transition-all duration-300 hover:border-accent/60 focus-within:border-accent/60"
        >
          <div className="mb-4 text-accent">{persona.icon}</div>
          <h2 className="mb-2 text-center text-xl font-bold text-foreground">
            {persona.title}
          </h2>
          <p className="mb-6 text-center text-sm text-foreground/70">
            {persona.description}
          </p>
          <Button
            onClick={() => handlePersonaSelect(persona.id)}
            variant="primary"
            aria-label={`Explore ${persona.title} perspective`}
            className="mt-auto w-full"
          >
            Explore
          </Button>
        </div>
      ))}
    </div>
  );
}

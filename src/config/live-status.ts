export interface ProjectStatus {
  status: 'Concept' | 'In Development' | 'Beta' | 'Live';
  progress: number; // 0-100
}

export const liveStatus = {
  currentlyExploring: 'Agent-based AI architectures',
  projects: {
    OptiMeasure: { status: 'Beta' as const, progress: 75 },
    CacheBash: { status: 'In Development' as const, progress: 40 },
    'AI-Augmentation Portal': { status: 'Concept' as const, progress: 15 },
  },
};

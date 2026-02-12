export interface ProjectStatus {
  status: 'Concept' | 'In Development' | 'Beta' | 'Live';
  progress: number; // 0-100
}

export const liveStatus = {
  currentlyExploring: 'Agent-based AI architectures',
  projects: {
    OptiMeasure: { status: 'Live' as const, progress: 100 },
    CacheBash: { status: 'Beta' as const, progress: 65 },
    'AI-Augmentation Portal': { status: 'In Development' as const, progress: 35 },
  },
};

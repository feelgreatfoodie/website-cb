'use client';

import { liveStatus, type ProjectStatus } from '@/config/live-status';

export function useLiveStatus() {
  // For now, returns static config data
  // Future: fetch from API endpoint for real-time updates
  return {
    currentlyExploring: liveStatus.currentlyExploring,
    getProjectStatus: (name: string): ProjectStatus | null => {
      return liveStatus.projects[name as keyof typeof liveStatus.projects] ?? null;
    },
  };
}

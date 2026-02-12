'use client';

import { useLiveStatus } from '@/lib/hooks/useLiveStatus';
import { cn } from '@/lib/utils/cn';

interface LiveStatusBadgeProps {
  projectName: string;
}

export function LiveStatusBadge({ projectName }: LiveStatusBadgeProps) {
  const { getProjectStatus } = useLiveStatus();
  const projectStatus = getProjectStatus(projectName);

  if (!projectStatus) {
    return null;
  }

  const { status, progress } = projectStatus;

  // Color mapping based on status
  const colors = {
    'Concept': 'text-foreground/50',
    'In Development': 'text-amber-400',
    'Beta': 'text-blue-400',
    'Live': 'text-emerald-400',
  };

  const dotColors = {
    'Concept': 'bg-foreground/50',
    'In Development': 'bg-amber-400',
    'Beta': 'bg-blue-400',
    'Live': 'bg-emerald-400',
  };

  const progressColors = {
    'Concept': 'bg-foreground/50',
    'In Development': 'bg-amber-400',
    'Beta': 'bg-blue-400',
    'Live': 'bg-emerald-400',
  };

  return (
    <div className="inline-flex flex-col gap-1">
      <div className="inline-flex items-center gap-1.5">
        <span
          className={cn(
            'size-1.5 rounded-full',
            dotColors[status]
          )}
          aria-hidden="true"
        />
        <span
          className={cn(
            'text-[11px] font-mono uppercase tracking-wider',
            colors[status]
          )}
        >
          {status}
        </span>
      </div>
      <div className="h-0.5 w-full overflow-hidden rounded-full bg-foreground/10">
        <div
          className={cn(
            'h-full transition-all duration-300',
            progressColors[status]
          )}
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${projectName} progress: ${progress}%`}
        />
      </div>
    </div>
  );
}

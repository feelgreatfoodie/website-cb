'use client';

import { m } from 'framer-motion';
import { bossfight } from '@/config/content';
import { usePalette } from '@/lib/palette-context';

interface ArchitectureMapProps {
  isVisible: boolean;
}

export function ArchitectureMap({ isVisible }: ArchitectureMapProps) {
  const steps = bossfight.approach.steps;
  const nodeWidth = 120;
  const gap = 60;
  const totalWidth = steps.length * nodeWidth + (steps.length - 1) * gap;
  const svgWidth = Math.max(totalWidth + 40, 400);
  const svgHeight = 100;
  const { colors } = usePalette();

  return (
    <div className="mx-auto w-full max-w-2xl overflow-x-auto">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="mx-auto w-full"
        aria-label="Architecture flow: Diagnose, POC, Iterate, Deploy"
      >
        {steps.map((step, i) => {
          const x = 20 + i * (nodeWidth + gap);
          const centerY = svgHeight / 2;

          return (
            <g key={step}>
              {/* Connection line */}
              {i > 0 && (
                <m.line
                  x1={x - gap + 2}
                  y1={centerY}
                  x2={x - 2}
                  y2={centerY}
                  stroke={colors.accent}
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    isVisible
                      ? { pathLength: 1, opacity: 0.6 }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{ delay: i * 0.3 + 0.2, duration: 0.4 }}
                />
              )}

              {/* Arrow head */}
              {i > 0 && (
                <m.polygon
                  points={`${x - 8},${centerY - 4} ${x - 2},${centerY} ${x - 8},${centerY + 4}`}
                  fill={colors.accent}
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 0.6 } : { opacity: 0 }}
                  transition={{ delay: i * 0.3 + 0.5, duration: 0.2 }}
                />
              )}

              {/* Node box */}
              <m.rect
                x={x}
                y={centerY - 20}
                width={nodeWidth}
                height={40}
                rx={8}
                fill={`${colors.backgroundLight}66`}
                stroke={colors.accent}
                strokeWidth="1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isVisible
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{
                  delay: i * 0.3,
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />

              {/* Node text */}
              <m.text
                x={x + nodeWidth / 2}
                y={centerY + 5}
                textAnchor="middle"
                fill={colors.foreground}
                fontSize="13"
                fontFamily="monospace"
                letterSpacing="0.05em"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: i * 0.3 + 0.1, duration: 0.3 }}
              >
                {step}
              </m.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

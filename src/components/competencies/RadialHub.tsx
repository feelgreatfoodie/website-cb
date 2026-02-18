'use client';

import { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { usePalette } from '@/lib/palette-context';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface Competency {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
}

const iconPaths: Record<string, string> = {
  database:
    'M12 2C6.48 2 2 4.02 2 6.5V17.5C2 19.98 6.48 22 12 22C17.52 22 22 19.98 22 17.5V6.5C22 4.02 17.52 2 12 2ZM12 4C16.42 4 20 5.57 20 6.5C20 7.43 16.42 9 12 9C7.58 9 4 7.43 4 6.5C4 5.57 7.58 4 12 4Z',
  brain:
    'M12 2C9.24 2 7 4.24 7 7V8.76C5.18 9.55 4 11.13 4 13C4 14.87 5.18 16.45 7 17.24V19C7 20.66 8.34 22 10 22H14C15.66 22 17 20.66 17 19V17.24C18.82 16.45 20 14.87 20 13C20 11.13 18.82 9.55 17 8.76V7C17 4.24 14.76 2 12 2Z',
  handshake:
    'M2 9L5 7L9 10L12 7L15 10L19 7L22 9L19 17H15L12 14L9 17H5L2 9Z',
  rocket:
    'M12 2C12 2 7 8 7 14C7 17 9.24 19 12 19C14.76 19 17 17 17 14C17 8 12 2 12 2ZM12 17C10.34 17 9 15.66 9 14C9 10.13 12 5.5 12 5.5C12 5.5 15 10.13 15 14C15 15.66 13.66 17 12 17ZM10 20V21C10 21.55 10.45 22 11 22H13C13.55 22 14 21.55 14 21V20H10Z',
  users:
    'M16 11C17.66 11 19 9.66 19 8C19 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 11 9.66 11 8C11 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z',
  chart:
    'M3 3V21H21V19H5V3H3ZM20 8H14V10H20V8ZM18 12H14V14H18V12ZM16 16H14V18H16V16ZM11 6H7V10H11V6Z',
};

const satelliteColors = [
  'var(--accent)',
  'var(--stream1)',
  'var(--stream2)',
  'var(--stream3)',
  'var(--cta)',
  'var(--accent)',
];

export function RadialHub({ items }: { items: readonly Competency[] }) {
  const { colors } = usePalette();
  const prefersReduced = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { once: true });

  const cx = 200;
  const cy = 200;
  const radius = 140;
  const satRadius = 42;
  const centerRadius = 50;

  const positions = items.map((_, i) => {
    const angle = (Math.PI * 2 * i) / items.length - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });

  if (prefersReduced) {
    return (
      <svg
        viewBox="0 0 400 400"
        className="mx-auto w-full max-w-3xl"
        role="img"
        aria-label="Core competencies radial diagram"
      >
        {positions.map((pos, i) => (
          <line
            key={`line-${items[i].id}`}
            x1={cx}
            y1={cy}
            x2={pos.x}
            y2={pos.y}
            stroke={colors.accent}
            strokeOpacity={0.3}
            strokeWidth={1.5}
          />
        ))}
        <circle cx={cx} cy={cy} r={centerRadius} fill={colors.backgroundLight} stroke={colors.accent} strokeWidth={2} />
        <text x={cx} y={cy - 6} textAnchor="middle" fill={colors.foreground} fontSize={9} fontFamily="var(--font-jetbrains-mono)">CHRISTIAN</text>
        <text x={cx} y={cy + 8} textAnchor="middle" fill={colors.foreground} fontSize={9} fontFamily="var(--font-jetbrains-mono)">BOURLIER</text>
        {positions.map((pos, i) => (
          <g key={items[i].id}>
            <circle cx={pos.x} cy={pos.y} r={satRadius} fill={colors.backgroundLight} stroke={satelliteColors[i]} strokeWidth={2} />
            <text x={pos.x} y={pos.y + 4} textAnchor="middle" fill={colors.foreground} fontSize={7.5} fontFamily="var(--font-jetbrains-mono)">
              {items[i].label.split(' ').map((word, wi) => (
                <tspan key={wi} x={pos.x} dy={wi === 0 ? -4 : 12}>{word}</tspan>
              ))}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  return (
    <div ref={wrapperRef}>
      <svg
        viewBox="0 0 400 400"
        className="mx-auto w-full max-w-3xl"
        role="img"
        aria-label="Core competencies radial diagram"
      >
        {/* Connecting lines */}
        {positions.map((pos, i) => (
          <m.line
            key={`line-${items[i].id}`}
            x1={cx}
            y1={cy}
            x2={pos.x}
            y2={pos.y}
            stroke={colors.accent}
            strokeOpacity={0.3}
            strokeWidth={1.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
          />
        ))}

        {/* Center circle */}
        <m.circle
          cx={cx}
          cy={cy}
          r={centerRadius}
          fill={colors.backgroundLight}
          stroke={colors.accent}
          strokeWidth={2}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        <m.text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fill={colors.foreground}
          fontSize={9}
          fontFamily="var(--font-jetbrains-mono)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}
        >
          CHRISTIAN
        </m.text>
        <m.text
          x={cx}
          y={cy + 8}
          textAnchor="middle"
          fill={colors.foreground}
          fontSize={9}
          fontFamily="var(--font-jetbrains-mono)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.35 }}
        >
          BOURLIER
        </m.text>

        {/* Satellites */}
        {positions.map((pos, i) => {
          const item = items[i];
          return (
            <m.g
              key={item.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.4, ease: 'backOut' }}
              style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
              whileHover={{ scale: 1.12 }}
              className="cursor-default"
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={satRadius}
                fill={colors.backgroundLight}
                stroke={satelliteColors[i]}
                strokeWidth={2}
              />
              {iconPaths[item.icon] && (
                <path
                  d={iconPaths[item.icon]}
                  fill={satelliteColors[i]}
                  opacity={0.5}
                  transform={`translate(${pos.x - 12}, ${pos.y - 26}) scale(1)`}
                />
              )}
              <text
                x={pos.x}
                y={pos.y + 10}
                textAnchor="middle"
                fill={colors.foreground}
                fontSize={7.5}
                fontFamily="var(--font-jetbrains-mono)"
              >
                {item.label.split(' ').map((word, wi) => (
                  <tspan key={wi} x={pos.x} dy={wi === 0 ? 0 : 12}>
                    {word}
                  </tspan>
                ))}
              </text>
            </m.g>
          );
        })}
      </svg>
    </div>
  );
}

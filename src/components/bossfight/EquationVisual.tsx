'use client';

import { m, AnimatePresence } from 'framer-motion';
import { GlowText } from '@/components/ui/GlowText';
import { bossfight } from '@/config/content';
import { usePalette } from '@/lib/palette-context';

interface EquationVisualProps {
  isRevealed: boolean;
}

export function EquationVisual({ isRevealed }: EquationVisualProps) {
  const elements = bossfight.equation;
  const { colors } = usePalette();

  const equationColors = [colors.stream1, colors.stream2, colors.stream3, colors.accent];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      <AnimatePresence>
        {isRevealed &&
          elements.map((el, i) => {
            const isResult = i === elements.length - 1;
            const isOperator = !isResult && i > 0;

            return (
              <m.div
                key={el}
                className="flex items-center gap-3 sm:gap-4"
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: i * 0.4,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {isOperator && !isResult && (
                  <span className="font-mono text-xl text-foreground/40">+</span>
                )}
                {isResult && (
                  <span className="font-mono text-xl text-cta">=</span>
                )}
                <GlowText
                  color={isResult ? colors.cta : equationColors[i % equationColors.length]}
                  intensity={isResult ? 'high' : 'medium'}
                  className={`font-mono text-sm tracking-wide sm:text-base ${
                    isResult ? 'text-lg font-bold sm:text-xl' : ''
                  }`}
                >
                  {el}
                </GlowText>
              </m.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
}

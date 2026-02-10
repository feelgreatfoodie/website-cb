'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { GlowText } from '@/components/ui/GlowText';
import { bossfight } from '@/config/content';

interface EquationVisualProps {
  isRevealed: boolean;
}

const colors = ['#00FFFF', '#FF00FF', '#FFD700', '#1E90FF'];

export function EquationVisual({ isRevealed }: EquationVisualProps) {
  const elements = bossfight.equation;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      <AnimatePresence>
        {isRevealed &&
          elements.map((el, i) => {
            const isResult = i === elements.length - 1;
            const isOperator = !isResult && i > 0;

            return (
              <motion.div
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
                  <span className="font-mono text-xl text-[#F8F9FA]/40">+</span>
                )}
                {isResult && (
                  <span className="font-mono text-xl text-[#E2725B]">=</span>
                )}
                <GlowText
                  color={isResult ? '#E2725B' : colors[i % colors.length]}
                  intensity={isResult ? 'high' : 'medium'}
                  className={`font-mono text-sm tracking-wide sm:text-base ${
                    isResult ? 'text-lg font-bold sm:text-xl' : ''
                  }`}
                >
                  {el}
                </GlowText>
              </motion.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
}

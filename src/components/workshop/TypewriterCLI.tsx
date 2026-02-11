'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePalette } from '@/lib/palette-context';

interface TypewriterCLIProps {
  commands: readonly string[];
  typingSpeed?: number;
  pauseBetween?: number;
}

export function TypewriterCLI({
  commands,
  typingSpeed = 50,
  pauseBetween = 1200,
}: TypewriterCLIProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { colors } = usePalette();

  useEffect(() => {
    let cancelled = false;

    const typeCommands = async () => {
      for (let cmdIdx = 0; cmdIdx < commands.length; cmdIdx++) {
        if (cancelled) return;
        const cmd = commands[cmdIdx];

        // Type each character
        for (let charIdx = 0; charIdx <= cmd.length; charIdx++) {
          if (cancelled) return;
          setCurrentLine(cmd.slice(0, charIdx));
          await new Promise((r) => setTimeout(r, typingSpeed));
        }

        // Pause, then move to completed lines
        await new Promise((r) => setTimeout(r, pauseBetween));
        if (cancelled) return;

        setLines((prev) => [...prev, `$ ${cmd}`]);
        setCurrentLine('');
      }

      // Loop
      if (!cancelled) {
        await new Promise((r) => setTimeout(r, 2000));
        if (!cancelled) {
          setLines([]);
          typeCommands();
        }
      }
    };

    typeCommands();

    return () => {
      cancelled = true;
    };
  }, [commands, typingSpeed, pauseBetween]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll
  useEffect(() => {
    terminalRef.current?.scrollTo({
      top: terminalRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [lines, currentLine]);

  return (
    <motion.div
      className="glass overflow-hidden rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-accent/10 px-4 py-2.5">
        <div className="h-2.5 w-2.5 rounded-full" style={{ background: colors.cta }} />
        <div className="h-2.5 w-2.5 rounded-full" style={{ background: colors.stream3 }} />
        <div className="h-2.5 w-2.5 rounded-full" style={{ background: colors.stream1 }} />
        <span className="ml-2 font-mono text-[10px] tracking-wider text-foreground/30">
          cachebash
        </span>
      </div>

      {/* Terminal body */}
      <div
        ref={terminalRef}
        className="h-40 overflow-y-auto p-4 font-mono text-sm leading-relaxed"
      >
        {lines.map((line, i) => (
          <div key={i} className="text-stream1/70">
            {line}
          </div>
        ))}
        <div className="text-stream1">
          <span className="text-cta">$ </span>
          {currentLine}
          <span
            className={`inline-block w-2 ${
              cursorVisible ? 'bg-stream1' : 'bg-transparent'
            }`}
          >
            &nbsp;
          </span>
        </div>
      </div>
    </motion.div>
  );
}

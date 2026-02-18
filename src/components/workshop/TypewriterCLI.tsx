'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { m } from 'framer-motion';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);
  const { colors } = usePalette();

  // Track visibility for pausing when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Wait helper that pauses when off-screen
  const waitUntilVisible = useCallback((ms: number) => {
    return new Promise<void>((resolve) => {
      let elapsed = 0;
      const tick = () => {
        if (!isVisibleRef.current) {
          setTimeout(tick, 200);
          return;
        }
        elapsed += 16;
        if (elapsed >= ms) resolve();
        else setTimeout(tick, Math.min(ms - elapsed, 16));
      };
      tick();
    });
  }, []);

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
          await waitUntilVisible(typingSpeed);
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
  }, [commands, typingSpeed, pauseBetween, waitUntilVisible]);

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
    <m.div
      ref={containerRef}
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
        <span className="ml-2 font-mono text-[11px] tracking-wider text-foreground/60">
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
    </m.div>
  );
}

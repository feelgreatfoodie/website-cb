'use client';

import { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';
import { Button } from '@/components/ui/Button';

interface ProductSandboxProps {
  projectName: string;
  url?: string;
  cliCommands?: readonly string[];
}

interface CommandOutput {
  command: string;
  output: string;
}

// Mock outputs for CLI simulator
const getMockOutput = (command: string): string => {
  if (command.includes('basher')) {
    return '✓ Cache initialized\n✓ Connected to Redis cluster\n✓ Ready to optimize';
  }
  if (command.includes('optimeasure')) {
    return '✓ Metrics aggregated\n✓ Analysis complete\n✓ Dashboard updated';
  }
  if (command.includes('--help')) {
    return 'Available commands:\n  start     Start the service\n  status    Check status\n  analyze   Run analysis';
  }
  if (command.includes('status')) {
    return '✓ Service running\n✓ Health: OK\n✓ Uptime: 42m 13s';
  }
  return '✓ Command executed successfully';
};

function CLISimulator({
  commands,
  projectName,
}: {
  commands: readonly string[];
  projectName: string;
}) {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedCommand, setDisplayedCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandOutput[]>([]);
  const [autoPlay, setAutoPlay] = useState(false);

  // Type out current command
  useEffect(() => {
    if (currentCommandIndex >= commands.length || !isTyping) {
      return;
    }

    const command = commands[currentCommandIndex];
    let charIndex = 0;

    const interval = setInterval(() => {
      if (charIndex <= command.length) {
        setDisplayedCommand(command.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(interval);
        // Show output after typing complete
        setTimeout(() => {
          const output = getMockOutput(command);
          setCommandHistory((prev) => [...prev, { command, output }]);
          setDisplayedCommand('');
          setIsTyping(false);

          // Auto-advance if autoPlay is on
          if (autoPlay && currentCommandIndex < commands.length - 1) {
            setTimeout(() => {
              setCurrentCommandIndex((prev) => prev + 1);
              setIsTyping(true);
            }, 800);
          }
        }, 300);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentCommandIndex, isTyping, commands, autoPlay]);

  const handleRunNext = () => {
    if (currentCommandIndex < commands.length && !isTyping) {
      setIsTyping(true);
      trackEvent('sandbox_interact', { project: projectName, action: 'run_command' });
    }
  };

  const handleAutoPlay = () => {
    setAutoPlay(true);
    if (!isTyping && currentCommandIndex < commands.length) {
      setIsTyping(true);
    }
    trackEvent('sandbox_interact', { project: projectName, action: 'autoplay' });
  };

  const handleReset = () => {
    setCurrentCommandIndex(0);
    setCommandHistory([]);
    setDisplayedCommand('');
    setIsTyping(false);
    setAutoPlay(false);
    trackEvent('sandbox_interact', { project: projectName, action: 'reset' });
  };

  return (
    <div className="glass rounded-lg p-6 border border-accent/20">
      {/* Terminal */}
      <div className="bg-black rounded-lg p-4 min-h-[300px] max-h-[500px] overflow-y-auto font-mono text-sm">
        {/* Command history */}
        {commandHistory.map((item, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex items-start gap-2">
              <span className="text-green-400">$</span>
              <span className="text-white">{item.command}</span>
            </div>
            <pre className="mt-2 text-gray-400 text-xs whitespace-pre-wrap">{item.output}</pre>
          </div>
        ))}

        {/* Current typing command */}
        {isTyping && (
          <div className="flex items-start gap-2">
            <span className="text-green-400">$</span>
            <span className="text-white">
              {displayedCommand}
              <m.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-green-400 ml-1"
              />
            </span>
          </div>
        )}

        {/* Empty prompt when idle */}
        {!isTyping && currentCommandIndex < commands.length && commandHistory.length > 0 && (
          <div className="flex items-start gap-2">
            <span className="text-green-400">$</span>
            <m.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-green-400"
            />
          </div>
        )}

        {/* Completion message */}
        {currentCommandIndex >= commands.length && commandHistory.length > 0 && (
          <div className="mt-4 text-green-400 text-xs">
            ✓ Demo complete
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center gap-3 flex-wrap">
        {currentCommandIndex < commands.length && !autoPlay && (
          <Button
            onClick={handleRunNext}
            disabled={isTyping}
            className="px-3 py-1.5 text-sm"
            aria-label="Run next command"
          >
            Run Next
          </Button>
        )}

        {currentCommandIndex < commands.length && !autoPlay && (
          <Button
            onClick={handleAutoPlay}
            disabled={isTyping}
            className="px-3 py-1.5 text-sm"
            variant="secondary"
            aria-label="Auto-play all commands"
          >
            Auto-play
          </Button>
        )}

        {commandHistory.length > 0 && (
          <Button
            onClick={handleReset}
            className="px-3 py-1.5 text-sm"
            variant="secondary"
            aria-label="Reset demo"
          >
            Reset
          </Button>
        )}

        <span className="text-xs text-foreground/60 ml-auto">
          {currentCommandIndex}/{commands.length} commands
        </span>
      </div>
    </div>
  );
}

function IframeEmbed({ url, projectName }: { url: string; projectName: string }) {
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      trackEvent('sandbox_interact', { project: projectName, action: 'iframe_interact' });
    }
  };

  const handleOpenInNewTab = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
    trackEvent('sandbox_interact', { project: projectName, action: 'open_new_tab' });
  };

  return (
    <div className="glass rounded-lg p-6 border border-accent/20">
      <div
        className="relative rounded-lg overflow-hidden border border-accent/20"
        onClick={handleInteraction}
        onKeyDown={handleInteraction}
      >
        <iframe
          src={url}
          className="w-full h-[500px]"
          title={`${projectName} demo`}
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>

      <div className="mt-4 flex items-center justify-end">
        <Button
          onClick={handleOpenInNewTab}
          className="px-3 py-1.5 text-sm"
          variant="secondary"
          aria-label={`Open ${projectName} in new tab`}
        >
          Open in New Tab
        </Button>
      </div>
    </div>
  );
}

export function ProductSandbox({ projectName, url, cliCommands }: ProductSandboxProps) {
  // Render iframe for URL-based demos
  if (url) {
    return <IframeEmbed url={url} projectName={projectName} />;
  }

  // Render CLI simulator for command-based demos
  if (cliCommands && cliCommands.length > 0) {
    return <CLISimulator commands={cliCommands} projectName={projectName} />;
  }

  // Fallback for missing config
  return (
    <div className="glass rounded-lg p-6 border border-accent/20">
      <p className="text-sm text-foreground/60">
        Demo configuration not available for {projectName}.
      </p>
    </div>
  );
}

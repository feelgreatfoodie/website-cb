'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils/cn';
import { trackEvent } from '@/lib/analytics';
import { Button } from '@/components/ui/Button';

interface SolverResult {
  diagnosis: string;
  approach: string;
  timeline: string;
  experience: string;
}

export function ProblemSolver() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<SolverResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const parseResponse = useCallback((text: string): SolverResult => {
    // Extract sections from the structured response
    const diagnosisMatch = text.match(/Diagnosis[:\n]+([\s\S]*?)(?=Proposed Approach|$)/i);
    const approachMatch = text.match(/Proposed Approach[:\n]+([\s\S]*?)(?=Timeline|$)/i);
    const timelineMatch = text.match(/Timeline[:\n]+([\s\S]*?)(?=Relevant Experience|$)/i);
    const experienceMatch = text.match(/Relevant Experience[:\n]+([\s\S]*?)$/i);

    return {
      diagnosis: diagnosisMatch?.[1]?.trim() || text.trim() || 'No diagnosis available.',
      approach: approachMatch?.[1]?.trim() || 'Based on the described challenge, a phased approach with early prototyping is recommended.',
      timeline: timelineMatch?.[1]?.trim() || 'Typically 2-6 weeks for initial POC.',
      experience: experienceMatch?.[1]?.trim() || 'Relevant experience across data engineering, AI integration, and enterprise solutions.',
    };
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setResult(null);
    trackEvent('problem_solver_submit', { challenge: input.trim() });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: input.trim() }],
          context: 'solver',
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const parsed = parseResponse(data.message || '');
      setResult(parsed);
    } catch (error) {
      console.error('Problem solver error:', error);
      setResult({
        diagnosis: 'Sorry, something went wrong.',
        approach: 'Please try again later.',
        timeline: 'N/A',
        experience: 'N/A',
      });
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, parseResponse]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Input Card */}
      <div className="glass rounded-lg border border-accent/30 p-6">
        <label htmlFor="challenge-input" className="block text-[15px] font-semibold text-foreground mb-3">
          Describe your challenge — Answered NOW by AI
        </label>
        <textarea
          id="challenge-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          maxLength={500}
          rows={4}
          placeholder="Example: I need to migrate 500TB of data from on-prem to GCP with zero downtime..."
          disabled={isLoading}
          className={cn(
            'w-full px-4 py-3 rounded-lg',
            'bg-background/40 border border-accent/30',
            'text-[13px] text-foreground',
            'placeholder:text-foreground/50',
            'focus:outline-none focus:ring-2 focus:ring-accent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'resize-none'
          )}
          aria-label="Describe your challenge — Answered NOW by AI"
        />
        <div className="flex items-center justify-between mt-3">
          <span className="text-[11px] text-foreground/50">
            {input.length}/500 characters • Ctrl+Enter to submit
          </span>
          <Button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            variant="primary"
            className="px-6 py-2"
            aria-label="Analyze challenge"
            type="button"
          >
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </Button>
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex items-center justify-center space-x-2 py-8">
          <div
            className="w-3 h-3 bg-accent/60 rounded-full animate-bounce"
            style={{ animationDelay: '0ms' }}
          />
          <div
            className="w-3 h-3 bg-accent/60 rounded-full animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <div
            className="w-3 h-3 bg-accent/60 rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      )}

      {/* Results Cards */}
      {result && !isLoading && (
        <div className="space-y-4">
          {/* Diagnosis */}
          <div className="glass rounded-lg border border-accent/30 p-5">
            <h3 className="text-[15px] font-semibold text-accent mb-3">
              Diagnosis
            </h3>
            <p className="text-[13px] text-foreground/90 leading-relaxed">
              {result.diagnosis}
            </p>
          </div>

          {/* Proposed Approach */}
          <div className="glass rounded-lg border border-accent/30 p-5">
            <h3 className="text-[15px] font-semibold text-accent mb-3">
              Proposed Approach
            </h3>
            <p className="text-[13px] text-foreground/90 leading-relaxed whitespace-pre-line">
              {result.approach}
            </p>
          </div>

          {/* Timeline */}
          <div className="glass rounded-lg border border-accent/30 p-5">
            <h3 className="text-[15px] font-semibold text-accent mb-3">
              Timeline
            </h3>
            <p className="text-[13px] text-foreground/90 leading-relaxed">
              {result.timeline}
            </p>
          </div>

          {/* Relevant Experience */}
          <div className="glass rounded-lg border border-accent/30 p-5">
            <h3 className="text-[15px] font-semibold text-accent mb-3">
              Relevant Experience
            </h3>
            <p className="text-[13px] text-foreground/90 leading-relaxed whitespace-pre-line">
              {result.experience}
            </p>
          </div>

          {/* Disclaimer */}
          <div className="text-center">
            <p className="text-[11px] text-foreground/50">
              AI-generated analysis — not from Christian directly
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

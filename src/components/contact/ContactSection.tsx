'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contact } from '@/config/content';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';
import { trackEvent } from '@/lib/analytics';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface SolverResult {
  diagnosis: string;
  approach: string;
  timeline: string;
  experience: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  'w-full rounded-lg border border-accent/20 bg-white/5 px-4 py-3 font-mono text-sm text-foreground placeholder:text-foreground/30 transition-colors focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/30';

function parseResponse(text: string): SolverResult {
  const diagnosisMatch = text.match(/Diagnosis[:\n]+([\s\S]*?)(?=Proposed Approach|$)/i);
  const approachMatch = text.match(/Proposed Approach[:\n]+([\s\S]*?)(?=Timeline|$)/i);
  const timelineMatch = text.match(/Timeline[:\n]+([\s\S]*?)(?=Relevant Experience|$)/i);
  const experienceMatch = text.match(/Relevant Experience[:\n]+([\s\S]*?)$/i);

  return {
    diagnosis: diagnosisMatch?.[1]?.trim() || text.trim() || 'No diagnosis available.',
    approach: approachMatch?.[1]?.trim() || 'A phased approach with early prototyping is recommended.',
    timeline: timelineMatch?.[1]?.trim() || 'Typically 2-6 weeks for initial POC.',
    experience: experienceMatch?.[1]?.trim() || 'Relevant experience across data engineering, AI integration, and enterprise solutions.',
  };
}

export function ContactSection() {
  // Challenge / Problem Solver state
  const [challenge, setChallenge] = useState('');
  const [solverResult, setSolverResult] = useState<SolverResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const hasContactInfo = name.trim().length > 0 && emailRegex.test(email);
  const canAnalyze = challenge.trim().length > 0 && !analyzing;
  const canSubmitContact = formState !== 'submitting' && hasContactInfo;

  const handleAnalyze = useCallback(async () => {
    if (!canAnalyze) return;

    setAnalyzing(true);
    setSolverResult(null);
    trackEvent('problem_solver_submit', { challenge: challenge.trim() });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: challenge.trim() }],
          context: 'solver',
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setSolverResult(parseResponse(data.message || ''));
    } catch (error) {
      console.error('Problem solver error:', error);
      setSolverResult({
        diagnosis: 'Sorry, something went wrong.',
        approach: 'Please try again later.',
        timeline: 'N/A',
        experience: 'N/A',
      });
    } finally {
      setAnalyzing(false);
    }
  }, [canAnalyze, challenge]);

  async function handleSubmitContact(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmitContact) return;

    trackEvent('contact_form_submit');
    setFormState('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          linkedin: linkedin.trim() || undefined,
          company: company.trim() || undefined,
          message: (challenge.trim() + (message.trim() ? `\n\n${message.trim()}` : '')).trim() || undefined,
          website: website || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormState('error');
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      setFormState('success');
      trackEvent('contact_form_success');
      setName('');
      setEmail('');
      setPhone('');
      setLinkedin('');
      setCompany('');
      setMessage('');

      setTimeout(() => setFormState('idle'), 5000);
    } catch {
      setFormState('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  return (
    <section id="contact" className="relative bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <motion.div
          className="text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.p
            variants={fadeInUp}
            className="mb-2 font-mono text-sm tracking-[0.3em] text-accent"
          >
            {contact.subtitle}
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="mb-12 font-mono text-3xl font-bold tracking-[0.15em] text-foreground sm:text-4xl md:text-5xl"
          >
            {contact.title}
          </motion.h2>
        </motion.div>

        <motion.div
          className="glass rounded-2xl p-6 sm:p-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <form onSubmit={handleSubmitContact}>
            {/* Honeypot */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            {/* Step 1: Challenge */}
            <div>
              <label htmlFor="challenge-input" className="mb-1.5 block font-mono text-xs tracking-wider text-foreground/60">
                Describe your challenge — Answered NOW by AI
              </label>
              <textarea
                id="challenge-input"
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) {
                    e.preventDefault();
                    handleAnalyze();
                  }
                }}
                maxLength={500}
                rows={3}
                placeholder="Example: I need to migrate 500TB of data from on-prem to GCP with zero downtime..."
                disabled={analyzing}
                className={`${inputClass} resize-none`}
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="font-mono text-[11px] text-foreground/30">
                  {challenge.length}/500 · Ctrl+Enter to analyze
                </span>
                <Button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={!canAnalyze}
                  variant="primary"
                  className={cn('px-5 py-1.5 text-xs', !canAnalyze && 'opacity-40 cursor-not-allowed')}
                  aria-label="Analyze challenge"
                >
                  {analyzing ? 'Analyzing...' : 'Analyze'}
                </Button>
              </div>
            </div>

            {/* Loading */}
            {analyzing && (
              <div className="flex items-center justify-center gap-2 py-6">
                <div className="h-2 w-2 animate-bounce rounded-full bg-accent/60" style={{ animationDelay: '0ms' }} />
                <div className="h-2 w-2 animate-bounce rounded-full bg-accent/60" style={{ animationDelay: '150ms' }} />
                <div className="h-2 w-2 animate-bounce rounded-full bg-accent/60" style={{ animationDelay: '300ms' }} />
              </div>
            )}

            {/* Results */}
            <AnimatePresence>
              {solverResult && !analyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 space-y-3"
                >
                  {([
                    ['Diagnosis', solverResult.diagnosis],
                    ['Proposed Approach', solverResult.approach],
                    ['Timeline', solverResult.timeline],
                    ['Relevant Experience', solverResult.experience],
                  ] as const).map(([label, content]) => (
                    <div key={label} className="rounded-lg border border-accent/15 bg-accent/5 p-4">
                      <h3 className="mb-1.5 font-mono text-xs font-semibold tracking-wider text-accent">
                        {label}
                      </h3>
                      <p className="text-xs leading-relaxed text-foreground/80 whitespace-pre-line">
                        {content}
                      </p>
                    </div>
                  ))}
                  <p className="text-center font-mono text-[11px] text-foreground/30">
                    AI-generated analysis — not from Christian directly
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Soft transition to contact fields */}
            <AnimatePresence>
              {solverResult && !analyzing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 flex items-center gap-4"
                >
                  <div className="h-px flex-1 bg-accent/15" />
                  <span className="font-mono text-[11px] tracking-wider text-accent/60">
                    Want to take this further?
                  </span>
                  <div className="h-px flex-1 bg-accent/15" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Contact fields — always visible, optional */}
            <div className={cn('mt-6 space-y-4 sm:space-y-6', !solverResult && 'mt-8')}>
              {/* Divider when no solver result */}
              {!solverResult && !analyzing && (
                <div className="flex items-center gap-4 pb-2">
                  <div className="h-px flex-1 bg-foreground/10" />
                  <span className="font-mono text-[11px] tracking-wider text-foreground/30">
                    OR JUST SAY HELLO
                  </span>
                  <div className="h-px flex-1 bg-foreground/10" />
                </div>
              )}

              {/* Name + Email */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <label className="block">
                  <span className="mb-1.5 block font-mono text-xs tracking-wider text-foreground/60">
                    Name <span className="text-accent">*</span>
                  </span>
                  <input
                    type="text"
                    maxLength={200}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-mono text-xs tracking-wider text-foreground/60">
                    Email <span className="text-accent">*</span>
                  </span>
                  <input
                    type="email"
                    maxLength={254}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className={inputClass}
                  />
                </label>
              </div>

              {/* Phone + LinkedIn */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <label className="block">
                  <span className="mb-1.5 block font-mono text-xs tracking-wider text-foreground/60">
                    Phone
                  </span>
                  <input
                    type="tel"
                    maxLength={30}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    className={inputClass}
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-mono text-xs tracking-wider text-foreground/60">
                    LinkedIn URL
                  </span>
                  <input
                    type="url"
                    maxLength={300}
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/you"
                    className={inputClass}
                  />
                </label>
              </div>

              {/* Company */}
              <label className="block">
                <span className="mb-1.5 block font-mono text-xs tracking-wider text-foreground/60">
                  Company
                </span>
                <input
                  type="text"
                  maxLength={200}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Corp"
                  className={inputClass}
                />
              </label>

              {/* Additional message */}
              <label className="block">
                <span className="mb-1.5 block font-mono text-xs tracking-wider text-foreground/60">
                  {solverResult ? 'Anything to add?' : 'Message'}
                </span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={solverResult ? 'Additional context, timeline, budget...' : "What's on your mind?"}
                  rows={3}
                  maxLength={5000}
                  className={`${inputClass} resize-none`}
                />
              </label>
            </div>

            {/* Submit */}
            <div className="mt-6 text-center sm:mt-8" aria-live="polite" role="status">
              {formState === 'success' ? (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-mono text-sm text-accent"
                >
                  {contact.successMessage}
                </motion.p>
              ) : (
                <>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!canSubmitContact}
                    className={cn(
                      'px-10 py-4 text-base font-semibold sm:text-lg',
                      !canSubmitContact
                        ? 'opacity-40 cursor-not-allowed'
                        : 'shadow-[0_0_20px_color-mix(in_srgb,var(--cta)_30%,transparent)] animate-[ctaPulse_3s_ease-in-out_infinite]'
                    )}
                  >
                    {formState === 'submitting' ? 'Sending...' : solverResult ? 'Send to Christian' : contact.ctaLabel}
                  </Button>
                  {!hasContactInfo && solverResult && (
                    <p className="mt-2 font-mono text-[11px] text-foreground/30">
                      Add your name and email above to send
                    </p>
                  )}
                  {formState === 'error' && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3 font-mono text-xs text-red-400"
                      role="alert"
                    >
                      {errorMsg}
                    </motion.p>
                  )}
                </>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

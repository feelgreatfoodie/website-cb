'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { contact } from '@/config/content';
import { Button } from '@/components/ui/Button';
import { fadeInUp, staggerContainer } from '@/lib/animations/scroll-variants';
import { trackEvent } from '@/lib/analytics';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  'w-full rounded-lg border border-accent/20 bg-white/5 px-4 py-3 font-mono text-sm text-foreground placeholder:text-foreground/30 transition-colors focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/30';

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const canSubmit =
    formState !== 'submitting' &&
    name.trim().length > 0 &&
    emailRegex.test(email);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

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
          message: message.trim() || undefined,
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
          <motion.h2
            variants={fadeInUp}
            className="mb-4 font-mono text-2xl font-bold tracking-[0.15em] text-foreground sm:text-3xl md:text-4xl"
          >
            {contact.title}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mb-12 font-mono text-sm text-foreground/50"
          >
            {contact.subtitle}
          </motion.p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-6 sm:p-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Row 1: Name + Email */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <label className="block">
              <span className="mb-1.5 block font-mono text-xs tracking-wider text-foreground/50">
                Name <span className="text-accent">*</span>
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-mono text-xs tracking-wider text-foreground/50">
                Email <span className="text-accent">*</span>
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className={inputClass}
              />
            </label>
          </div>

          {/* Row 2: Phone + LinkedIn */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-6">
            <label className="block">
              <span className="mb-1.5 block font-mono text-xs tracking-wider text-foreground/50">
                Phone
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 123-4567"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-mono text-xs tracking-wider text-foreground/50">
                LinkedIn URL
              </span>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/you"
                className={inputClass}
              />
            </label>
          </div>

          {/* Row 3: Company (full width) */}
          <div className="mt-4 sm:mt-6">
            <label className="block">
              <span className="mb-1.5 block font-mono text-xs tracking-wider text-foreground/50">
                Company
              </span>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Corp"
                className={inputClass}
              />
            </label>
          </div>

          {/* Row 4: Message (full width, textarea) */}
          <div className="mt-4 sm:mt-6">
            <label className="block">
              <span className="mb-1.5 block font-mono text-xs tracking-wider text-foreground/50">
                Message
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What's on your mind?"
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </label>
          </div>

          {/* Submit button + state feedback */}
          <div className="mt-6 text-center sm:mt-8">
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
                  disabled={!canSubmit}
                  className={!canSubmit ? 'opacity-40 cursor-not-allowed' : ''}
                >
                  {formState === 'submitting' ? 'Sending...' : contact.ctaLabel}
                </Button>

                {formState === 'error' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 font-mono text-xs text-red-400"
                  >
                    {errorMsg}
                  </motion.p>
                )}
              </>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}

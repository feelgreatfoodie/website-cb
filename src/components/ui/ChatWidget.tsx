'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { trackEvent } from '@/lib/analytics';
import { Button } from '@/components/ui/Button';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_SHOWN_KEY = 'cb-chat-welcome-shown';

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Welcome! You probably got here from a resume link — this site is an interactive look at Christian's work, skills, and the kinds of problems he solves. Feel free to ask me anything.",
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-open on first visit
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(WELCOME_SHOWN_KEY)) {
      localStorage.setItem(WELCOME_SHOWN_KEY, '1');
      setTimeout(() => setIsOpen(true), 750);
      trackEvent('ai_chat_welcome_auto_open');
    }
  }, []);

  // Re-focus input after loading completes
  useEffect(() => {
    if (!isLoading && isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading, isOpen]);

  // Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    trackEvent('ai_chat_open');
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    trackEvent('ai_chat_message');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.filter((m) => m !== WELCOME_MESSAGE),
          context: 'chat',
        }),
      });

      const data = await response.json();

      if (response.status === 429) {
        setMessages((prev) => [...prev, {
          role: 'assistant',
          content: data.message || "You've reached the question limit for this hour. Check back soon, or message Christian directly through the contact form.",
        }]);
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message || 'Sorry, I couldn\'t generate a response.',
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, messages, isLoading]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={handleOpen}
        className={cn(
          'fixed bottom-20 right-6 z-50 print:hidden',
          'w-14 h-14 rounded-full',
          'bg-accent/20 hover:bg-accent/30',
          'border border-accent/50',
          'backdrop-blur-md',
          'transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
          'flex items-center justify-center',
          isOpen && 'opacity-0 pointer-events-none'
        )}
        aria-label="Open AI chat"
        type="button"
      >
        <svg
          className="w-6 h-6 text-accent"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'fixed bottom-32 right-6 z-[60] print:hidden',
              'w-80 h-[28rem]',
              'glass rounded-lg',
              'flex flex-col',
              'shadow-2xl'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-accent/30">
              <h3 className="text-[15px] font-semibold text-foreground">
                Chat with AI Assistant
              </h3>
              <button
                onClick={handleClose}
                className={cn(
                  'w-8 h-8 rounded-full',
                  'hover:bg-accent/20',
                  'transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                  'flex items-center justify-center'
                )}
                aria-label="Close chat"
                type="button"
              >
                <svg
                  className="w-5 h-5 text-foreground/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[80%] px-3 py-2 rounded-lg text-[13px]',
                      message.role === 'user'
                        ? 'bg-accent/20 text-foreground'
                        : 'bg-background/60 text-foreground/90'
                    )}
                  >
                    {message.content.includes('contact form') ? (
                      <span>
                        {message.content.split('contact form')[0]}
                        <button
                          type="button"
                          className="text-accent underline underline-offset-2 hover:text-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                          onClick={() => {
                            setIsOpen(false);
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          aria-label="Go to contact form"
                        >
                          contact form
                        </button>
                        {message.content.split('contact form')[1]}
                      </span>
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-background/60 px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-accent/60 rounded-full animate-bounce"
                        style={{ animationDelay: '0ms' }}
                      />
                      <div
                        className="w-2 h-2 bg-accent/60 rounded-full animate-bounce"
                        style={{ animationDelay: '150ms' }}
                      />
                      <div
                        className="w-2 h-2 bg-accent/60 rounded-full animate-bounce"
                        style={{ animationDelay: '300ms' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Disclaimer */}
            <div className="px-4 py-2 border-t border-accent/30">
              <p className="text-[11px] text-foreground/50 text-center">
                AI-generated — not from Christian directly
              </p>
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-accent/30">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className={cn(
                    'flex-1 px-3 py-2 rounded-lg',
                    'bg-background/40 border border-accent/30',
                    'text-[13px] text-foreground',
                    'placeholder:text-foreground/50',
                    'focus:outline-none focus:ring-2 focus:ring-accent',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                  aria-label="Chat message input"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  variant="primary"
                  className="px-4 py-2"
                  aria-label="Send message"
                  type="button"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Mail, X } from 'lucide-react';
import { ContactButton } from './ContactButton';
import { SERVICES } from '../data/portfolioData';

export interface ContactModalProps {
  isOpen: boolean;
  initialService?: string;
  onClose: () => void;
}

const BUDGET_RANGES = ['$2k – $5k', '$5k – $10k', '$10k – $25k', '$25k+'] as const;

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  initialService,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>(BUDGET_RANGES[1]);
  const [brief, setBrief] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      if (initialService) {
        setSelectedServices([initialService]);
      }
    }
  }, [isOpen, initialService]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((item) => item !== serviceName)
        : [...prev, serviceName]
    );
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@jack3d.studio');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[32px] border border-black/15 bg-[#F2F2F2] p-6 text-black shadow-2xl sm:rounded-[40px] sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-light uppercase tracking-widest text-black/60">
                  Start a Conversation
                </p>
                <h2
                  id="contact-modal-title"
                  className="hero-heading mt-1 text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl"
                >
                  Let&rsquo;s Work Together
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close contact dialog"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/20 text-black transition-colors duration-200 hover:bg-black/5 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center gap-5 py-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-black/30 bg-black/5 text-black">
                  <Check className="h-7 w-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold uppercase tracking-wide text-black">
                    Inquiry Sent
                  </h3>
                  <p className="max-w-md text-sm font-light leading-relaxed text-black/75 sm:text-base">
                    Thanks {name}. Your brief has been received and Jack will get
                    back to you at <span className="text-black">{email}</span>{' '}
                    within 24 hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 rounded-full border border-black/40 px-8 py-2.5 text-xs font-medium uppercase tracking-widest text-black transition-colors duration-200 hover:bg-black/5 cursor-pointer"
                >
                  Back to Portfolio
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Direct email bar */}
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm">
                  <div className="flex items-center gap-2.5 text-black/80">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="truncate font-light">
                      hello@jack3d.studio
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-black transition-opacity hover:opacity-75 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy
                      </>
                    )}
                  </button>
                </div>

                {/* Service selector */}
                <div className="space-y-2">
                  <span className="block text-xs font-medium uppercase tracking-widest text-black/70">
                    Services Needed
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((service) => {
                      const active = selectedServices.includes(service.name);
                      return (
                        <button
                          key={service.number}
                          type="button"
                          onClick={() => toggleService(service.name)}
                          className={`rounded-xl border px-3.5 py-2 text-xs font-medium uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                            active
                              ? 'border-black bg-black text-white'
                              : 'border-black/20 bg-transparent text-black/80 hover:border-black/50'
                          }`}
                        >
                          {service.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block space-y-1.5">
                    <span className="block text-xs font-medium uppercase tracking-widest text-black/70">
                      Your Name
                    </span>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Mercer"
                      className="w-full rounded-2xl border border-black/20 bg-white px-4 py-3 text-sm text-black placeholder:text-black/45 focus:border-black focus:outline-none"
                    />
                  </label>

                  <label className="block space-y-1.5">
                    <span className="block text-xs font-medium uppercase tracking-widest text-black/70">
                      Email Address
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full rounded-2xl border border-black/20 bg-white px-4 py-3 text-sm text-black placeholder:text-black/45 focus:border-black focus:outline-none"
                    />
                  </label>
                </div>

                {/* Budget Range */}
                <div className="space-y-2">
                  <span className="block text-xs font-medium uppercase tracking-widest text-black/70">
                    Estimated Budget
                  </span>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {BUDGET_RANGES.map((range) => {
                      const active = budget === range;
                      return (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setBudget(range)}
                          className={`rounded-xl border px-3 py-2 text-xs font-medium tracking-wide transition-colors duration-200 cursor-pointer tabular-nums ${
                            active
                              ? 'border-black bg-black text-white'
                              : 'border-black/20 text-black/80 hover:border-black/50'
                          }`}
                        >
                          {range}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Brief */}
                <label className="block space-y-1.5">
                  <span className="block text-xs font-medium uppercase tracking-widest text-black/70">
                    Project Details
                  </span>
                  <textarea
                    rows={3}
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="Tell Jack about your product, timeline, and visual goals..."
                    className="w-full resize-none rounded-2xl border border-black/20 bg-white px-4 py-3 text-sm text-black placeholder:text-black/45 focus:border-black focus:outline-none"
                  />
                </label>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full px-5 py-3 text-xs font-medium uppercase tracking-widest text-black/70 transition-colors hover:text-black cursor-pointer"
                  >
                    Cancel
                  </button>
                  <ContactButton type="submit" label="Send Brief" />
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;

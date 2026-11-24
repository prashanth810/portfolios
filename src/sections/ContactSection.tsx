import React from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const CONTACT_EMAIL = 'hello@jack3d.studio';
const CONTACT_PHONE = '+91 8106124493';

export interface ContactSectionProps {
  onOpenContact: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenContact }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') || '');
    const email = String(formData.get('email') || '');
    const phone = String(formData.get('phone') || 'Not provided');
    const message = String(formData.get('message') || '');
    const subject = `Portfolio inquiry from ${name}`;
    const body = `Name: ${name}\nMobile: ${phone}\nEmail: ${email}\n\n${message}`;

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="contact-section px-5 py-20 sm:px-8 sm:py-24 md:px-12 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-14 text-center sm:mb-20">
          <h2
            id="contact-title"
            className="contact-heading text-[clamp(2.75rem,8vw,5rem)] font-bold leading-none tracking-tight"
          >
            Contact <span className="contact-accent">Me</span>
          </h2>
          <p className="contact-subtitle mt-4 text-sm sm:text-base">
            Let&rsquo;s work together — drop me a message.
          </p>
        </header>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <div className="flex flex-col">
            <h3 className="contact-copy-title text-2xl font-semibold">Let&rsquo;s Work Together</h3>
            <p className="contact-copy mt-4 max-w-xl text-sm leading-7 sm:text-base">
              If you&rsquo;re interested in collaborating, send me a message using
              the form. I&rsquo;ll review your request and get back to you.
            </p>

            <address className="mt-10 flex flex-col gap-7 not-italic sm:mt-14">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="contact-link group flex items-center gap-4 rounded-lg"
              >
                <span className="contact-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors">
                  <Mail aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="contact-meta block text-xs">Email</span>
                  <span className="contact-value mt-1 block break-all text-sm sm:text-base">
                    {CONTACT_EMAIL}
                  </span>
                </span>
              </a>

              <a
                href="tel:+918106124493"
                className="contact-link group flex items-center gap-4 rounded-lg"
              >
                <span className="contact-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors">
                  <Phone aria-hidden="true" className="h-5 w-5" />
                </span>
                <span>
                  <span className="contact-meta block text-xs">Phone</span>
                  <span className="contact-value mt-1 block text-sm sm:text-base">
                    {CONTACT_PHONE}
                  </span>
                </span>
              </a>

              <div className="flex items-center gap-4">
                <span className="contact-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                  <MapPin aria-hidden="true" className="h-5 w-5" />
                </span>
                <span>
                  <span className="contact-meta block text-xs">Location</span>
                  <span className="contact-value mt-1 block text-sm sm:text-base">
                    Hyderabad, Telangana, India
                  </span>
                </span>
              </div>
            </address>
          </div>

          <form
            onSubmit={handleSubmit}
            className="contact-form rounded-3xl p-5 sm:p-8 lg:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              <label className="block">
                <span className="contact-label mb-2 block text-sm">Full Name</span>
                <input
                  autoComplete="name"
                  className="contact-field w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-colors"
                  name="name"
                  placeholder="Your name"
                  required
                />
              </label>

              <label className="block">
                <span className="contact-label mb-2 block text-sm">Mobile</span>
                <input
                  autoComplete="tel"
                  className="contact-field w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-colors"
                  name="phone"
                  placeholder="+91 00000 00000"
                  type="tel"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="contact-label mb-2 block text-sm">Email</span>
                <input
                  autoComplete="email"
                  className="contact-field w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-colors"
                  name="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="contact-label mb-2 block text-sm">Message</span>
                <textarea
                  className="contact-field min-h-32 w-full resize-y rounded-xl px-4 py-3.5 text-sm outline-none transition-colors"
                  name="message"
                  placeholder="Write your message..."
                  required
                  rows={4}
                />
              </label>
            </div>

            <button
              className="contact-submit mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors"
              type="submit"
            >
              <Send aria-hidden="true" className="h-4 w-4" />
              Send Message
            </button>
            <p className="contact-note mt-3 text-center text-xs">
              Your email app will open with your message ready to send.
            </p>
          </form>
        </div>

        <footer className="mx-auto mt-16 flex w-full flex-col items-center justify-between gap-6 border-t border-black/15 pt-8 text-sm text-black/70 sm:mt-20 sm:flex-row">
          <p className="text-center font-light uppercase tracking-wider sm:text-left">
            &copy; {new Date().getFullYear()} Prashanth &mdash; 3D Creator
          </p>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-8">
            <a
              href="#top"
              className="min-h-11 inline-flex items-center uppercase tracking-wider opacity-70 transition-opacity hover:opacity-100"
            >
              Top
            </a>
            <a
              href="#statement"
              className="min-h-11 inline-flex items-center uppercase tracking-wider opacity-70 transition-opacity hover:opacity-100"
            >
              About Me
            </a>
            <a
              href="#tech"
              className="min-h-11 inline-flex items-center uppercase tracking-wider opacity-70 transition-opacity hover:opacity-100"
            >
              Tech Stack
            </a>
            <button
              type="button"
              onClick={onOpenContact}
              className="contact-footer-cta min-h-11 inline-flex items-center uppercase tracking-wider underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Start a Project
            </button>
          </nav>
        </footer>
      </div>
    </section>
  );
};

export default ContactSection;

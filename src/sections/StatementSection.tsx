import React, { useEffect, useRef } from 'react';

const ABOUT_LINES = [
  'I am a Frontend Developer',
  'with 2 years of experience',
  'building modern React and',
  'React Native applications.',
];

const ABOUT_DESCRIPTION =
  'I build responsive web and mobile experiences with React.js, JavaScript, Tailwind CSS, Redux, and REST API integration. My work includes e-commerce solutions and scalable interfaces designed for real users.';

const ABOUT_EXTRA =
  'I also have 1 year of experience with React Native and backend technologies including Node.js, Express.js, and MongoDB, creating authentication and payment features.';

const SKILLS = [
  'React.js',
  'JavaScript',
  'React Native',
  'Tailwind CSS',
  'Redux',
  'Node.js',
  'Express.js',
  'MongoDB',
  'HTML',
  'CSS',
];

const STATEMENT_PORTRAIT =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/7dc8b8f3-4ccb-4599-8ce4-7f7c7881bad9.webp';

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export const StatementSection: React.FC = () => {
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>('.stmt-word'));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const fill = (progress: number) => {
      const total = words.length;
      const softEdge = 3;
      const head = clamp(progress, 0, 1) * (total + softEdge);
      words.forEach((w, i) => {
        const t = clamp((head - i) / softEdge, 0, 1);
        const s = t * t * (3 - 2 * t);
        w.style.color = `color-mix(in srgb, var(--statement-bright) ${Math.round(s * 100)}%, var(--statement-dim))`;
      });
    };

    if (reduced) {
      fill(1);
      return;
    }

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const startY = vh * 0.86;
      const endY = vh * 0.22;
      const span = startY - endY + rect.height * 0.45;
      fill((startY - rect.top) / span);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollDown = () =>
    document.getElementById('statement')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <div className="meta-bar" aria-label="Agency timeline and navigation">
        <div className="meta-bar-inner">
          <div className="bar-est">
            EST <span>2019</span>
          </div>
          <button type="button" className="scroll-btn" onClick={scrollDown}>
            <span>SCROLL DOWN</span>
            <span className="scroll-arrow-disc" aria-hidden="true">
              <svg viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 2.5V11.5M7 11.5L3.2 7.7M7 11.5L10.8 7.7"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          <div className="bar-details">LIVE IN DETAILS</div>
        </div>
      </div>

      <section className="statement-section" id="statement" aria-label="Manifesto">
        <div className="statement-inner statement-about-layout">
          <div className="statement-image-wrap">
            <img
              className="statement-image"
              src={STATEMENT_PORTRAIT}
              alt="Prashanth, frontend developer"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <span className="statement-image-label">ABOUT ME</span>
          </div>

          <div className="statement-copy">
            <p className="statement-kicker">
              Frontend Developer · 2 Years
              <span>Backend Development · Node.js</span>
            </p>
            <h2 className="statement-text" ref={textRef}>
              {ABOUT_LINES.map((line, li) => (
                <React.Fragment key={li}>
                  {line.split(' ').map((word, wi, arr) => (
                    <React.Fragment key={wi}>
                      <span className="stmt-word">{word}</span>
                      {wi < arr.length - 1 && ' '}
                    </React.Fragment>
                  ))}
                  {li < ABOUT_LINES.length - 1 && <br className="stmt-br" />}
                </React.Fragment>
              ))}
            </h2>

            <div className="statement-description">
              <p>{ABOUT_DESCRIPTION}</p>
              <p>{ABOUT_EXTRA}</p>
            </div>

            <div className="statement-skills" aria-label="Core skills">
              {SKILLS.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StatementSection;
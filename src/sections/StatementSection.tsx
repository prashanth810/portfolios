import React, { useEffect, useRef } from 'react';

const LINES = [
  'We believe the strongest brands are',
  'built through strategy, not just',
  'aesthetics. Every campaign is designed',
  'to capture attention, inspire action, and',
  'create lasting business growth.',
];

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
        const c = Math.round(89 * (1 - s));
        w.style.color = `rgb(${c},${c},${c})`;
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
        <div className="statement-inner">
          <p className="statement-text" ref={textRef}>
            {LINES.map((line, li) => (
              <React.Fragment key={li}>
                {line.split(' ').map((word, wi, arr) => (
                  <React.Fragment key={wi}>
                    <span className="stmt-word">{word}</span>
                    {(wi < arr.length - 1 || li < LINES.length - 1) && ' '}
                  </React.Fragment>
                ))}
                {li < LINES.length - 1 && <br className="stmt-br" />}
              </React.Fragment>
            ))}
          </p>

          <p className="statement-sub">
            Performance-driven marketing, from
            <br />
            strategy to execution. <em>Built for growing brands.</em>
          </p>
        </div>
      </section>
    </>
  );
};

export default StatementSection;
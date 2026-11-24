import React, { useEffect, useRef } from 'react';
import { Moon, Sun } from 'lucide-react';
import { PROJECTS, ProjectItem } from '../data/portfolioData';
import freshiesDashboardImage from '../asset/admindashboard.png';

export interface HeroSectionProps {
  onOpenContact: (preselectedService?: string) => void;
  onOpenProject: (project: ProjectItem, initialImageIndex?: number) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';

const scrollTo = (selector: string) => {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
  onOpenProject,
  theme,
  onToggleTheme,
}) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const today = new Date();
  const currentWeekday = today.toLocaleDateString('en-GB', { weekday: 'long' });
  const currentDate = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: Array<() => void> = [];
    let disposed = false;
    let revertPhotoMotion: (() => void) | undefined;

    /* ---- Sliding nav pill ---- */
    const nav = root.querySelector<HTMLElement>('#heroNav');
    const indicator = root.querySelector<HTMLElement>('#navIndicator');
    const links = Array.from(root.querySelectorAll<HTMLAnchorElement>('.nav-link'));
    let active = links[0];

    const moveIndicator = (target: HTMLElement | undefined, immediate: boolean) => {
      if (!nav || !indicator || !target) return;
      const navRect = nav.getBoundingClientRect();
      const linkRect = target.getBoundingClientRect();
      if (immediate) indicator.style.transition = 'none';
      indicator.style.width = `${linkRect.width}px`;
      indicator.style.transform = `translate3d(${linkRect.left - navRect.left}px, 0, 0)`;
      if (immediate) {
        indicator.getBoundingClientRect();
        indicator.style.transition = '';
      }
      links.forEach((l) => l.classList.toggle('is-covered', l === target));
    };

    links.forEach((link) => {
      const enter = () => moveIndicator(link, false);
      const click = (e: MouseEvent) => {
        e.preventDefault();
        const href = link.getAttribute('href') || '';
        active = link;
        links.forEach((l) => l.classList.toggle('is-active', l === link));
        moveIndicator(link, false);
        scrollTo(href);
      };
      link.addEventListener('mouseenter', enter);
      link.addEventListener('focus', enter);
      link.addEventListener('click', click);
      cleanups.push(() => {
        link.removeEventListener('mouseenter', enter);
        link.removeEventListener('focus', enter);
        link.removeEventListener('click', click);
      });
    });
    const leave = () => moveIndicator(active, false);
    const resize = () => moveIndicator(active, true);
    nav?.addEventListener('mouseleave', leave);
    window.addEventListener('resize', resize);
    cleanups.push(() => {
      nav?.removeEventListener('mouseleave', leave);
      window.removeEventListener('resize', resize);
    });
    moveIndicator(active, true);
    document.fonts?.ready.then(() => moveIndicator(active, true));

    /* ---- Counters ---- */
    let cancelled = false;
    const animateCounter = (el: HTMLElement, duration: number, delay: number) => {
      const target = parseFloat(el.getAttribute('data-counter') || '0');
      const suffix = el.getAttribute('data-suffix') || '';
      if (reduced) {
        el.textContent = target + suffix;
        return;
      }
      el.textContent = '0' + suffix;
      const start = performance.now() + delay;
      const tick = (now: number) => {
        if (cancelled) return;
        if (now < start) return void requestAnimationFrame(tick);
        const t = clamp((now - start) / duration, 0, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    cleanups.push(() => {
      cancelled = true;
    });

    const photo = root.querySelector<HTMLElement>('#heroPhoto');
    const photoStage = root.querySelector<HTMLElement>('.hero-photo-stage');
    const photoMask = root.querySelector<HTMLElement>('.hero-photo-mask');

    /* ---- Hero photo motion ---- */
    if (!reduced && photo) {
      void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
        ([gsapModule, scrollTriggerModule]) => {
          if (disposed) return;

          const gsap = gsapModule.gsap;
          gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);
          const photoMotion = gsap.context(() => {
            gsap.set(photo, { transformPerspective: 1000, transformOrigin: 'center center' });
            gsap.fromTo(
              photo,
              { autoAlpha: 0, filter: 'blur(12px)', scale: 1.04 },
              {
                autoAlpha: 1,
                filter: 'blur(0px)',
                scale: 1,
                duration: 1.3,
                delay: 0.04,
                ease: 'power3.out',
              }
            );

            if (photoMask) {
              gsap.to(photoMask, {
                yPercent: -6,
                ease: 'none',
                scrollTrigger: {
                  trigger: root,
                  start: 'top top',
                  end: 'bottom top',
                  scrub: 0.6,
                },
              });
            }

            if (!photoStage) return;

            const moveX = gsap.quickTo(photo, 'x', { duration: 0.75, ease: 'power3.out' });
            const moveY = gsap.quickTo(photo, 'y', { duration: 0.75, ease: 'power3.out' });
            const rotateX = gsap.quickTo(photo, 'rotationX', { duration: 0.75, ease: 'power3.out' });
            const rotateY = gsap.quickTo(photo, 'rotationY', { duration: 0.75, ease: 'power3.out' });

            const resetPhoto = () => {
              moveX(0);
              moveY(0);
              rotateX(0);
              rotateY(0);
            };

            const movePhotoWithPointer = (event: PointerEvent) => {
              if (event.pointerType !== 'mouse') return;

              const bounds = photoStage.getBoundingClientRect();
              const x = event.clientX - bounds.left;
              const y = event.clientY - bounds.top;
              if (x < 0 || x > bounds.width || y < 0 || y > bounds.height) {
                resetPhoto();
                return;
              }

              const horizontal = x / bounds.width - 0.5;
              const vertical = y / bounds.height - 0.5;
              moveX(horizontal * 14);
              moveY(vertical * 12);
              rotateX(vertical * -1.4);
              rotateY(horizontal * 1.6);
            };

            root.addEventListener('pointermove', movePhotoWithPointer);
            root.addEventListener('pointerleave', resetPhoto);
            cleanups.push(() => {
              root.removeEventListener('pointermove', movePhotoWithPointer);
              root.removeEventListener('pointerleave', resetPhoto);
            });
          }, root);
          revertPhotoMotion = () => photoMotion.revert();
        }
      );
    }

    /* ---- Load animations ---- */
    if (!reduced) {
      root.querySelectorAll<HTMLElement>('.title-line').forEach((line, i) => {
        line.animate(
          [{ transform: 'translate3d(0, 108%, 0)' }, { transform: 'translate3d(0, 0, 0)' }],
          { duration: 1000, delay: 80 + i * 110, easing: EASE_OUT, fill: 'backwards' }
        );
      });
      nav?.animate(
        [
          { opacity: 0, transform: 'translate3d(0, -18px, 0)' },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        ],
        { duration: 760, delay: 60, easing: EASE_OUT, fill: 'backwards' }
      );
      root.querySelectorAll<HTMLElement>('[data-hero-stagger]').forEach((el, idx) => {
        const mobilePlate = window.innerWidth <= 1100 && el.classList.contains('brand-plate');
        const from = mobilePlate ? 'translate3d(-50%, calc(-50% + 14px), 0)' : 'translate3d(0, 14px, 0)';
        const to = mobilePlate ? 'translate3d(-50%, -50%, 0)' : 'translate3d(0, 0, 0)';
        el.animate(
          [
            { opacity: 0, transform: from },
            { opacity: 1, transform: to },
          ],
          { duration: 720, delay: 140 + idx * 55, easing: EASE_OUT, fill: 'backwards' }
        );
      });
      root.querySelector<HTMLElement>('#qProgressFill')?.animate(
        [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
        { duration: 1150, delay: 520, easing: EASE_OUT, fill: 'backwards' }
      );
    }
    root.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => animateCounter(el, 1400, 260));

    return () => {
      disposed = true;
      cleanups.forEach((fn) => fn());
      revertPhotoMotion?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={rootRef} className="hero" id="top" aria-label="Prashanth Hero">
      <div className="hero-stage">
        
        <header className="hero-topbar">
          <nav className="nav-pill" id="heroNav" aria-label="Primary navigation">
            <div className="nav-indicator" id="navIndicator" aria-hidden="true"></div>
            <a href="#top" className="nav-link is-active is-covered" data-nav="home">Home</a>
            <a href="#statement" className="nav-link" data-nav="about">About Me</a>
            <a href="#projects" className="nav-link" data-nav="works">Works</a>
            <a href="#contact" className="nav-link" data-nav="contact">Contact</a>
          </nav>

          <div className="hero-date" data-hero-stagger>
            {currentWeekday}
            <span className="hero-date-sub">{currentDate}</span>
          </div>

          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            aria-pressed={theme === 'dark'}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? (
              <Sun aria-hidden="true" />
            ) : (
              <Moon aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            className="btn-contact"
            data-hero-stagger
            onClick={() => onOpenContact()}
            aria-label="Contact Us"
          >
            <span className="btn-contact-label">Contact Us</span>
            <span className="btn-contact-arrow" aria-hidden="true">↗</span>
          </button>
        </header>

        
        <div className="hero-title-group">
          <h1 className="hero-title">
            <span className="title-mask"><span className="title-line"> I'M </span></span>
            <span className="title-mask"><span className="title-line">  PRASHANTH </span></span>
          </h1> 
        </div>

        
        <div className="hero-about-label" data-hero-stagger>
          <span className="dot-ink" aria-hidden="true"></span>
          <span>(ABOUT)</span>
        </div>

        <p className="hero-about-copy" data-hero-stagger>
          Building stunning website that every brand deserves to be seen.
        </p>

        <button
          type="button"
          className="btn-book"
          data-hero-stagger
          onClick={() => onOpenContact()}
        >
          <span>Book A Call</span>
          <span aria-hidden="true">↗</span>
        </button>

        
        <div className="hero-photo-stage">
          <div className="hero-photo-mask">
            <img
              id="heroPhoto"
              className="hero-photo-img"
              src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/7dc8b8f3-4ccb-4599-8ce4-7f7c7881bad9.webp"
              alt="Monochrome studio portrait of an East Asian man seen from behind in a dark technical jacket"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="brand-plate" data-hero-stagger>
            <div className="brand-plate-left">
              
              <svg className="brand-mark" viewBox="0 0 32 26" fill="none" aria-hidden="true">
                <polygon points="16,1 2,25 13.5,25 16,13.5" fill="#f4f4f4" />
                <polygon points="18.2,5.5 30,25 18.2,25" fill="#f4f4f4" opacity="0.72" />
              </svg>
              <span className="brand-wordmark"> PROJECT'S </span>
            </div>
            <button
              type="button"
              className="plate-menu-btn"
              onClick={() => scrollTo('#projects')}
              aria-label="Open studio navigation menu">
              <span></span>
              <span></span>
            </button>
          </div>

          
          <div className="hero-logos" data-hero-stagger aria-label="Selected client wordmarks">
            <span className="hero-logo-item">
              <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="9" cy="9" r="2.2" fill="currentColor" />
              </svg>
              <span>Lumon</span>
            </span>
            <span className="hero-logo-sep" aria-hidden="true"></span>
            <span className="hero-logo-item">
              <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3 4.5L9 2L15 4.5V13.5L9 16L3 13.5V4.5Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M9 2V16" stroke="currentColor" strokeWidth="1.4" />
              </svg>
              <span>Paperfold</span>
            </span>
            <span className="hero-logo-sep" aria-hidden="true"></span>
            <span className="hero-logo-item">
              <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M2.5 13.5L9 3L15.5 13.5H11.5L9 9.2L6.5 13.5H2.5Z" fill="currentColor" />
              </svg>
              <span>Northwind</span>
            </span>
          </div>
        </div>

        
        <div className="stats-frame" data-hero-stagger>
          
          <div className="stat-dark-card">
            <div>
              <div className="stat-num" data-counter="5" data-suffix="+"> 5+ </div>
              <div className="stat-sub">Trusted Partner</div>
            </div>

            <div className="partner-grid" aria-label="Technologies and tools">
              <span className="partner-mark">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="currentColor" strokeWidth="1.5" />
                  <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
                  <circle cx="12" cy="12" r="1.4" fill="currentColor" />
                </svg>
                React Js
              </span>
              <span className="partner-mark">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 17.5c-1.6-1.4-2.5-3.3-2.5-5.5a8.5 8.5 0 0 1 17 0c0 2.2-.9 4.1-2.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="6" cy="17.5" r="2" fill="currentColor" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                  <circle cx="18" cy="17.5" r="2" fill="currentColor" />
                </svg>
              Redux Toolkit
              </span>
              <span className="partner-mark">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="2" fill="currentColor" />
                  <text x="12" y="16.5" fill="white" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="Arial, sans-serif">JS</text>
                </svg>
                Javascript
              </span>
              <span className="partner-mark">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m12 2.5 8.2 4.7v9.5L12 21.5l-8.2-4.8V7.2L12 2.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  <text x="12" y="14.6" fill="currentColor" fontSize="6.5" fontWeight="700" textAnchor="middle" fontFamily="Arial, sans-serif">JS</text>
                </svg>
              Node Js
              </span>
              <span className="partner-mark">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <text x="12" y="16.5" fill="currentColor" fontSize="14" fontWeight="700" fontStyle="italic" textAnchor="middle" fontFamily="Arial, sans-serif">ex</text>
                </svg>
                  Express Js
              </span>
              <span className="partner-mark">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="currentColor" strokeWidth="1.5" />
                  <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
                  <circle cx="12" cy="12" r="1.4" fill="currentColor" />
                </svg>
                  React Native
              </span>
            </div>

            <button type="button" className="btn-card-book" onClick={() => onOpenContact()}>
              <span>Book a call</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          
          <div className="stat-photo-card">
            <img
              className="stat-photo-bg"
              src={freshiesDashboardImage}
              alt="Freshies admin dashboard preview"
              referrerPolicy="no-referrer"
            />
            <div className="stat-photo-scrim" aria-hidden="true"></div>
            <div className="stat-feed-top">Studio Feed · 05/06</div>
            <div className="stat-feed-bottom">
              <div className="stat-num" data-counter="5" data-suffix="+"> 5+</div>
              <div className="stat-feed-desc">Projects successfully launched worldwide</div>
            </div>
          </div>
        </div>

        
        <div className="hero-growth-row">
          <div className="pill-growth" data-hero-stagger>
            <span className="check-disc" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none">
                <path
                  d="M3.5 8.4L6.6 11.4L12.6 4.8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>True Growth</span>
          </div>

          <div className="hero-avail" data-hero-stagger>
            <div>We’re available</div>
            <div className="hero-avail-line2">
              <span className="dot-ink" aria-hidden="true"></span>
              <span>for you</span>
            </div>
          </div>
        </div>

        
        <div className="out-now" id="out-now" data-hero-stagger>
          <div className="out-now-kicker">Out Now</div>
          <div className="out-now-head">
            <span className="out-now-title">{PROJECTS[0].name}</span>
          </div>
          <a
            href={PROJECTS[0].link}
            target="_blank"
            rel="noopener noreferrer"
            className="q-card"
            aria-label={`Open ${PROJECTS[0].name} project`}
          >
            <img
              className="q-card-img"
              src={PROJECTS[0].images[0]} alt={PROJECTS[0].name}
              referrerPolicy="no-referrer"
            />
            <div className="q-card-scrim" aria-hidden="true"></div>
            <span className="q-card-arrow" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none">
                <path
                  d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div className="q-progress-track" aria-hidden="true">
              <div className="q-progress-fill" id="qProgressFill"></div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { Marquee } from './Marquee';

const ROW_ONE = [
  'HTML',
  'CSS',
  'Bootstrap',
  'JavaScript',
  'React JS',
  'Redux',
  'Tailwind CSS',
];

const ROW_TWO = [
  'React Native',
  'Node.js',
  'Express.js',
  'MongoDB',
  'REST API',
  'GSAP',
  'Reanimated',
  'SOC Analyst',
  'Splunk',
];

const ROW_THREE = [
  'Brute Force',
  'Password Spraying',
  'Suspicious Login',
  'Phishing',
  'Malware',
  'Ransomware',
  'DoS / DDoS',
  'DNS Attacks',
  'SQL Injection',
  'XSS',
  'BEC',
  'Account Compromise',
];

const Chip: React.FC<{ label: string }> = ({ label }) => (
  <span className="shrink-0 whitespace-nowrap rounded-full border border-black/20 bg-[#F2F2F2] px-6 py-3 text-sm font-medium uppercase tracking-widest text-black sm:px-8 sm:py-4 sm:text-base md:text-xl">
    {label}
  </span>
);

const FADE_MASK =
  '[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]';

export const TechStackSection: React.FC = () => (
  <section
    id="tech"
    aria-label="Tech stack"
    className="w-full overflow-hidden bg-[#DADADA] py-16 sm:py-20"
  >
    <FadeIn delay={0} y={30}>
      <h2 className="hero-heading mb-10 text-center text-[clamp(2rem,6vw,80px)] font-black uppercase leading-none tracking-tight sm:mb-14 xl:pt-14">
        Tech Stack
      </h2>
    </FadeIn>

    <div className={`flex flex-col gap-4 ${FADE_MASK}`}>
      {/* Left to right */}
      <Marquee direction="right" duration={35} gapClassName="gap-4 pr-4" pauseOnHover>
        {ROW_ONE.map((t) => (
          <Chip key={t} label={t} />
        ))}
      </Marquee>

      {/* Right to left */}
      <Marquee direction="left" duration={35} gapClassName="gap-4 pr-4" pauseOnHover>
        {ROW_TWO.map((t) => (
          <Chip key={t} label={t} />
        ))}
      </Marquee>

      {/* Security and threat areas */}
      <Marquee direction="right" duration={40} gapClassName="gap-4 pr-4" pauseOnHover>
        {ROW_THREE.map((t) => (
          <Chip key={t} label={t} />
        ))}
      </Marquee>
    </div>
  </section>
);

export default TechStackSection;
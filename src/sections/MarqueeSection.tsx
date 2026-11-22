import React, { useMemo } from 'react';
import { MARQUEE_IMAGES } from '../data/portfolioData';
import { SmartImage } from '../components/SmartImage';
import Marquee from './Marquee';


const CARD =
  'h-[180px] w-[280px] shrink-0 overflow-hidden rounded-2xl bg-[#BFBFBF] sm:h-[230px] sm:w-[360px] md:h-[270px] md:w-[420px]';

export const MarqueeSection: React.FC = () => {
  const row1 = useMemo(() => MARQUEE_IMAGES.slice(0, 11), []);
  const row2 = useMemo(() => MARQUEE_IMAGES.slice(11), []);

  return (
    <section
      aria-label="3D and Motion Showcase Reel"
      className="w-full overflow-hidden bg-[#DADADA] pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1: continuously moves LEFT to RIGHT */}
        <Marquee direction="right" duration={70}>
          {row1.map((src, idx) => (
            <div key={`row1-${idx}`} className={CARD}>
              <SmartImage
                src={src}
                alt={`3D motion showcase preview ${idx + 1}`}
                loading="lazy"
                fallbackLabel="3D Preview"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </Marquee>

        {/* Row 2: continuously moves RIGHT to LEFT */}
        <Marquee direction="left" duration={70}>
          {row2.map((src, idx) => (
            <div key={`row2-${idx}`} className={CARD}>
              <SmartImage
                src={src}
                alt={`3D visual reel preview ${idx + 12}`}
                loading="lazy"
                fallbackLabel="Motion Preview"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default MarqueeSection;
import React from 'react';

export interface MarqueeProps {
  children: React.ReactNode;
  /** 'left' scrolls right-to-left, 'right' scrolls left-to-right */
  direction?: 'left' | 'right';
  /** Seconds for one full loop */
  duration?: number;
  gapClassName?: string;
  pauseOnHover?: boolean;
}

/**
 * Seamless infinite marquee. Children are rendered twice and the track is
 * translated by exactly 50%, so the loop never jumps or stops.
 */
export const Marquee: React.FC<MarqueeProps> = ({
  children,
  direction = 'left',
  duration = 40,
  gapClassName = 'gap-3 pr-3',
  pauseOnHover = false,
}) => (
  <div className={`group overflow-hidden ${pauseOnHover ? '' : ''}`}>
    <div
      className={`marquee-track ${
        direction === 'left' ? 'marquee-left' : 'marquee-right'
      } ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
      style={{ animationDuration: `${duration}s` }}
    >
      <div className={`flex shrink-0 ${gapClassName}`}>{children}</div>
      <div className={`flex shrink-0 ${gapClassName}`} aria-hidden="true">
        {children}
      </div>
    </div>
  </div>
);

export default Marquee;
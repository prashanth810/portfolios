import React from 'react';

export interface LiveProjectButtonProps {
  onClick?: () => void;
  label?: string;
  className?: string;
  href?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  onClick,
  label = 'Live Project',
  className = '',
  href,
}) => {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-full border-2 border-black px-6 py-2.5 sm:px-10 sm:py-3.5 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-black transition-colors duration-200 hover:bg-black/5 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-[#DADADA] ${className}`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {label}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {label}
    </button>
  );
};

export default LiveProjectButton;

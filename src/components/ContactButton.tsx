import React from 'react';

export interface ContactButtonProps {
  onClick?: () => void;
  label?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  label = 'Contact Me',
  className = '',
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`contact-btn-gradient inline-flex min-h-11 items-center justify-center rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-[#DADADA] ${className}`}
    >
      {label}
    </button>
  );
};

export default ContactButton;

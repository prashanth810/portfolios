import React, { useState } from 'react';
import { Box } from 'lucide-react';

export interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  loading?: 'lazy' | 'eager';
  draggable?: boolean;
  onClick?: () => void;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel,
  loading = 'lazy',
  draggable = false,
  onClick,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        onClick={onClick}
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#F2F2F2] via-[#E5E5E5] to-[#DADADA] border border-black/15 text-black/55 ${className}`}
      >
        <Box className="w-6 h-6 opacity-60" />
        {fallbackLabel && (
          <span className="text-xs uppercase tracking-widest px-3 text-center">
            {fallbackLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      draggable={draggable}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      onClick={onClick}
      className={className}
    />
  );
};

export default SmartImage;

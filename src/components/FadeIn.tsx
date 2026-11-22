import React from 'react';
import { motion } from 'framer-motion';

type MotionElementTag = keyof React.JSX.IntrinsicElements;

const motionTagCache = new Map<
  MotionElementTag,
  ReturnType<typeof motion.create>
>();

function getMotionComponent(tag: MotionElementTag) {
  let cached = motionTagCache.get(tag);
  if (!cached) {
    cached = motion.create(tag);
    motionTagCache.set(tag, cached);
  }
  return cached;
}

export interface FadeInProps {
  children: React.ReactNode;
  as?: MotionElementTag;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  as = 'div',
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
}) => {
  const MotionTag = getMotionComponent(as) as React.ComponentType<
    Record<string, unknown>
  >;

  return (
    <MotionTag
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};

export default FadeIn;

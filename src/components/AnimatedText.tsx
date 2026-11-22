import React, { useMemo, useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const AnimatedCharacter: React.FC<CharacterProps> = ({
  char,
  progress,
  range,
}) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="invisible select-none" aria-hidden="true">
        {char}
      </span>
      <motion.span
        style={{ opacity }}
        className="absolute inset-0 will-change-[opacity]"
      >
        {char}
      </motion.span>
    </span>
  );
};

export interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
}) => {
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const { words, totalChars } = useMemo(() => {
    const rawWords = text.split(' ');
    let runningIndex = 0;
    const mapped = rawWords.map((word, wordIdx) => {
      const chars = Array.from(word).map((char) => {
        const index = runningIndex;
        runningIndex += 1;
        return { char, index };
      });
      if (wordIdx < rawWords.length - 1) {
        runningIndex += 1;
      }
      return { word, chars };
    });
    return { words: mapped, totalChars: Math.max(runningIndex, 1) };
  }, [text]);

  return (
    <p ref={paragraphRef} className={className} aria-label={text}>
      {words.map((wordObj, wordIndex) => (
        <React.Fragment key={`${wordObj.word}-${wordIndex}`}>
          <span className="inline-block whitespace-nowrap">
            {wordObj.chars.map(({ char, index }) => {
              const start = index / totalChars;
              const end = Math.min((index + 1) / totalChars, 1);
              return (
                <AnimatedCharacter
                  key={index}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
          {wordIndex < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </p>
  );
};

export default AnimatedText;

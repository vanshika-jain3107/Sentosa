import React from 'react';
import { motion, useScroll, useVelocity, useSpring, useReducedMotion } from 'framer-motion';

export const easeSteam = [0.22, 1, 0.36, 1] as const;
export const easePour = [0.65, 0, 0.35, 1] as const;
export const easeSettle = [0.34, 1.26, 0.64, 1] as const;
export const easeDrift = [0.83, 0, 0.17, 1] as const;

export function useScrollVelocity() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  return smoothVelocity;
}

export function MaskedLine({ children, delay = 0, stagger = 0 }: { children: React.ReactNode, delay?: number, stagger?: number }) {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { y: '100%' }}
        whileInView={shouldReduceMotion ? { opacity: 1 } : { y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{
          duration: shouldReduceMotion ? 0.2 : 0.9,
          ease: easeSteam,
          delay
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function SplitWords({ text, delay = 0, staggerDelay = 0.04 }: { text: string, delay?: number, staggerDelay?: number }) {
  const words = text.split(' ');
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <span className="inline-block">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={shouldReduceMotion ? { opacity: 0 } : { y: '100%' }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.9,
              ease: easeSteam,
              delay: delay + i * staggerDelay
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

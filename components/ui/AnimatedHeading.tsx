import React, { useRef } from 'react';
import { m as motion, useInView, Variants } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useReducedMotion } from '../../lib/hooks/useReducedMotion';

interface AnimatedHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
}

const defaultVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const directionVariants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
};

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  children,
  className,
  as = 'h2',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  once = true,
}) => {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, {
    once,
    margin: '-100px',
  });

  const variants = directionVariants[direction] || defaultVariants;

  const MotionTag = motion[as] as typeof motion.h2;

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag ref={ref} className={cn(className)}>{children}</Tag>;
  }

  return (
    <MotionTag
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
};

export default AnimatedHeading;







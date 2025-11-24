import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import React, { useRef } from "react";
import { cn } from "../lib/utils";

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
  children?: React.ReactNode;
  baseVelocity: number;
  className?: string;
}

function ParallaxText({ children, baseVelocity = 100, className }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /**
   * The x transform wraps between 0% and -25%.
   * This assumes there are 4 copies of the children content.
   * As the content moves left (negative), once it reaches -25% (the width of one copy),
   * it snaps back to 0%, creating a seamless loop.
   */
  const x = useTransform(baseX, (v) => `${wrap(0, -25, v)}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * Change direction based on scroll velocity polarity.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div className={cn("flex flex-nowrap", className)} style={{ x }}>
        <div className="flex items-center flex-shrink-0">{children}</div>
        <div className="flex items-center flex-shrink-0">{children}</div>
        <div className="flex items-center flex-shrink-0">{children}</div>
        <div className="flex items-center flex-shrink-0">{children}</div>
      </motion.div>
    </div>
  );
}

interface VelocityScrollProps {
  default_velocity?: number;
  className?: string;
  children?: React.ReactNode;
}

export function VelocityScroll({
  default_velocity = 5,
  className,
  children,
}: VelocityScrollProps) {
  return (
    <section className="relative w-full overflow-hidden">
      <ParallaxText baseVelocity={default_velocity} className={className}>
        {children}
      </ParallaxText>
    </section>
  );
}
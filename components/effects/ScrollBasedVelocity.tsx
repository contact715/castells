import {
  m as motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "../../lib/utils";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
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

  const x = useTransform(baseX, (v) => `${wrap(0, -25, v)}%`);
  const directionFactor = useRef<number>(1);

  // Only observe visibility — pause animation when off-screen
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '100px' }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((t, delta) => {
    // Skip all work when off-screen
    if (!isVisible) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={containerRef} className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div className={cn("flex flex-nowrap", className)} style={{ x }}>
        <div className="flex items-center shrink-0">{children}</div>
        <div className="flex items-center shrink-0">{children}</div>
        <div className="flex items-center shrink-0">{children}</div>
        <div className="flex items-center shrink-0">{children}</div>
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

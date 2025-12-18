"use client";

import React from "react";
import { motion, useInView, type HTMLMotionProps, type Variants } from "framer-motion";
import { cn } from "../../lib/utils";

type TimelineContentProps<T extends keyof HTMLElementTagNameMap> = {
  children?: React.ReactNode;
  animationNum: number;
  className?: string;
  timelineRef: React.RefObject<HTMLElement | null>;
  as?: T;
  customVariants?: Variants;
  once?: boolean;
} & Omit<HTMLMotionProps<T>, 'variants' | 'initial' | 'animate' | 'custom'>;

export const TimelineContent = <T extends keyof HTMLElementTagNameMap = "div">({
  children,
  animationNum,
  timelineRef,
  className,
  as,
  customVariants,
  once = false,
  ...props
}: TimelineContentProps<T>) => {
  const defaultSequenceVariants: Variants = {
    visible: (i: number) => ({
      filter: "blur(0px)",
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.5,
        duration: 0.5,
      } as any,
    }),
    hidden: {
      filter: "blur(20px)",
      y: 0,
      opacity: 0,
    },
  };

  // Use custom variants if provided, otherwise use default
  const sequenceVariants = customVariants || defaultSequenceVariants;

  const isInView = useInView(timelineRef, {
    once,
    margin: "-50px",
  });

  const MotionComponent = motion[as || "div"] as React.ElementType;

  return (
    <MotionComponent
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={animationNum}
      variants={sequenceVariants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};



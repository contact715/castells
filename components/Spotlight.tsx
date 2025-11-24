
import React from "react";
import { cn } from "../lib/utils";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

type SpotlightProps = {
  className?: string;
  fill?: string;
};

export const Spotlight = ({ className, fill = "white" }: SpotlightProps) => {
  const { scrollYProgress } = useScroll();

  // Map scroll progress to a slight, smooth movement (parallax effect)
  // As the user scrolls down, the light drifts slightly
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const x = useTransform(scrollYProgress, [0, 1], [0, 30]);

  // Use spring physics for smoothness
  const springConfig = { stiffness: 80, damping: 30, mass: 1 };
  const smoothY = useSpring(y, springConfig);
  const smoothX = useSpring(x, springConfig);

  return (
    <motion.div
      style={{ x: smoothX, y: smoothY }}
      className={cn(
        "pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%]",
        className
      )}
    >
      <svg
        className="animate-spotlight opacity-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3787 2842"
        fill="none"
      >
        <g filter="url(#filter0_f_0_1)">
          <ellipse
            cx="1924.71"
            cy="273.501"
            rx="1924.71"
            ry="273.501"
            transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
            fill={fill}
            fillOpacity="0.21"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_0_1"
            x="0.860352"
            y="0.838989"
            width="3785.16"
            height="2840.26"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="151"
              result="effect1_foregroundBlur_0_1"
            />
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
};

export default Spotlight;

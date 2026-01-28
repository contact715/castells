"use client";

import { useRef } from 'react';
import { motion } from "framer-motion";

/**
 * GUTTED MagicBento: "No-Glow" Lockdown Edition.
 * Now with Staggered Entrance Animation via Framer Motion.
 */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
};

export const ParticleCard = ({
  children,
  className = '',
  style = {},
}) => {
  return (
    <motion.div
      variants={item}
      className={`${className} relative overflow-hidden rounded-card border future-glass hover:border-primary/40 transition-all duration-300`}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export const GlobalSpotlight = () => null;

export const BentoCardGrid = ({ children, gridRef, className = '' }) => (
  <motion.div
    variants={container}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className={`${className} bento-section`}
    ref={gridRef}
  >
    {children}
  </motion.div>
);

const MagicBento = ({
  children,
  className = ""
}) => {
  const gridRef = useRef(null);

  return (
    <div className="relative w-full">
      <BentoCardGrid gridRef={gridRef} className={className}>
        {children || <div className="text-white p-4 uppercase font-bold text-[10px]">Matrix Empty</div>}
      </BentoCardGrid>
    </div>
  );
};

export default MagicBento;

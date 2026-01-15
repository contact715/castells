"use client";

import { useRef } from 'react';

/**
 * GUTTED MagicBento: "No-Glow" Lockdown Edition.
 * All mouse-tracking, particles, ripples, and spotlight effects have been purged.
 * This component now provides a clean, high-contrast container for bento-style layouts.
 */

export const ParticleCard = ({
  children,
  className = '',
  style = {},
}) => {
  return (
    <div
      className={`${className} relative overflow-hidden bg-surface dark:bg-dark-surface border border-black/5 dark:border-white/10 rounded-card`}
      style={style}
    >
      {children}
    </div>
  );
};

export const GlobalSpotlight = () => null;

export const BentoCardGrid = ({ children, gridRef, className = '' }) => (
  <div className={`${className} bento-section`} ref={gridRef}>
    {children}
  </div>
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

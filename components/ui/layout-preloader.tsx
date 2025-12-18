"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutPreloaderProps {
  onComplete?: () => void;
}

export function LayoutPreloader({ onComplete }: LayoutPreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Complete after minimum time or when page is loaded
    const minTime = 1500; // Minimum 1.5 seconds
    const startTime = Date.now();

    const checkComplete = () => {
      const elapsed = Date.now() - startTime;
      const isPageLoaded = document.readyState === 'complete';
      
      if ((progress >= 100 && isPageLoaded) || elapsed >= minTime) {
        clearInterval(progressInterval);
        setTimeout(() => {
          setIsVisible(false);
          if (onComplete) {
            setTimeout(onComplete, 500); // Wait for fade out animation
          }
        }, 300);
      }
    };

    const checkInterval = setInterval(checkComplete, 100);

    // Also listen for page load event
    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= minTime) {
        clearInterval(checkInterval);
        clearInterval(progressInterval);
        setTimeout(() => {
          setIsVisible(false);
          if (onComplete) {
            setTimeout(onComplete, 500);
          }
        }, 300);
      }
    };

    if (document.readyState === 'complete') {
      setTimeout(handleLoad, minTime);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearInterval(progressInterval);
      clearInterval(checkInterval);
      window.removeEventListener('load', handleLoad);
    };
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-ivory dark:bg-[#191919] flex items-center justify-center overflow-hidden"
        >
          {/* Noise overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              animation: 'noise-animation 0.4s steps(8) infinite',
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-8">
            {/* Logo or Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-coral flex items-center justify-center">
                <span className="font-display font-bold text-2xl text-white">C</span>
              </div>
              <span className="font-display font-bold text-3xl tracking-tight text-text-primary">
                Castells.
              </span>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="w-64 h-1 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-coral rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </motion.div>

            {/* Loading Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm text-text-secondary font-medium tracking-wide"
            >
              Loading...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LayoutPreloader;



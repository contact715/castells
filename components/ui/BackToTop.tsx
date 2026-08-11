import React, { useState, useEffect, useRef } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Button } from './Button';
import { useReducedMotion } from '../../lib/hooks/useReducedMotion';

interface BackToTopProps {
  className?: string;
  threshold?: number;
}

const BackToTop: React.FC<BackToTopProps> = React.memo(({
  className = '',
  threshold = 400
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const ticking = useRef(false);
  const rafId = useRef(0);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > threshold);
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        rafId.current = requestAnimationFrame(toggleVisibility);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          className={`fixed bottom-8 right-8 z-50 ${className}`}
        >
          <Button
            onClick={scrollToTop}
            size="md"
            className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

BackToTop.displayName = 'BackToTop';

export default BackToTop;

import React, { useState, useEffect, useRef } from 'react';

interface ReadingProgressProps {
  className?: string;
  color?: string;
}

const ReadingProgress: React.FC<ReadingProgressProps> = React.memo(({
  className = '',
  color = 'bg-coral'
}) => {
  const [progress, setProgress] = useState(0);
  const rafId = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const scrollableHeight = documentHeight - windowHeight;
      const scrolled = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, scrolled)));
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        rafId.current = requestAnimationFrame(updateProgress);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (progress === 0) return null;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 h-1 bg-black/5 dark:bg-white/10 ${className}`}>
      <div
        className={`h-full ${color}`}
        style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
      />
    </div>
  );
});

ReadingProgress.displayName = 'ReadingProgress';

export default ReadingProgress;

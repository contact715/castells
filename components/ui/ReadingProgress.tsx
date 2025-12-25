import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ReadingProgressProps {
  className?: string;
  color?: string;
}

const ReadingProgress: React.FC<ReadingProgressProps> = React.memo(({ 
  className = '',
  color = 'bg-coral'
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      const scrollableHeight = documentHeight - windowHeight;
      const scrolled = scrollTop / scrollableHeight;
      
      setProgress(Math.min(100, Math.max(0, scrolled * 100)));
    };

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  if (progress === 0) return null;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 h-1 bg-black/5 dark:bg-white/10 ${className}`}>
      <motion.div
        className={`h-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1, ease: 'linear' }}
      />
    </div>
  );
});

ReadingProgress.displayName = 'ReadingProgress';

export default ReadingProgress;


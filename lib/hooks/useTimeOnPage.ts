import { useEffect, useRef } from 'react';
import { trackTimeOnPage } from '../analytics';

/**
 * Hook to track time spent on page
 * Tracks milestones: 30s, 1m, 2m, 5m, 10m
 */
export const useTimeOnPage = () => {
  const startTime = useRef<number>(Date.now());
  const trackedMilestones = useRef<Set<number>>(new Set());

  useEffect(() => {
    const milestones = [30, 60, 120, 300, 600]; // 30s, 1m, 2m, 5m, 10m
    
    const checkMilestones = () => {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      
      milestones.forEach(milestone => {
        if (timeSpent >= milestone && !trackedMilestones.current.has(milestone)) {
          trackedMilestones.current.add(milestone);
          trackTimeOnPage(milestone);
        }
      });
    };

    // Check every 10 seconds
    const interval = setInterval(checkMilestones, 10000);
    
    // Check immediately for pages where user stays less than 10 seconds
    checkMilestones();
    
    return () => {
      clearInterval(interval);
    };
  }, []);
};


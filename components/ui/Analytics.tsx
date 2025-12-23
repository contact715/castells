import React, { useEffect } from 'react';
import { initGA, pageview } from '../../lib/analytics';

/**
 * Analytics component that initializes GA and tracks page views
 * Add this to your App.tsx or root component
 */
interface AnalyticsProps {
  currentPage?: string;
}

const Analytics: React.FC<AnalyticsProps> = ({ currentPage }) => {
  useEffect(() => {
    // Initialize GA on mount
    initGA();
  }, []);

  useEffect(() => {
    // Track page view on route change
    if (typeof window !== 'undefined' && currentPage) {
      const path = currentPage === 'home' ? '/' : `/${currentPage}`;
      pageview(path);
    }
  }, [currentPage]);

  return null;
};

export default Analytics;


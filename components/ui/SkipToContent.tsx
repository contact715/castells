import React from 'react';

/**
 * Skip to main content link for accessibility
 * Allows keyboard users to skip navigation and go directly to main content
 */
const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-coral focus:text-white focus:rounded-xl focus:font-bold focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;


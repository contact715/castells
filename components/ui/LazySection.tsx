import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  className?: string;
}

/**
 * LazySection - Component that loads content only when it's about to enter the viewport
 * This improves initial page load performance by deferring rendering of below-the-fold content
 */
const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback = null,
  rootMargin = '200px',
  className = '',
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || shouldRender) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldRender(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [shouldRender, rootMargin]);

  return (
    <div ref={containerRef} className={className}>
      {shouldRender ? children : fallback}
    </div>
  );
};

export default LazySection;



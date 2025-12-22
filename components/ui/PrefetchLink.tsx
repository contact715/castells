import React, { useCallback } from 'react';

interface PrefetchLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  prefetchDelay?: number; // Delay before prefetch (ms)
}

/**
 * PrefetchLink - Component that prefetches resources on hover
 * Improves perceived performance by loading resources before user clicks
 */
const PrefetchLink: React.FC<PrefetchLinkProps> = ({
  href,
  children,
  prefetchDelay = 100,
  ...props
}) => {
  const prefetchTimeoutRef = React.useRef<NodeJS.Timeout>();

  const handleMouseEnter = useCallback(() => {
    // Clear any existing timeout
    if (prefetchTimeoutRef.current) {
      clearTimeout(prefetchTimeoutRef.current);
    }

    // Prefetch after delay
    prefetchTimeoutRef.current = setTimeout(() => {
      // Prefetch the page
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      link.as = 'document';
      document.head.appendChild(link);
    }, prefetchDelay);
  }, [href, prefetchDelay]);

  const handleMouseLeave = useCallback(() => {
    // Clear timeout if user leaves before prefetch
    if (prefetchTimeoutRef.current) {
      clearTimeout(prefetchTimeoutRef.current);
    }
  }, []);

  React.useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (prefetchTimeoutRef.current) {
        clearTimeout(prefetchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <a
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </a>
  );
};

export default PrefetchLink;



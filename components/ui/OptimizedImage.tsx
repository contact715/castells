import React, { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  webpSrc?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  srcSet?: string;
  blurDataURL?: string; // Base64 encoded blur placeholder
  fetchPriority?: 'high' | 'low' | 'auto';
  onLoad?: () => void;
}

/**
 * OptimizedImage - Component for optimized images with WebP support, blur placeholder, and responsive images
 * Automatically uses WebP format when available, falls back to original format
 * Supports blur placeholder for better UX and CLS prevention
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  webpSrc,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  sizes,
  srcSet,
  blurDataURL,
  fetchPriority = 'auto',
  onLoad,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
      onLoad?.();
    }
  }, [onLoad]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
  };

  // Generate responsive srcSet if not provided
  const generateSrcSet = (baseSrc: string) => {
    if (srcSet) return srcSet;
    if (!width) return undefined;

    // Generate srcset for common breakpoints
    const breakpoints = [400, 800, 1200, 1600];
    return breakpoints
      .filter(bp => bp <= width * 2)
      .map(bp => `${baseSrc}?w=${bp} ${bp}w`)
      .join(', ');
  };

  const imageClasses = `transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
    } ${className}`;

  const placeholderClasses = `absolute inset-0 transition-opacity duration-300 ${isLoaded ? 'opacity-0' : 'opacity-100'
    } ${className}`;

  // If WebP source is provided, use <picture> element
  if (webpSrc) {
    return (
      <div className="relative overflow-hidden" style={{ width, height }}>
        {/* Blur placeholder */}
        {blurDataURL && (
          <img
            src={blurDataURL}
            alt=""
            className={placeholderClasses}
            aria-hidden="true"
            style={{ filter: 'blur(20px)', transform: 'scale(1.1)' }}
          />
        )}

        <picture>
          <source
            srcSet={generateSrcSet(webpSrc) || webpSrc}
            type="image/webp"
            sizes={sizes}
          />
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            className={imageClasses}
            width={width}
            height={height}
            loading={loading}
            sizes={sizes}
            srcSet={generateSrcSet(src) || srcSet}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
          />
        </picture>

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-white/5">
            <span className="text-text-secondary text-sm">Failed to load image</span>
          </div>
        )}
      </div>
    );
  }

  // Otherwise, use regular img tag with blur placeholder
  return (
    <div className="relative overflow-hidden" style={{ width, height }}>
      {/* Blur placeholder */}
      {blurDataURL && (
        <img
          src={blurDataURL}
          alt=""
          className={placeholderClasses}
          aria-hidden="true"
          style={{ filter: 'blur(20px)', transform: 'scale(1.1)' }}
        />
      )}

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={imageClasses}
        width={width}
        height={height}
        loading={loading}
        sizes={sizes}
        srcSet={generateSrcSet(src) || srcSet}
        decoding="async"
        fetchPriority={fetchPriority}
        onLoad={handleLoad}
        onError={handleError}
      />

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-white/5">
          <span className="text-text-secondary text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;

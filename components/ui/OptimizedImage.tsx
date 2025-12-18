import React from 'react';

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
}

/**
 * OptimizedImage - Component for optimized images with WebP support
 * Automatically uses WebP format when available, falls back to original format
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
}) => {
  // If WebP source is provided, use <picture> element
  if (webpSrc) {
    return (
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={src}
          alt={alt}
          className={className}
          width={width}
          height={height}
          loading={loading}
          sizes={sizes}
          srcSet={srcSet}
          decoding="async"
        />
      </picture>
    );
  }

  // Otherwise, use regular img tag
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      sizes={sizes}
      srcSet={srcSet}
      decoding="async"
    />
  );
};

export default OptimizedImage;

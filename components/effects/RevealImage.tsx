import React, { useRef, useMemo, memo } from 'react';
import { m as motion, useScroll, useTransform } from 'framer-motion';
import OptimizedImage from '../ui/OptimizedImage';

interface RevealImageProps {
    src: string;
    alt: string;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right';
    width?: number;
    height?: number;
}

/**
 * RevealImage - An image that reveals itself with a gradient mask as user scrolls.
 * The gradient mask fades from transparent to opaque based on scroll position.
 */
export const RevealImage: React.FC<RevealImageProps> = memo(({
    src,
    alt,
    className = '',
    direction = 'up',
    width,
    height,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Transform scroll progress to mask reveal
    const maskProgress = useTransform(scrollYProgress, [0, 0.4], [0, 100]);

    // Memoize gradient direction
    const gradientDirection = useMemo(() => {
        switch (direction) {
            case 'up': return 'to top';
            case 'down': return 'to bottom';
            case 'left': return 'to left';
            case 'right': return 'to right';
            default: return 'to top';
        }
    }, [direction]);

    const maskImageStyle = useTransform(
        maskProgress,
        (value) => `linear-gradient(${gradientDirection}, black ${value}%, transparent ${value + 20}%)`
    );

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div
                className="w-full h-full"
                style={{
                    maskImage: maskImageStyle,
                    WebkitMaskImage: maskImageStyle,
                }}
            >
                <OptimizedImage
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={width}
                    height={height}
                />
            </motion.div>
        </div>
    );
}, (prevProps, nextProps) => {
    return prevProps.src === nextProps.src && 
           prevProps.direction === nextProps.direction;
});

RevealImage.displayName = 'RevealImage';

export default RevealImage;

import React, { useRef } from 'react';
import { m as motion, useScroll, useTransform } from 'framer-motion';

interface RevealImageProps {
    src: string;
    alt: string;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right';
}

/**
 * RevealImage - An image that reveals itself with a gradient mask as user scrolls.
 * The gradient mask fades from transparent to opaque based on scroll position.
 */
export const RevealImage: React.FC<RevealImageProps> = ({
    src,
    alt,
    className = '',
    direction = 'up',
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Transform scroll progress to mask reveal
    const maskProgress = useTransform(scrollYProgress, [0, 0.4], [0, 100]);

    // Define gradient direction based on prop
    const getGradientDirection = () => {
        switch (direction) {
            case 'up': return 'to top';
            case 'down': return 'to bottom';
            case 'left': return 'to left';
            case 'right': return 'to right';
            default: return 'to top';
        }
    };

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div
                className="w-full h-full"
                style={{
                    maskImage: useTransform(
                        maskProgress,
                        (value) => `linear-gradient(${getGradientDirection()}, black ${value}%, transparent ${value + 20}%)`
                    ),
                    WebkitMaskImage: useTransform(
                        maskProgress,
                        (value) => `linear-gradient(${getGradientDirection()}, black ${value}%, transparent ${value + 20}%)`
                    ),
                }}
            >
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                />
            </motion.div>
        </div>
    );
};

export default RevealImage;

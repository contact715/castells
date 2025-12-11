import React, { useRef } from 'react';
import { m as motion, useScroll, useTransform } from 'framer-motion';

interface RevealTextProps {
    children: React.ReactNode;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
}

/**
 * RevealText - Text that reveals with a smooth scroll-triggered gradient mask effect.
 * Works great for headlines and paragraphs.
 */
export const RevealText: React.FC<RevealTextProps> = ({
    children,
    className = '',
    as = 'div',
    direction = 'up',
    delay = 0,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "start 0.3"],
    });

    // Transform scroll progress to reveal percentage
    const maskProgress = useTransform(scrollYProgress, [0, 1], [0, 120]);

    // Also add a subtle Y transform for extra polish
    const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);

    // Define gradient direction
    const getGradientDirection = () => {
        switch (direction) {
            case 'up': return 'to top';
            case 'down': return 'to bottom';
            case 'left': return 'to left';
            case 'right': return 'to right';
            default: return 'to top';
        }
    };

    const Component = motion[as] || motion.div;

    return (
        <div ref={ref} className="overflow-hidden">
            <Component
                className={className}
                style={{
                    y,
                    opacity,
                    maskImage: useTransform(
                        maskProgress,
                        (value) => `linear-gradient(${getGradientDirection()}, black ${value}%, transparent ${value + 15}%)`
                    ),
                    WebkitMaskImage: useTransform(
                        maskProgress,
                        (value) => `linear-gradient(${getGradientDirection()}, black ${value}%, transparent ${value + 15}%)`
                    ),
                }}
            >
                {children}
            </Component>
        </div>
    );
};

export default RevealText;

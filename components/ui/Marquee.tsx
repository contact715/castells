import React, { useMemo } from 'react';
import { cn } from '../../lib/utils';

interface MarqueeProps {
    children: React.ReactNode;
    className?: string;
    velocity?: number;
}

export const Marquee: React.FC<MarqueeProps> = React.memo(({
    children,
    className,
    velocity = 1
}) => {
    const animationDuration = useMemo(() => `${40 / velocity}s`, [velocity]);

    return (
        <div className={cn("relative flex overflow-hidden", className)}>
            <div
                className="flex gap-12 animate-marquee whitespace-nowrap"
                style={{
                    animationDuration,
                    willChange: 'transform', // Оптимизация для GPU
                }}
            >
                {children}
                {children}
            </div>
            <div
                className="absolute top-0 flex gap-12 animate-marquee whitespace-nowrap"
                style={{
                    animationDuration,
                    willChange: 'transform', // Оптимизация для GPU
                }}
            >
                {children}
                {children}
            </div>
        </div>
    );
});

Marquee.displayName = 'Marquee';

export default Marquee;

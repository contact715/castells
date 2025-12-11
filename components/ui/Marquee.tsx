import React from 'react';
import { cn } from '../../lib/utils';

interface MarqueeProps {
    children: React.ReactNode;
    className?: string;
    velocity?: number;
}

export const Marquee: React.FC<MarqueeProps> = ({
    children,
    className,
    velocity = 1
}) => {
    return (
        <div className={cn("relative flex overflow-hidden", className)}>
            <div
                className="flex gap-12 animate-marquee whitespace-nowrap"
                style={{
                    animationDuration: `${40 / velocity}s`
                }}
            >
                {children}
                {children}
            </div>
            <div
                className="absolute top-0 flex gap-12 animate-marquee whitespace-nowrap"
                style={{
                    animationDuration: `${40 / velocity}s`
                }}
            >
                {children}
                {children}
            </div>
        </div>
    );
};

export default Marquee;

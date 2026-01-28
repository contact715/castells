"use client";

import { memo } from "react";

interface CountUpProps {
    value: string | number;
    duration?: number;
    className?: string;
    prefix?: string;
    suffix?: string;
}

// Simplified CountUp - just displays value without animation for performance
export const CountUp = memo(function CountUp({ value, className, prefix = "", suffix = "" }: CountUpProps) {
    return (
        <span className={className}>
            {prefix}{value}{suffix}
        </span>
    );
});

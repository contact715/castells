"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, useState } from "react";

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    className?: string;
    label?: string;
    showValue?: boolean;
}

export function Slider({
    className,
    label,
    showValue = true,
    value,
    defaultValue,
    onChange,
    ...props
}: SliderProps) {
    const [currentValue, setCurrentValue] = useState(
        value || defaultValue || props.min || 0
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setCurrentValue(newValue);
        onChange?.(e);
    };

    const percentage = ((Number(currentValue) - Number(props.min || 0)) / (Number(props.max || 100) - Number(props.min || 0))) * 100;

    return (
        <div className={cn("w-full", className)}>
            {label && (
                <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans">{label}</label>
                    {showValue && (
                        <span className="text-sm font-display font-semibold text-coral">
                            {currentValue}%
                        </span>
                    )}
                </div>
            )}
            <input
                type="range"
                className="w-full h-2 bg-black/5 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-coral"
                style={{
                    background: `linear-gradient(to right, rgb(var(--accent)) 0%, rgb(var(--accent)) ${percentage}%, rgba(0, 0, 0, 0.05) ${percentage}%, rgba(0, 0, 0, 0.05) 100%)`,
                }}
                value={value !== undefined ? value : currentValue}
                onChange={handleChange}
                {...props}
            />
        </div>
    );
}




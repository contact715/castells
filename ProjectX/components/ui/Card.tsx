import { cn } from "@/lib/utils";
import { ReactNode, memo } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    variant?: "default" | "glass" | "outline" | "elevated";
}

/**
 * Thalassa-style Card Component
 * Clean white cards with soft shadows and subtle borders
 */
export const Card = memo(function Card({ children, className, variant = "default" }: CardProps) {
    const variantClasses = {
        // Default: Dark gray card (Gmail dark theme style)
        default: "bg-[#2C2C2C] border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.3),0_8px_24px_rgba(0,0,0,0.2)]",
        // Glass: Same as default
        glass: "bg-[#2C2C2C] border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.3),0_8px_24px_rgba(0,0,0,0.2)]",
        // Outline: Border with moderate shadow
        outline: "bg-[#2C2C2C] border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.3),0_8px_24px_rgba(0,0,0,0.2)]",
        // Elevated: Stronger shadow
        elevated: "bg-[#333333] border border-white/15 shadow-[0_6px_16px_rgba(0,0,0,0.4),0_12px_32px_rgba(0,0,0,0.3)]",
    };

    return (
        <div
            className={cn(
                "relative rounded-card p-5 transition-all duration-300",
                variantClasses[variant] || variantClasses.default,
                className
            )}
        >
            {children}
        </div>
    );
});

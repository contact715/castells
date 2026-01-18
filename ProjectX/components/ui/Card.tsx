import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    variant?: "default" | "glass" | "strong";
}

export function Card({ children, className, variant = "default" }: CardProps) {
    const variantClasses = {
        default: "bg-surface dark:bg-dark-surface shadow-sm",
        glass: "bg-surface/90 dark:bg-dark-surface/90 backdrop-blur-md",
        strong: "bg-surface dark:bg-dark-surface shadow-xl",
    };

    return (
        <div
            className={cn(
                "rounded-card p-6 transition-all duration-300 border border-black/5 dark:border-white/5",
                variantClasses[variant],
                className
            )}
        >
            {children}
        </div>
    );
}




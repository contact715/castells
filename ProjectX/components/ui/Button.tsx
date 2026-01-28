import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "accent";
    size?: "sm" | "md" | "lg" | "icon";
    className?: string;
    asChild?: boolean;
}

/**
 * Thalassa-style Button Component
 * Clean, modern buttons with subtle interactions
 */
export function Button({
    children,
    variant = "primary",
    size = "md",
    className,
    ...props
}: ButtonProps) {
    const variantClasses = {
        // Primary: Blue button (dashboard style) - uses primary color from design system
        primary:
            "bg-primary text-white hover:bg-primary/90 font-medium shadow-sm",
        // Secondary: Light gray
        secondary:
            "bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium",
        // Outline: Border only
        outline:
            "bg-transparent border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300",
        // Ghost: No background
        ghost: 
            "text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-medium",
        // Danger: Red
        danger: 
            "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100",
        // Accent: Blue accent color
        accent: 
            "bg-primary text-white hover:bg-primary/90 font-medium shadow-sm",
    };

    const sizeClasses = {
        sm: "px-3 py-1.5 text-xs rounded-inner",
        md: "px-4 py-2 text-sm rounded-inner",
        lg: "px-6 py-2.5 text-base rounded-inner",
        icon: "p-2 rounded-inner aspect-square",
    };

    return (
        <motion.button
            className={cn(
                "flex flex-row items-center justify-center gap-2 whitespace-nowrap leading-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                variantClasses[variant],
                sizeClasses[size],
                className
            )}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            {...props}
        >
            {children}
        </motion.button>
    );
}

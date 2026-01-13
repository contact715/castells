import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    className?: string;
    asChild?: boolean;
}

export function Button({
    children,
    variant = "primary",
    size = "md",
    className,
    ...props
}: ButtonProps) {
    const variantClasses = {
        primary:
            "bg-black text-white dark:bg-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 font-sans font-bold uppercase tracking-widest shadow-lg hover:shadow-xl",
        secondary:
            "bg-coral text-white hover:bg-coral-dark font-sans font-bold uppercase tracking-widest shadow-lg hover:shadow-xl",
        outline:
            "bg-transparent text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-sans font-bold uppercase tracking-widest",
        ghost: "text-text-primary dark:text-white hover:bg-bhover:bg-black/5 dark:bg-dark-surface/50",
        danger: "bg-red-600 text-white hover:bg-red-700 font-sans font-bold uppercase tracking-widest shadow-lg hover:shadow-xl",
    };

    const sizeClasses = {
        sm: "px-6 py-2.5 text-xs rounded-[2rem]",
        md: "px-6 py-3 text-xs rounded-[2rem]",
        lg: "px-8 py-4 text-sm rounded-[2rem]",
    };

    return (
        <motion.button
            className={cn(
                "transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed",
                variantClasses[variant],
                sizeClasses[size],
                className
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {children}
        </motion.button>
    );
}




import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
    size?: "sm" | "md" | "lg" | "icon";
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
            "bg-white text-black hover:bg-white/90 font-sans font-bold uppercase tracking-widest shadow-sm border border-black/5 dark:border-white/10",
        secondary:
            "bg-coral text-white hover:bg-coral-dark font-sans font-bold uppercase tracking-widest shadow-sm",
        outline:
            "bg-transparent border border-black/10 dark:border-white/10 text-white hover:bg-white hover:text-black font-sans font-bold uppercase tracking-widest",
        ghost: "text-white hover:bg-white/5 font-sans font-bold uppercase tracking-widest",
        danger: "bg-red-600 text-white hover:bg-red-700 font-sans font-bold uppercase tracking-widest shadow-sm",
    };

    const sizeClasses = {
        sm: "px-4 py-2 text-[10px] rounded-full",
        md: "px-6 py-2.5 text-[11px] rounded-full",
        lg: "px-8 py-3.5 text-[13px] rounded-full",
        icon: "p-2 rounded-full aspect-square",
    };

    return (
        <motion.button
            className={cn(
                "flex flex-row items-center justify-center gap-2 whitespace-nowrap leading-none transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed",
                variantClasses[variant],
                sizeClasses[size],
                className
            )}
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ y: 0, scale: 0.98 }}
            {...props}
        >
            {children}
        </motion.button>
    );
}




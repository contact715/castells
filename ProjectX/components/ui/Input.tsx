import { twMerge } from "tailwind-merge";
import { InputHTMLAttributes, memo } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    variant?: "default" | "filled";
}

/**
 * Thalassa-style Input Component
 * Clean, light inputs with subtle borders
 */
export const Input = memo(function Input({ className, variant = "default", ...props }: InputProps) {
    const variants = {
        default: "bg-white border-gray-200 focus:border-primary focus:ring-primary/20",
        filled: "bg-gray-50 border-gray-100 focus:border-primary focus:ring-primary/20",
    };

    return (
        <input
            className={twMerge(
                "flex w-full rounded-inner px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 border focus:outline-none focus:ring-2 transition-all duration-200",
                variants[variant],
                className
            )}
            {...props}
        />
    );
});

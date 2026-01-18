
import { twMerge } from "tailwind-merge";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export function Input({ className, ...props }: InputProps) {
    return (
        <input
            className={twMerge(
                "flex w-full rounded-input bg-black/5 dark:bg-white/5 px-4 py-2 text-sm text-text-primary dark:text-white placeholder:text-text-secondary/50 dark:placeholder:text-white/30 border border-black/5 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-300 font-sans",
                className
            )}
            {...props}
        />
    );
}

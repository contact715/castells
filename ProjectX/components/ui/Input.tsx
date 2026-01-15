
import { twMerge } from "tailwind-merge";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export function Input({ className, ...props }: InputProps) {
    return (
        <input
            className={twMerge(
                "flex w-full rounded-full bg-black/5 dark:bg-white/5 px-5 py-2.5 text-[14px] text-text-primary dark:text-white placeholder:text-text-secondary/40 dark:placeholder:text-white/20 border border-black/5 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral/30 transition-all duration-300 font-sans",
                className
            )}
            {...props}
        />
    );
}

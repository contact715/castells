import { twMerge } from "tailwind-merge";
import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> { }

export function Select({ className, children, ...props }: SelectProps) {
    return (
        <select
            className={twMerge(
                "flex w-full rounded-[2rem] bg-black/10 dark:bg-black/30 px-4 py-3 text-base text-text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-coral/20 transition-all duration-300 font-sans cursor-pointer",
                className
            )}
            {...props}
        >
            {children}
        </select>
    );
}

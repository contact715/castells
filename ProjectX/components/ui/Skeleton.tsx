"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
 className?: string;
 variant?: "text" | "circular" | "rectangular";
 width?: string | number;
 height?: string | number;
}

export function Skeleton({
 className,
 variant = "rectangular",
 width,
 height,
}: SkeletonProps) {
 const variantClasses = {
  text: "rounded",
  circular: "rounded-full",
  rectangular: "rounded-[2rem]",
 };

 return (
  <div
   className={cn(
    "animate-pulse bg-black/5 dark:bg-dark-surface/50",
    variantClasses[variant],
    className
   )}
   style={{ width, height }}
  />
 );
}

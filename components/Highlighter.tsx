import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface HighlighterProps {
  children: React.ReactNode;
  className?: string;
  action?: "highlight" | "underline";
  color?: string;
}

export const Highlighter: React.FC<HighlighterProps> = ({
  children,
  className,
  action = "highlight",
  color = "#E08576",
}) => {
  return (
    <span className={cn("relative inline-block", className)}>
      <span className="relative z-10">{children}</span>
      {action === "highlight" && (
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ backgroundColor: color }}
          className="absolute inset-0 -z-0 h-full w-full origin-left -skew-y-1 rounded-md opacity-30"
        />
      )}
      {action === "underline" && (
        <motion.span
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }}
          style={{ backgroundColor: color }}
          className="absolute bottom-1 left-0 h-[0.25em] rounded-full opacity-40 -z-10"
        />
      )}
    </span>
  );
};

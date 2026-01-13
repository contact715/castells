"use client";

import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionProps {
 title: string;
 children: ReactNode;
 defaultOpen?: boolean;
 icon?: ReactNode;
 className?: string;
 variant?: "default" | "compact";
}

export function Accordion({
 title,
 children,
 defaultOpen = false,
 icon,
 className,
 variant = "default",
}: AccordionProps) {
 const [isOpen, setIsOpen] = useState(defaultOpen);

 return (
  <div
   className={cn(
    "rounded-[2rem] bg-white dark:bg-[#2A2A2A] overflow-hidden transition-all duration-300",
    className
   )}
  >
   <button
    onClick={() => setIsOpen(!isOpen)}
    className={cn(
     "w-full flex items-center justify-between p-6 text-left transition-all duration-300 hover:bg-bhover:bg-black/5 dark:bg-dark-surface/50",
     variant === "compact" && "p-4"
    )}
   >
    <div className="flex items-center gap-3">
     {icon && <div className="text-coral">{icon}</div>}
     <h3 className="text-xl font-display font-semibold text-text-primary dark:text-white">
      {title}
     </h3>
    </div>
    <motion.div
     animate={{ rotate: isOpen ? 180 : 0 }}
     transition={{ duration: 0.3 }}
    >
     <ChevronDown className="w-5 h-5 text-text-secondary dark:text-white/70" />
    </motion.div>
   </button>

   <AnimatePresence>
    {isOpen && (
     <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
     >
      <div
       className={cn(
        "px-6 pb-6 ",
        variant === "compact" && "px-4 pb-4"
       )}
      >
       {children}
      </div>
     </motion.div>
    )}
   </AnimatePresence>
  </div>
 );
}

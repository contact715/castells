"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
 isOpen: boolean;
 onClose: () => void;
 title?: string;
 children: ReactNode;
 className?: string;
 size?: "sm" | "md" | "lg" | "xl" | "fullscreen";
 footer?: ReactNode;
}

export function Modal({
 isOpen,
 onClose,
 title,
 children,
 className,
 size = "md",
 footer,
}: ModalProps) {
 useEffect(() => {
  if (isOpen) {
   document.body.style.overflow = "hidden";
  } else {
   document.body.style.overflow = "unset";
  }
  return () => {
   document.body.style.overflow = "unset";
  };
 }, [isOpen]);

 const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  fullscreen: "max-w-[95vw] max-h-[95vh]",
 };

 return (
  <AnimatePresence>
   {isOpen && (
    <div
     className="fixed inset-0 z-50 flex items-center justify-center p-4"
     onClick={onClose}
    >
     <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-bblack/60 backdrop-blur-sm"
     />
     <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
       "relative z-50 bg-white dark:bg-[#2A2A2A] rounded-[2rem] shadow-2xl flex flex-col",
       size === "fullscreen" ? "w-full h-full" : "w-full",
       sizeClasses[size],
       className
      )}
      onClick={(e) => e.stopPropagation()}
     >
      {(title || true) && (
       <div className="flex items-center justify-between p-6 ">
        {title && (
         <h2 className="text-xl font-display font-semibold text-text-primary dark:text-white">
          {title}
         </h2>
        )}
        <Button
         variant="ghost"
         size="sm"
         onClick={onClose}
         className={title ? "ml-auto" : "ml-auto"}
        >
         <X className="w-5 h-5" />
        </Button>
       </div>
      )}
      <div className={cn("p-6", size === "fullscreen" && "flex-1 overflow-y-auto")}>
       {children}
      </div>
      {footer && (
       <div className="p-6 ">
        {footer}
       </div>
      )}
     </motion.div>
    </div>
   )}
  </AnimatePresence>
 );
}


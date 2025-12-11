
import React, { useState, useRef } from "react";
import { m as motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { Menu as MenuIcon, X, ChevronDown } from "lucide-react";

interface NavbarProps {
  children?: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children?: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavProps {
  children?: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavMenuProps {
  children?: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 20);
  });

  return (
    <div
      className={cn("fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as any, { visible })
          : child
      )}
    </div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      layout
      initial={{ width: "100%", maxWidth: "100%", y: 0, borderRadius: "0px" }}
      animate={{
        width: "100%",
        maxWidth: "100%",
        y: 0,
        borderRadius: "0px",
        paddingRight: "0px",
        paddingLeft: "0px",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
      }}
      className={cn(
        "pointer-events-auto hidden lg:block relative bg-ivory dark:bg-black border-b border-black/5 dark:border-white/10 py-4 overflow-visible z-50",
        className
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {children}
      </div>
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      initial={{ width: "calc(100% - 2rem)", y: 16, borderRadius: "12px" }}
      animate={{
        width: visible ? "95%" : "calc(100% - 2rem)",
        y: visible ? 10 : 16,
        borderRadius: "12px",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
      }}
      className={cn(
        "pointer-events-auto lg:hidden relative flex flex-col bg-ivory/90 dark:bg-black/90 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-sm px-4 py-3",
        visible && "shadow-lg",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-row items-center justify-between", className)}>
      {children}
    </div>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className="p-1">
      {isOpen ? (
        <X className="w-6 h-6 text-text-primary" />
      ) : (
        <MenuIcon className="w-6 h-6 text-text-primary" />
      )}
    </button>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "overflow-hidden border-t border-black/5 dark:border-white/5 mt-2",
            className
          )}
        >
          <div className="py-4 flex flex-col gap-4">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileAccordion = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex flex-col gap-2", className)}>{children}</div>;
};

export const MobileAccordionItem = ({
  title,
  children,
  isOpen,
  onToggle,
}: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="border border-black/5 dark:border-white/5 rounded-xl overflow-hidden bg-white/50 dark:bg-white/5">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-4 text-left font-display font-bold text-lg text-text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      >
        {title}
        <ChevronDown
          className={cn(
            "w-5 h-5 text-text-secondary transition-transform duration-300",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 flex flex-col gap-3 border-t border-black/5 dark:border-white/5 bg-black/5 dark:bg-black/20">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

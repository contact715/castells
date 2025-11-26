
import React, { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { Menu as MenuIcon, X } from "lucide-react";

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
      initial={{ width: "95%", maxWidth: "1400px", y: 24, borderRadius: "12px" }}
      animate={{
        width: "95%",
        maxWidth: visible ? "1050px" : "1400px",
        y: visible ? 12 : 24,
        borderRadius: "12px",
        paddingRight: visible ? "12px" : "24px",
        paddingLeft: visible ? "12px" : "24px",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
      }}
      className={cn(
        "pointer-events-auto hidden lg:flex relative items-center justify-between bg-ivory/90 dark:bg-black/90 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-sm py-2",
        visible && "shadow-lg",
        className
      )}
    >
      {children}
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

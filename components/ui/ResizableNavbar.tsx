
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
        "pointer-events-auto hidden lg:block relative py-4 overflow-visible z-50 transition-[background-color,backdrop-filter,border-color] duration-300",
        visible
          ? "bg-ivory/80 dark:bg-[#191919]/80 backdrop-blur-md border-b border-black/5 dark:border-white/10"
          : "bg-ivory dark:bg-[#191919]",
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
        "pointer-events-auto lg:hidden relative flex flex-col bg-ivory/90 dark:bg-[#191919]/90 backdrop-blur-md px-4 py-3",
        visible && "",
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
    <button onClick={onClick} className="p-2.5" aria-label={isOpen ? 'Close menu' : 'Open menu'}>
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
            "overflow-hidden mt-2",
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

/*
  Здесь жили MobileAccordion и MobileAccordionItem — раскрывающиеся списки в
  мобильном меню. Меню переписано 23 августа: пять разделов без вложенности,
  вложенные пункты вели на несуществующие якоря. Компоненты больше никем не
  используются.
*/


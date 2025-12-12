
import React from "react";
import { m as motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { PageView } from "../../App";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

import { ChevronDown } from "lucide-react";

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative group/menu-item">
      <motion.div
        transition={{ duration: 0.3 }}
        className={cn(
          "cursor-pointer transition-all font-medium text-sm flex items-center gap-1 px-3 py-2",
          active === item
            ? "text-black dark:text-white"
            : "text-text-secondary hover:text-black dark:hover:text-white"
        )}
      >
        {item}
        {children && (
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-300",
              active === item ? "rotate-180" : "rotate-0"
            )}
          />
        )}
      </motion.div>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_0.5rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white dark:bg-[#191919] backdrop-blur-sm rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
  className,
}: {
  setActive: (item: string | null) => void;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className={cn(
        "relative flex justify-center px-4 py-2 space-x-4",
        className
      )}
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
  onClick,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
  onClick?: (e: React.MouseEvent) => void;
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className="flex space-x-4 group/product min-w-[300px] p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
    >
      <div className="relative flex-shrink-0">
        <img
          src={src}
          width={120}
          height={70}
          alt={title}
          className="flex-shrink-0 rounded-md shadow-sm object-cover h-[70px] w-[120px]"
        />
        <div className="absolute inset-0 bg-black/0 group-hover/product:bg-black/10 transition-colors rounded-md" />
      </div>
      <div>
        <h4 className="text-lg font-display font-bold mb-1 text-text-primary group-hover/product:text-coral transition-colors">
          {title}
        </h4>
        <p className="text-text-secondary text-xs max-w-[10rem] leading-relaxed">
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({
  children,
  href,
  onClick,
  icon: Icon,
  className
}: {
  children?: React.ReactNode;
  href: string;
  onClick?: (e: React.MouseEvent) => void;
  icon?: React.ElementType;
  className?: string;
  key?: React.Key;
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn("text-text-secondary hover:text-coral transition-colors text-base font-medium flex items-center gap-2 group", className)}
    >
      {Icon && <Icon className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />}
      {children}
    </a>
  );
};

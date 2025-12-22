
import React, { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";
import SpotlightCard from "./SpotlightCard";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

const BentoGrid: React.FC<BentoGridProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

const BentoCard: React.FC<BentoCardProps> = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}) => {
  return (
    <SpotlightCard
      spotlightColor="rgba(224, 133, 118, 0.15)"
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-[2rem]",
        // Light styles: White background, subtle         "bg-white  -black/5 transition-all duration-500 hover:-translate-y-1",
        // Dark styles
        "dark:bg-white/5 dark:-white/10",
        className,
      )}
    >
      {/* Optional Background Element */}
      {background && <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-10 transition-opacity duration-500">{background}</div>}

      <div className="relative z-10 flex flex-col h-full p-8 pointer-events-none">

        {/* Header: Icon */}
        <div className="mb-6">
          <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center text-text-primary group-hover:bg-coral group-hover:text-white transition-colors duration-300">
            <Icon className="w-6 h-6 stroke-[1.5]" />
          </div>
        </div>

        {/* Content: Title & Desc */}
        <div>
          <h3 className="font-display text-2xl font-semibold text-text-primary mb-3 leading-tight group-hover:text-coral transition-colors duration-300">
            {name}
          </h3>
          <p className="text-text-secondary text-base leading-relaxed font-light opacity-90">
            {description}
          </p>
        </div>

        {/* Footer: Action Icon (Absolute Bottom Right) */}
        <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="w-10 h-10 rounded-[2rem] bg-black text-white dark:bg-white dark:text-black flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
};

export { BentoCard, BentoGrid };
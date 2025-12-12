import React from "react";
import { m as motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "./Button";
import { cn } from "../../lib/utils";
import type { CaseStudy } from "../../constants";

export type CaseStudyTOCItem = { id: string; label: string };

export function buildCaseStudyTOC(data: CaseStudy): CaseStudyTOCItem[] {
  const toc: CaseStudyTOCItem[] = [{ id: "overview", label: "Overview" }];
  if (data.results?.length) toc.push({ id: "results", label: "Results" });
  if (data.challenge) toc.push({ id: "challenge", label: "Challenge" });
  if (data.solution) toc.push({ id: "solution", label: "Solution" });
  return toc;
}

export const CaseStudyPageShell = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "bg-ivory dark:bg-[#191919] text-text-primary min-h-screen pt-32 pb-20",
      className
    )}
  >
    {children}
  </div>
);

export const CaseStudySurfaceCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "bg-surface rounded-2xl border border-black/5 dark:border-white/10 shadow-sm",
      className
    )}
  >
    {children}
  </div>
);

export const CaseStudySectionCard = ({
  id,
  title,
  icon,
  children,
  className,
}: {
  id: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => (
  <section id={id}>
    <CaseStudySurfaceCard className={cn("p-8", className)}>
      <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-3 text-text-primary">
        {icon}
        {title}
      </h2>
      {children}
    </CaseStudySurfaceCard>
  </section>
);

export const CaseStudyStatCard = ({
  value,
  label,
  growth,
}: {
  value: string;
  label: string;
  growth: string;
}) => (
  <div className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl p-5">
    <div className="font-display text-3xl font-bold text-text-primary mb-1">
      {value}
    </div>
    <div className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
      {label}
      <span className="text-coral bg-coral/10 px-1.5 py-0.5 rounded text-[10px]">
        {growth}
      </span>
    </div>
  </div>
);

export const CaseStudyHero = ({
  data,
  onViewLive,
}: {
  data: CaseStudy;
  onViewLive?: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="relative w-full h-[400px] rounded-[2rem] overflow-hidden mb-12 group cursor-pointer"
  >
    <div className="absolute inset-0 bg-black">
      <img
        src={data.image}
        alt={data.client}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
    </div>

    <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-10">
      <div className="flex justify-between items-start">
        <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-white text-xs font-bold uppercase tracking-widest">
          {data.year} — {data.industry}
        </div>
        <Button
          size="sm"
          variant="outline-white"
          className="backdrop-blur-md flex items-center gap-2"
          onClick={onViewLive}
        >
          View Live <ExternalLink className="w-3 h-3" />
        </Button>
      </div>

      <div>
        <h1 className="font-display text-4xl md:text-6xl font-medium text-white mb-3 tracking-tight leading-none">
          {data.client}
        </h1>
        <div className="flex flex-wrap gap-2">
          {data.services?.map((s: string) => (
            <span
              key={s}
              className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl text-white/80 text-xs font-medium"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

export const CaseStudySidebarCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <CaseStudySurfaceCard className="p-5">
    <h3 className="font-bold text-[10px] uppercase tracking-widest text-text-secondary mb-3">
      {title}
    </h3>
    {children}
  </CaseStudySurfaceCard>
);

export const CaseStudyTestimonialCard = ({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) => (
  <CaseStudySurfaceCard className="p-8 md:p-10 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-coral/10 rounded-full blur-3xl" />
    <div className="relative z-10">
      <div className="text-coral text-5xl font-serif leading-none mb-4">"</div>
      <blockquote className="font-display text-xl md:text-2xl font-medium leading-relaxed mb-6 text-text-primary">
        {quote}
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-text-primary font-bold text-sm">
          {author.charAt(0)}
        </div>
        <div>
          <cite className="not-italic font-bold text-text-primary text-sm block">
            {author}
          </cite>
          <span className="text-text-secondary text-xs">{role}</span>
        </div>
      </div>
    </div>
  </CaseStudySurfaceCard>
);


"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./Button";
import { cn } from "../../lib/utils";

export type ScrollTimelineEntry = {
  icon: React.ComponentType<{ className?: string }>;
  year: string;
  title: string;
  description: string;
  items?: string[];
  image?: string;
  button?: {
    url: string;
    text: string;
  };
};

export interface ScrollTimelineProps {
  title?: string;
  description?: string;
  entries?: ScrollTimelineEntry[];
  className?: string;
}

/**
 * Scroll-activated timeline component.
 * Only the card that is currently centered in the viewport is "open".
 * As you scroll, the active card expands to reveal its full content. Others stay collapsed.
 */
export default function ScrollTimeline({
  title = "Our Journey",
  description = "A timeline of our growth and milestones.",
  entries = [],
  className,
}: ScrollTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Create stable setters for refs inside map
  const setItemRef = (el: HTMLDivElement | null, i: number) => {
    itemRefs.current[i] = el;
  };
  const setSentinelRef = (el: HTMLDivElement | null, i: number) => {
    sentinelRefs.current[i] = el;
  };

  useEffect(() => {
    if (!sentinelRefs.current.length) return;

    // We observe small sentinels placed near the title of each card. Whichever
    // sentinel is closest to the vertical center of the viewport becomes active.
    // Using IntersectionObserver to track visibility + a rAF loop to pick the closest.

    let frame = 0;
    const updateActiveByProximity = () => {
      frame = requestAnimationFrame(updateActiveByProximity);
      // Compute distance of each sentinel to viewport center (use 1/3 from top for better UX)
      const centerY = window.innerHeight / 3;
      let bestIndex = 0;
      let bestDist = Infinity;
      sentinelRefs.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      if (bestIndex !== activeIndex && bestIndex < entries.length) {
        setActiveIndex(bestIndex);
      }
    };

    frame = requestAnimationFrame(updateActiveByProximity);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex, entries.length]);

  // Optional: ensure the first card is active on mount
  useEffect(() => {
    setActiveIndex(0);
  }, []);

  if (!entries.length) return null;

  return (
    <section className={cn("py-20", className)}>
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl mb-16">
          <h2 className="mb-4 font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary dark:text-white tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="mb-6 text-lg text-text-secondary dark:text-white/70 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl space-y-16 md:mt-24 md:space-y-24">
          {/* Vertical Progress Line - Sticky with smooth animation */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-1 pointer-events-none z-0">
            <div className="absolute inset-0 w-full bg-black/5 dark:bg-white/10 rounded-full" />
            <div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-coral via-coral/80 to-coral/40 rounded-full transition-all duration-700 ease-out"
              style={{ 
                height: `${((activeIndex + 1) / entries.length) * 100}%`,
                transformOrigin: 'top'
              }}
            />
          </div>

          {entries.map((entry, index) => {
            const isActive = index === activeIndex;
            const Icon = entry.icon;

            return (
              <div
                key={index}
                className="relative flex flex-col gap-4 md:flex-row md:gap-16"
                ref={(el) => setItemRef(el, index)}
                aria-current={isActive ? "true" : "false"}
              >
                {/* Sticky meta column with year */}
                <div className="top-8 flex h-min w-64 shrink-0 items-center gap-4 md:sticky relative z-10">
                  <div className="flex items-center gap-3">
                    {/* Year Circle */}
                    <div className={cn(
                      "w-20 h-20 rounded-full flex items-center justify-center font-display text-xl font-bold transition-all duration-300 relative",
                      isActive 
                        ? "bg-coral text-white shadow-lg shadow-coral/50 scale-110 ring-4 ring-coral/20" 
                        : "bg-coral/10 dark:bg-coral/20 text-coral border-2 border-coral/20 dark:border-coral/30"
                    )}>
                      {entry.year}
                    </div>
                    <div className="flex flex-col">
                      <span className={cn(
                        "text-sm font-semibold transition-colors",
                        isActive ? "text-text-primary dark:text-white" : "text-text-secondary dark:text-white/60"
                      )}>
                        {entry.title}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Invisible sentinel near the card title to measure proximity to viewport center */}
                <div
                  ref={(el) => setSentinelRef(el, index)}
                  aria-hidden
                  className="absolute -top-24 left-0 h-12 w-12 opacity-0"
                />

                {/* Content column */}
                <article
                  className={cn(
                    "flex flex-col rounded-2xl border p-6 md:p-8 transition-all duration-300 flex-1",
                    isActive
                      ? "border-coral/30 dark:border-coral/40 bg-white dark:bg-[#191919] shadow-xl"
                      : "border-black/5 dark:border-white/10 bg-white/50 dark:bg-[#191919]/50"
                  )}
                >
                  {entry.image && (
                    <img
                      src={entry.image}
                      alt={`${entry.title} visual`}
                      className="mb-6 w-full h-64 rounded-lg object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={cn(
                        "p-3 rounded-xl transition-colors",
                        isActive 
                          ? "bg-coral/10 dark:bg-coral/20" 
                          : "bg-coral/5 dark:bg-coral/10"
                      )}>
                        <Icon className={cn(
                          "h-6 w-6 transition-colors",
                          isActive ? "text-coral" : "text-coral/60"
                        )} />
                      </div>
                      <div className="space-y-2 flex-1">
                        <h3
                          className={cn(
                            "font-display text-xl md:text-2xl font-semibold leading-tight tracking-tight transition-colors duration-200",
                            isActive ? "text-text-primary dark:text-white" : "text-text-primary/70 dark:text-white/70"
                          )}
                        >
                          {entry.title}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p
                      className={cn(
                        "text-base leading-relaxed transition-all duration-300",
                        isActive 
                          ? "text-text-secondary dark:text-white/80 line-clamp-none" 
                          : "text-text-secondary/80 dark:text-white/60 line-clamp-3"
                      )}
                    >
                      {entry.description}
                    </p>

                    {/* Enhanced expandable content */}
                    <div
                      aria-hidden={!isActive}
                      className={cn(
                        "grid transition-all duration-500 ease-out",
                        isActive 
                          ? "grid-rows-[1fr] opacity-100" 
                          : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-4 pt-4">
                          {entry.items && entry.items.length > 0 && (
                            <div className="rounded-xl border border-black/5 dark:border-white/10 bg-coral/5 dark:bg-coral/10 p-6">
                              <ul className="space-y-3">
                                {entry.items.map((item, itemIndex) => (
                                  <li 
                                    key={itemIndex} 
                                    className="flex items-start gap-3 text-sm text-text-secondary dark:text-white/80"
                                  >
                                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-coral flex-shrink-0" />
                                    <span className="leading-relaxed">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {entry.button && (
                            <div className="flex justify-end">
                              <Button 
                                variant="primary"
                                size="sm"
                                href={entry.button.url}
                                className="group"
                                as="a"
                              >
                                {entry.button.text} 
                                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}



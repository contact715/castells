"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./Button";
import { cn } from "../../lib/utils";

export type ScrollTimelineEntry = {
  icon: React.ComponentType<{ className?: string }>;
  year: string;
  title: string;
  description: string;
  items?: string[];
  image?: string;
  video?: string;
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
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set([0]));
  const sectionRef = useRef<HTMLElement | null>(null);
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

    // Use IntersectionObserver to track which card is "active" based on its position in the viewport.
    // We target a specific "hot zone" (around 1/3 from the top) to trigger the expand effect.
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0% -60% 0%', // Trigger when card enters the top-middle part of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sentinelRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1 && index !== activeIndex) {
            setActiveIndex(index);
            // Mark this and all previous indices as expanded
            setExpandedIndices((prev) => {
              const newSet = new Set(prev);
              for (let i = 0; i <= index; i++) {
                newSet.add(i);
              }
              return newSet;
            });
          }
        }
      });
    }, observerOptions);

    sentinelRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [entries.length]);

  // Optional: ensure the first card is active on mount
  useEffect(() => {
    setActiveIndex(0);
  }, []);


  if (!entries.length) return null;

  return (
    <section
      ref={sectionRef}
      className={cn("py-20 relative overflow-hidden", className)}
    >
      {/* Gradient Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-coral/15 to-transparent blur-3xl"
          style={{ top: '10%', left: '-10%' }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-500/10 to-transparent blur-3xl"
          style={{ bottom: '10%', right: '-5%' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mx-auto max-w-3xl mb-16">
          <motion.h2
            className="mb-4 font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary dark:text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              className="mb-6 text-lg text-text-secondary dark:text-white/70 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>

      {/* Full width timeline container */}
      <div className="w-full relative z-10">
        <div className="container mx-auto px-6">
          <div className="relative mt-16 space-y-16 md:mt-24 md:space-y-24">
            {/* Vertical Timeline Line - Redesigned with nodes */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-1 pointer-events-none z-0">
              {/* Background line - dashed style */}
              <div className="absolute inset-0 w-full flex flex-col items-center">
                <div
                  className="w-0.5 bg-gradient-to-b from-transparent via-black/10 dark:via-white/20 to-transparent"
                  style={{ height: '100%' }}
                />
              </div>

              {/* Active progress line with gradient */}
              <div
                className="absolute top-0 left-0 w-full transition-all duration-700 ease-out"
                style={{
                  height: `${((activeIndex + 1) / entries.length) * 100}%`,
                  transformOrigin: 'top'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-coral via-coral/60 to-coral/30 rounded-full" />
              </div>
            </div>

            {entries.map((entry, index) => {
              const isActive = index === activeIndex;
              const isExpanded = expandedIndices.has(index);
              const Icon = entry.icon;

              return (
                <div
                  key={index}
                  className="relative flex flex-col gap-4 md:flex-row md:gap-16"
                  ref={(el) => setItemRef(el, index)}
                  aria-current={isActive ? "true" : "false"}
                >
                  {/* Sticky meta column with year */}
                  <div className="top-8 flex h-min w-48 md:w-64 shrink-0 items-center gap-4 md:sticky relative z-10">
                    <div className="flex items-center gap-3">
                      {/* Year Square with pulse effect */}
                      <motion.div
                        className={cn(
                          "w-20 h-20 rounded-[2rem] flex items-center justify-center font-display text-xl font-bold transition-all duration-300 relative",
                          isActive
                            ? "bg-coral text-white scale-110 ring-4 ring-coral/20"
                            : "bg-coral/10 dark:bg-coral/20 text-coral -2 -coral/20 dark:-coral/30"
                        )}
                        whileHover={{ scale: 1.05 }}
                        animate={isActive ? {
                          boxShadow: [
                            '0 0 0 0 rgba(255, 107, 91, 0.4)',
                            '0 0 0 10px rgba(255, 107, 91, 0)',
                          ],
                        } : {}}
                        transition={{
                          boxShadow: {
                            duration: 2,
                            repeat: Infinity,
                          },
                        }}
                      >
                        {/* Pulse rings for active state */}
                        {isActive && (
                          <>
                            <motion.div
                              className="absolute inset-0 rounded-[2rem] bg-coral/30"
                              animate={{
                                scale: [1, 1.3, 1.3],
                                opacity: [0.5, 0, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                              }}
                            />
                            <motion.div
                              className="absolute inset-0 rounded-[2rem] bg-coral/20"
                              animate={{
                                scale: [1, 1.5, 1.5],
                                opacity: [0.3, 0, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: 0.3,
                              }}
                            />
                          </>
                        )}
                        <span className="relative z-10">{entry.year}</span>
                      </motion.div>
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
                  <motion.article
                    className={cn(
                      "flex flex-col rounded-[2rem] transition-all duration-500 flex-1 relative overflow-hidden min-h-[400px]",
                      isActive
                        ? (entry.image || entry.video)
                          ? "-coral/30 dark:-coral/40 scale-100"
                          : "-coral/30 dark:-coral/40 bg-white dark:bg-[#191919] scale-100"
                        : (entry.image || entry.video)
                          ? "-black/5 dark:-white/10"
                          : "-black/5 dark:-white/10 bg-white dark:bg-[#191919]"
                    )}
                    whileHover={isActive ? { y: -4 } : {}}
                  >
                    {/* Background Image/Video */}
                    {(entry.image || entry.video) && (
                      <div className="absolute inset-0 bg-black">
                        {entry.video ? (
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            poster={entry.image}
                            className="w-full h-full object-cover opacity-70 transition-opacity duration-700"
                          >
                            <source src={entry.video} type="video/mp4" />
                          </video>
                        ) : (
                          <img
                            src={entry.image}
                            alt={`${entry.title} visual`}
                            className="w-full h-full object-cover opacity-70 transition-opacity duration-700"
                            loading="lazy"
                          />
                        )}
                      </div>
                    )}

                    {/* Content Overlay with Blur Background */}
                    {(entry.image || entry.video) ? (
                      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
                        {/* Gradient Blur Layer - only at bottom with gradient from top (0%) to bottom (100%) */}
                        <div
                          className="absolute bottom-0 left-0 right-0"
                          style={{
                            height: '60%',
                            backdropFilter: 'blur(40px)',
                            WebkitBackdropFilter: 'blur(40px)',
                            maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
                            pointerEvents: 'none',
                          }}
                        />

                        <div className="relative z-10 flex flex-col justify-between h-full">
                          {/* Header */}
                          <div className="flex items-center gap-4 mb-4">
                            <div className={cn(
                              "p-3 rounded-xl transition-colors group/icon",
                              isActive
                                ? "bg-white/10 dark:bg-white/10"
                                : "bg-white/5 dark:bg-white/5"
                            )}>
                              <Icon className={cn(
                                "h-6 w-6 transition-colors",
                                isActive ? "text-white group-hover/icon:text-white" : "text-white/40 group-hover/icon:text-white/60"
                              )} />
                            </div>
                            <div className="space-y-2 flex-1">
                              <h3
                                className={cn(
                                  "font-display text-xl md:text-2xl font-semibold leading-tight tracking-tight transition-colors duration-200",
                                  "text-white"
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
                              isExpanded
                                ? "text-white/90 line-clamp-none"
                                : "text-white/80 line-clamp-3"
                            )}
                          >
                            {entry.description}
                          </p>

                          {/* Enhanced expandable content */}
                          <div
                            aria-hidden={!isExpanded}
                            className={cn(
                              "grid transition-[grid-template-rows] duration-500 ease-out",
                              isExpanded
                                ? "grid-rows-[1fr]"
                                : "grid-rows-[0fr]"
                            )}
                          >
                            <div className="overflow-hidden">
                              <div className={cn(
                                "space-y-4 pt-4 transition-opacity duration-500 ease-out",
                                isExpanded ? "opacity-100" : "opacity-0"
                              )}>
                                {entry.items && entry.items.length > 0 && (
                                  <div
                                    className="rounded-xl p-6 bg-white/10 -white/10"
                                    style={{
                                      backdropFilter: 'blur(12px)',
                                      WebkitBackdropFilter: 'blur(12px)',
                                      transform: 'translateZ(0)',
                                      willChange: 'backdrop-filter',
                                      backfaceVisibility: 'hidden',
                                    }}
                                  >
                                    <ul className="space-y-3">
                                      {entry.items.map((item, itemIndex) => (
                                        <li
                                          key={itemIndex}
                                          className="flex items-start gap-3 text-sm leading-relaxed text-white/90"
                                        >
                                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-coral flex-shrink-0" />
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {entry.button && (
                                  <div className="flex justify-end">
                                    <Button
                                      variant="secondary"
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
                      </div>
                    ) : (
                      <div className="relative p-6 md:p-8 flex flex-col space-y-4">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className={cn(
                            "p-3 rounded-xl transition-colors group/icon",
                            isActive
                              ? "bg-black/5 dark:bg-white/10"
                              : "bg-black/5 dark:bg-white/5"
                          )}>
                            <Icon className={cn(
                              "h-6 w-6 transition-colors",
                              isActive ? "text-text-primary dark:text-white group-hover/icon:text-text-primary dark:group-hover/icon:text-white" : "text-text-secondary dark:text-white/60 group-hover/icon:text-text-primary dark:group-hover/icon:text-white"
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
                            isExpanded
                              ? "text-text-secondary dark:text-white/80 line-clamp-none"
                              : "text-text-secondary/80 dark:text-white/60 line-clamp-3"
                          )}
                        >
                          {entry.description}
                        </p>

                        {/* Enhanced expandable content */}
                        <div
                          aria-hidden={!isExpanded}
                          className={cn(
                            "grid transition-all duration-500 ease-out",
                            isExpanded
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          )}
                        >
                          <div className="overflow-hidden">
                            <div className="space-y-4 pt-4">
                              {entry.items && entry.items.length > 0 && (
                                <div className="rounded-xl -black/5 dark:-white/10 bg-coral/5 dark:bg-coral/10 p-6">
                                  <ul className="space-y-3">
                                    {entry.items.map((item, itemIndex) => (
                                      <li
                                        key={itemIndex}
                                        className="flex items-start gap-3 text-sm text-text-secondary dark:text-white/80 leading-relaxed"
                                      >
                                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-coral flex-shrink-0" />
                                        <span>{item}</span>
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
                    )}

                    {/* Subtle gradient overlay for active cards without image */}
                    {isActive && !entry.image && !entry.video && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-coral/5 via-transparent to-transparent pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}

                    {/* Floating sparkle icons */}
                    {isActive && (
                      <>
                        <motion.div
                          className="absolute top-4 right-4 text-coral/20"
                          animate={{
                            y: [0, -10, 0],
                            opacity: [0.2, 0.4, 0.2],
                            rotate: [0, 180, 360],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                          }}
                        >
                          <Sparkles className="w-4 h-4" />
                        </motion.div>
                        <motion.div
                          className="absolute bottom-4 right-8 text-coral/15"
                          animate={{
                            y: [0, 10, 0],
                            opacity: [0.15, 0.3, 0.15],
                            rotate: [360, 180, 0],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            delay: 1,
                          }}
                        >
                          <Sparkles className="w-3 h-3" />
                        </motion.div>
                      </>
                    )}
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}






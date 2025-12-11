
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { RippleButton } from './RippleButton';
import { BackgroundRippleEffect } from './BackgroundRippleEffect';
import ScrollFloat from './ScrollFloat';
import Counter from './ui/Counter';

const Hero: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    };
    checkTheme();

    // Observer for class changes on HTML element
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
    const Hero = () => {
      const containerRef = useRef<HTMLDivElement>(null);
      const { scrollY } = useScroll();

      const y1 = useTransform(scrollY, [0, 500], [0, 200]);
      const y2 = useTransform(scrollY, [0, 500], [0, -150]);
      const opacity = useTransform(scrollY, [0, 300], [1, 0]);

      return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(224,133,118,0.08),transparent_70%)]" />
            <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-coral/5 blur-3xl animate-float" />
            <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto text-center">

              {/* Badge */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-black/5 shadow-sm mb-8 hover:shadow-md transition-shadow cursor-default"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-coral"></span>
                </span>
                <span className="text-sm font-medium text-text-secondary tracking-wide">
                  Accepting New Clients for Q4 2024
                </span>
              </m.div>

              {/* Headline */}
              <m.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="font-display text-6xl md:text-8xl lg:text-9xl font-medium leading-[0.9] tracking-tight mb-8 text-text-primary"
              >
                Dominate Your <br />
                <span className="relative inline-block">
                  <span className="relative z-10 italic text-coral">Market</span>
                  <m.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.8, ease: "circOut" }}
                    className="absolute bottom-2 left-0 h-[0.15em] bg-coral/20 -z-10 rounded-full"
                  />
                </span>
              </m.h1>

              {/* Subheadline */}
              <m.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-xl md:text-2xl text-text-secondary font-light max-w-2xl mx-auto mb-12 leading-relaxed"
              >
                We build high-velocity growth engines for ambitious brands.
                Data-driven strategy meets world-class creative execution.
              </m.p>

              {/* CTA Buttons */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
              >
                <button className="group relative px-8 py-4 bg-black text-white rounded-full font-bold tracking-wide overflow-hidden transition-transform hover:scale-105 active:scale-95">
                  <span className="relative z-10 flex items-center gap-2">
                    Get Your Audit
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-coral transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                </button>

                <button className="group px-8 py-4 bg-transparent border border-black/10 rounded-full font-bold tracking-wide hover:bg-black/5 transition-colors flex items-center gap-2">
                  <Play className="w-4 h-4 fill-current" />
                  View Case Studies
                </button>
              </m.div>

              {/* Stats */}
              <m.div
                style={{ opacity }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-black/5 pt-12"
              >
                {[
                  { value: 150, suffix: "M+", label: "Revenue Generated", prefix: "$" },
                  { value: 45, suffix: "%", label: "Avg. ROI Increase", prefix: "+" },
                  { value: 85, suffix: "+", label: "Active Clients", prefix: "" },
                  { value: 24, suffix: "/7", label: "Support & Monitoring", prefix: "" },
                ].map((stat, index) => (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-1">
                      <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                      {stat.label}
                    </div>
                  </m.div>
                ))}
              </m.div>

            </div>
          </div>

          {/* Parallax Elements */}
          <m.div style={{ y: y1 }} className="absolute top-[20%] left-[5%] w-24 h-24 hidden lg:block opacity-20 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
              <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="currentColor" />
            </svg>
          </m.div>

          <m.div style={{ y: y2 }} className="absolute bottom-[20%] right-[5%] w-32 h-32 hidden lg:block opacity-10 pointer-events-none">
            <div className="w-full h-full border-2 border-current rounded-full" />
          </m.div>

        </section>
      );
    };

    export default Hero;

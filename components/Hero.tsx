
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
  }, []);

  return (
    <div className="pt-32 pb-20 relative overflow-hidden min-h-[90vh] flex flex-col justify-center bg-transparent">
      {/* Background Ripple Layer */}
      {/* No Z-index negative here to avoid click capture issues in some stacking contexts. 
          DOM order ensures it's behind the content because it's first. 
          The content container below will have pointer-events-none to let clicks pass through to this background. */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto">
        <BackgroundRippleEffect
          rows={30}
          cols={60}
          cellSize={50}
          fillColor={isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(224, 133, 118, 0.3)"}
          borderColor={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(224, 133, 118, 0.6)"}
          maskImage="radial-gradient(ellipse at 50% 0%, black 10%, transparent 70%)"
        />
        {/* Very subtle noise texture overlay for grain. Pointer events none so it doesn't block the ripple clicks. */}
        <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-soft-light pointer-events-none" />
      </div>

      {/* Main Container - pointer-events-none allows clicks to pass through empty spaces to the background */}
      <div className="container mx-auto px-6 relative z-10 pointer-events-none">

        {/* Main Hero Content - Centered Layout */}
        <div className="flex flex-col items-center justify-center text-center mb-20 max-w-5xl mx-auto pointer-events-none">

          {/* Animated Headline */}
          <h1 className="font-display text-6xl md:text-8xl lg:text-[7rem] font-light leading-[1.05] tracking-tight text-text-primary mb-8">
            <ScrollFloat as="span" containerClassName="block pointer-events-auto">We dominate</ScrollFloat>
            <span className="text-coral italic relative inline-block pointer-events-auto">
              <ScrollFloat as="span">local markets</ScrollFloat>
              {/* Subtle underline accent */}
              <motion.svg
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: "circOut" }}
                className="absolute left-0 -bottom-2 w-full h-3 text-coral/20 -z-10"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </motion.svg>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-2xl font-normal mb-12"
          >
            We help contractors and service providers dominate their local markets through data-driven strategies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-24"
          >
            <RippleButton
              href="#audit"
              className="bg-black dark:bg-white text-white dark:text-black px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest border-none h-auto shadow-none hover:shadow-xl transition-all hover:-translate-y-0.5 pointer-events-auto"
              rippleColor="#E08576"
            >
              Start Your Project
            </RippleButton>
            <RippleButton
              href="#contact"
              className="bg-white dark:bg-black border border-black/10 dark:border-white/10 text-text-primary px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest h-auto hover:bg-black/5 dark:hover:bg-white/10 transition-all shadow-none hover:shadow-md pointer-events-auto"
              rippleColor="#E08576"
            >
              <span className="flex items-center gap-2">
                How We Work <ArrowRight className="w-4 h-4" />
              </span>
            </RippleButton>
          </motion.div>

          {/* Stats Strip - Centered below content */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full pointer-events-auto">
            {[
              { value: 500, suffix: '+', label: 'Projects Completed' },
              { value: 50, prefix: '$', suffix: 'M+', label: 'Revenue Generated' },
              { value: 320, suffix: '%', label: 'Average Client ROI' },
              { value: 12, suffix: '+', label: 'Years Experience' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (idx * 0.1), duration: 0.6 }}
                className="bg-transparent p-6 rounded-2xl border border-black/10 dark:border-white/10 hover:border-coral/50 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="font-display text-4xl md:text-5xl font-light text-text-primary mb-2 group-hover:text-coral transition-colors duration-300 tracking-tight">
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest border-t border-black/5 dark:border-white/10 pt-3 mt-2 group-hover:border-coral/30 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;

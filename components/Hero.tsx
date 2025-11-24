
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { RippleButton } from './RippleButton';
import LogoLoop from './LogoLoop';
import { BackgroundRippleEffect } from './BackgroundRippleEffect';
import ScrollFloat from './ScrollFloat';

// SVG Logos for Partners
const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.013-1.133 8.053-3.24 2.08-2.16 2.72-5.2 2.72-7.667 0-.76-.08-1.453-.213-2.173h-10.56z" />
  </svg>
);

const MicrosoftLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
  </svg>
);

const AppleLogo = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.55-1.48 3.77-1.38 4.02-1.36.02 1.71-3.53 3.23-4.02 1.36z" />
    </svg>
);

const MetaLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M16.98 11.93c-1.3 0-2.36.96-2.83 2.47-.54-1.61-2.01-2.47-3.9-2.47-2.6 0-4.32 2.37-4.32 4.63 0 2.11 1.57 4.16 3.96 4.16 2.05 0 3.32-1.32 3.95-3.41.25 1.76 1.83 2.93 3.84 2.93 2.67 0 4.63-2.02 4.63-5.26 0-3.79-2.73-6.52-6.57-6.52-4.13 0-7.39 3.09-7.39 7.42 0 2.55 1.14 4.19 2.53 4.19.92 0 1.59-.72 1.59-1.65 0-.66-.23-1.37-.8-1.37-1.12 0-1.25-1.72-1.25-2.61 0-3.34 2.21-5.71 5.09-5.71 2.36 0 3.64 1.72 3.64 4.54 0 2.31-1.04 3.71-2.5 3.71-.97 0-1.48-.96-1.48-2.15 0-2.58 1.94-3.41 3.25-3.41.87 0 1.54.43 1.54 1.25 0 .91-.84 1.25-1.55 1.25-.49 0-1.16-.14-1.16-.61 0-.31.25-.62.58-.62.24 0 .49.12.49.33 0 .14-.14.24-.26.24-.04 0-.1-.02-.1-.08 0-.03.02-.06.05-.06.27 0 .52.32.52.79 0 .84-1.4 1.48-2.3 1.48-1.57 0-2.22-1.44-2.22-3.14 0-2.2 1.25-3.48 2.57-3.48 1.25 0 1.94.99 1.94 2.27 0 1.63-.7 2.45-1.63 2.45-.61 0-1.07-.36-1.07-.94 0-.58.37-1.15.93-1.15.42 0 .76.28.76.68 0 .34-.23.59-.53.59-.2 0-.41-.12-.41-.33 0-.15.11-.25.26-.25.04 0 .09.02.09.07 0 .03-.02.05-.04.05-.28 0-.55-.37-.55-.86 0-.96 1.42-1.6 2.31-1.6 1.6 0 2.27 1.52 2.27 3.28 0 2.36-1.32 3.84-2.73 3.84-.96 0-1.55-.7-1.55-1.7 0-1.6 1.19-2.26 2.1-2.26.79 0 1.34.46 1.34 1.15 0 .68-.48 1.12-1.08 1.12-.52 0-.91-.32-.91-.79 0-.42.29-.71.64-.71.29 0 .54.18.54.43 0 .18-.14.3-.32.3-.06 0-.13-.03-.13-.09 0-.03.02-.06.06-.06.26 0 .47-.28.47-.64 0-.61-.95-1.07-1.6-1.07-1.16 0-1.68 1.07-1.68 2.51 0 1.76.95 2.76 2.05 2.76.84 0 1.44-.64 1.44-1.52 0-1.04-.7-1.93-1.63-1.93z" />
  </svg>
);

const SpotifyLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const AmazonLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
     <path d="M13.684 12.19c.404-2.616 2.651-2.457 2.651-2.457-1.637-2.673-4.522-2.316-5.185-2.228-3.085.343-3.79 3.016-3.79 3.016s-2.022-.24-2.433 1.353c-.314 1.216-1.268 4.44.898 6.476.99 1.066 3.655 2.052 6.947 1.027 0 0 .546 1.156 2.454 1.077 3.518-.145 5.618-3.837 5.753-4.66.155-.95-1.533-.455-1.64-.176-.713 1.848-2.662 2.769-3.414 2.676-.752-.093-.97-1.134-.97-1.134l-1.27-4.97zm-5.467.892c.162-.977 1.517-2.448 3.593-2.622l.608 2.94c0 0-3.322 1.867-4.201-.318z"/>
     <path d="M21.577 18.28c.18-.755-.386-.715-.386-.715s-.777 1.765-2.583 1.343c-.426-.1-.585-.567-.286-.875.49-.505 2.16-1.238 2.16-1.238s1.658-.336 1.86.755c.204 1.092-.764.73-.764.73z"/>
  </svg>
);

const AdobeLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M15.1 2H24v20L15.1 2zM8.9 2H0v20L8.9 2zM12 9.4L17.6 22h-2.9l-1.3-3.9h-2.9l-1.3 3.9H6.4L12 9.4z" />
  </svg>
);

const TeslaLogo = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 1.5l11.25 10.5h-22.5L12 1.5zm-8.8 11.8L12 5.2l8.8 8.1H3.2zM2.8 14.8h18.4v1.5H2.8v-1.5zm1.5 3h15.4v1.5H4.3v-1.5z"/>
    </svg>
);

const UberLogo = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm7.56 12c0 4.18-3.38 7.56-7.56 7.56S4.44 16.18 4.44 12c0-1.78.61-3.41 1.63-4.72l4.8 6.13h2.26l4.8-6.13c1.02 1.31 1.63 2.94 1.63 4.72zM12 4.44c1.78 0 3.41.61 4.72 1.63l-4.72 6.02-4.72-6.02C8.59 5.05 10.22 4.44 12 4.44z"/>
    </svg>
);

// Define the partner logos
const PARTNER_LOGOS = [
  { node: <GoogleLogo />, title: "Google Partner", href: "#" },
  { node: <MetaLogo />, title: "Meta Business", href: "#" },
  { node: <MicrosoftLogo />, title: "Microsoft", href: "#" },
  { node: <AppleLogo />, title: "Apple", href: "#" },
  { node: <SpotifyLogo />, title: "Spotify", href: "#" },
  { node: <AmazonLogo />, title: "Amazon", href: "#" },
  { node: <AdobeLogo />, title: "Adobe", href: "#" },
  { node: <TeslaLogo />, title: "Tesla", href: "#" },
  { node: <UberLogo />, title: "Uber", href: "#" },
];

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
            maskImage="radial-gradient(ellipse at 50% 0%, black 10%, transparent 60%)"
         />
         {/* Very subtle noise texture overlay for grain. Pointer events none so it doesn't block the ripple clicks. */}
         <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-soft-light pointer-events-none" />
      </div>

      {/* Main Container - pointer-events-none allows clicks to pass through empty spaces to the background */}
      <div className="container mx-auto px-6 relative z-10 pointer-events-none">
        
        {/* Main Hero Content - pointer-events-auto re-enables interaction for actual content */}
        <div className="flex flex-col items-center justify-center text-center mb-24 max-w-5xl mx-auto pointer-events-auto">
             {/* Badge - Solid Opaque */}
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-black text-xs font-bold uppercase tracking-widest mb-8 text-text-primary shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-coral"></span>
              </span>
              Available for new projects
            </motion.div>
            
            {/* Animated Headline */}
            <h1 className="font-display text-6xl md:text-8xl lg:text-[7rem] font-light leading-[1.05] tracking-tight text-text-primary mb-8">
              <ScrollFloat as="span" containerClassName="block">We dominate</ScrollFloat>
              <span className="text-coral italic relative inline-block">
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
              className="flex flex-wrap justify-center gap-4"
            >
              <RippleButton 
                href="#audit" 
                className="bg-black dark:bg-white text-white dark:text-black px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest border-none h-auto shadow-none hover:shadow-xl transition-all hover:-translate-y-0.5"
                rippleColor="#E08576"
              >
                Start Your Project
              </RippleButton>
              <RippleButton 
                href="#contact" 
                className="bg-white dark:bg-black border border-black/10 dark:border-white/10 text-text-primary px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest h-auto hover:bg-black/5 dark:hover:bg-white/10 transition-all shadow-none hover:shadow-md"
                rippleColor="#E08576"
              >
                <span className="flex items-center gap-2">
                  How We Work <ArrowRight className="w-4 h-4" />
                </span>
              </RippleButton>
            </motion.div>
        </div>

        {/* Stats Strip - pointer-events-auto */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20 max-w-7xl mx-auto pointer-events-auto"
        >
          {[
            { value: '500+', label: 'Projects Completed' },
            { value: '$50M+', label: 'Revenue Generated' },
            { value: '320%', label: 'Average Client ROI' },
            { value: '12+', label: 'Years Experience' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-black p-8 rounded-2xl border border-black/5 dark:border-white/5 shadow-none hover:shadow-md transition-all duration-300 group hover:-translate-y-1">
              <div className="font-display text-4xl md:text-5xl font-light text-text-primary mb-2 group-hover:text-coral transition-colors duration-300 tracking-tight text-center">{stat.value}</div>
              <div className="text-xs font-bold text-text-secondary uppercase tracking-widest border-t border-black/5 dark:border-white/5 pt-4 mt-2 group-hover:border-coral/30 transition-colors text-center">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Infinite Logo Loop - pointer-events-auto */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1 }}
          className="pt-16 border-t border-black/5 dark:border-white/5 pointer-events-auto"
        >
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-text-secondary mb-12 opacity-60">Trusted by industry leaders</p>
          
          <div className="relative h-40 overflow-hidden mask-fade-sides opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
             <LogoLoop 
                logos={PARTNER_LOGOS} 
                speed={50} 
                direction="left" 
                logoHeight={48}
                gap={80}
                pauseOnHover={true}
                scaleOnHover={true}
                className="w-full"
             />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;

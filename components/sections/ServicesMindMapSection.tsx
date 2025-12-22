import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { SERVICE_CATEGORIES, type ServiceCategoryId } from '../../data/services';

interface ServicesMindMapSectionProps {
  activeCategory?: ServiceCategoryId;
}

const ServicesMindMapSection: React.FC<ServicesMindMapSectionProps> = ({ 
  activeCategory = 'branding' 
}) => {
  const [hoveredService, setHoveredService] = useState<{
    service: typeof SERVICE_CATEGORIES[0]['items'][0];
    categoryId: ServiceCategoryId;
    x: number;
    y: number;
  } | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<ServiceCategoryId | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate positions using percentages for responsiveness
  const layout = useMemo(() => {
    const centerX = 50; // 50% from left
    const centerY = 50; // 50% from top
    const categoryRadius = 32; // Optimized distance from center for better balance

    // Category angles in degrees - evenly distributed in quadrants
    const categoryAngles: Record<ServiceCategoryId, number> = {
      'branding': 225,      // Bottom-left quadrant
      'development': 315,    // Top-right quadrant
      'automation': 135,    // Bottom-left quadrant
      'advertising': 45,     // Top-right quadrant
    };

    // Service sector configuration - optimized for each category
    // Each sector is positioned to face away from center for better visual flow
    const serviceSectorConfig: Record<ServiceCategoryId, { span: number; offset: number }> = {
      'branding': { span: 100, offset: -50 },      // 100° sector centered away from center
      'development': { span: 100, offset: -50 },   // 100° sector centered away from center
      'automation': { span: 100, offset: -50 },     // 100° sector centered away from center
      'advertising': { span: 100, offset: -50 },   // 100° sector centered away from center
    };

    const categories = SERVICE_CATEGORIES.map((cat) => {
      const angle = categoryAngles[cat.id];
      const angleRad = (angle * Math.PI) / 180;
      
      // Calculate category position
      const catX = centerX + Math.cos(angleRad) * categoryRadius;
      const catY = centerY + Math.sin(angleRad) * categoryRadius;

      // Calculate service positions around category with optimal distribution
      const baseServiceRadius = 24; // Optimal distance from category
      const totalServices = Math.min(cat.items.length, 6);
      const config = serviceSectorConfig[cat.id];
      
      // Create a structured sector facing away from center
      const sectorStartAngle = angle + config.offset;
      const sectorSpan = config.span;
      
      // Calculate optimal step for even spacing with minimum gap
      const minAngleStep = 17; // Minimum 17 degrees between services for readability
      const calculatedStep = totalServices > 1 ? sectorSpan / (totalServices - 1) : 0;
      const step = Math.max(calculatedStep, minAngleStep);
      
      // Center the services in the sector for balanced look
      const totalSpan = step * (totalServices - 1);
      const adjustedStartAngle = sectorStartAngle - (totalSpan - sectorSpan) / 2;
      
      const services = cat.items.slice(0, 6).map((service, idx) => {
        // Calculate angle within the sector with optimal distribution
        const serviceAngle = adjustedStartAngle + idx * step;
        const serviceAngleRad = (serviceAngle * Math.PI) / 180;
        
        // Consistent radius for all services - clean and structured
        const serviceX = catX + Math.cos(serviceAngleRad) * baseServiceRadius;
        const serviceY = catY + Math.sin(serviceAngleRad) * baseServiceRadius;

        return {
          ...service,
          x: serviceX,
          y: serviceY,
          angle: serviceAngle,
        };
      });

      return {
        ...cat,
        x: catX,
        y: catY,
        angle,
        services,
      };
    });

    return { centerX, centerY, categories };
  }, []);

  // Logo component for center node
  const CenterLogo: React.FC<{ className?: string }> = ({ className }) => {
    return (
      <motion.img
        src="/castells-logo.png"
        alt="Castells Logo"
        className={cn("w-12 h-12 md:w-14 md:h-14 object-contain brightness-0 dark:brightness-0 dark:invert", className)}
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 360] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    );
  };

  return (
    <section className="pt-12 md:pt-16 pb-24 md:pb-32 bg-[#191919] dark:bg-[#191919] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-[600px] md:h-[700px] max-w-7xl mx-auto"
        >
          {/* SVG Layer for Connection Lines */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <style>{`
                .connection-line {
                  stroke: rgba(255, 255, 255, 0.5);
                  stroke-width: 2.5;
                  fill: none;
                  stroke-linecap: round;
                }
                .connection-line-active {
                  stroke: rgba(255, 255, 255, 0.85);
                  stroke-width: 3;
                }
              `}</style>
              {/* Enhanced gradients for pulse effect */}
              <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E08576" stopOpacity="0" />
                <stop offset="30%" stopColor="#E08576" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#FF9F8E" stopOpacity="1" />
                <stop offset="70%" stopColor="#E08576" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#E08576" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="pulseGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF9F8E" stopOpacity="1" />
                <stop offset="40%" stopColor="#E08576" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#E08576" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#E08576" stopOpacity="0" />
              </radialGradient>
              {/* Enhanced glow filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              {/* Stronger glow for main pulse */}
              <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              {/* Background glow for center */}
              <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E08576" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#E08576" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#E08576" stopOpacity="0" />
              </radialGradient>
            </defs>
            
            {/* Subtle background glow from center */}
            <circle 
              cx={`${layout.centerX}%`} 
              cy={`${layout.centerY}%`} 
              r="25%" 
              fill="url(#centerGlow)"
              opacity="0.6"
            />

            {/* Lines from center to categories with smooth pulse animation */}
            {layout.categories.map((cat, catIdx) => {
              const isActive = cat.id === activeCategory || cat.id === hoveredCategory;
              const isHovered = hoveredCategory === cat.id;
              
              // Calculate line end point (shorter, not reaching the category)
              const lineLength = 0.92; // Line ends at 92% of the distance (closer to category)
              const endX = layout.centerX + (cat.x - layout.centerX) * lineLength;
              const endY = layout.centerY + (cat.y - layout.centerY) * lineLength;
              
              return (
                <g key={`center-${cat.id}`}>
                  <motion.line
                    x1={`${layout.centerX}%`}
                    y1={`${layout.centerY}%`}
                    x2={`${endX}%`}
                    y2={`${endY}%`}
                    className={cn("connection-line", isActive && "connection-line-active")}
                    initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: isActive 
                      ? [0.85, 1, 0.85] 
                      : [0.5, 0.6, 0.5],
                    strokeWidth: isActive 
                      ? [3, 3.5, 3] 
                      : [2.5, 2.8, 2.5],
                  }}
                    transition={{ 
                      pathLength: { duration: 0.8, delay: 0.2 + catIdx * 0.1 },
                      opacity: { 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      strokeWidth: { 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  />
                  
                  {/* Cool pulse animation when hovering category */}
                  {isHovered && (
                    <>
                      {/* Main pulse circle with enhanced glow */}
                      <motion.circle
                        r="8"
                        fill="url(#pulseGlow)"
                        filter="url(#strongGlow)"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 1, 0],
                          scale: [0.2, 1.4, 1.1, 0.2],
                          cx: [`${layout.centerX}%`, `${endX}%`, `${endX}%`, `${endX}%`],
                          cy: [`${layout.centerY}%`, `${endY}%`, `${endY}%`, `${endY}%`],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: [0.4, 0, 0.2, 1],
                          times: [0, 0.5, 0.7, 1],
                        }}
                      />
                      {/* Trail effect */}
                      <motion.circle
                        r="4"
                        fill="#E08576"
                        opacity="0.6"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 0.8, 0.4, 0],
                          scale: [0.2, 0.8, 0.6, 0.2],
                          cx: [`${layout.centerX}%`, `${endX}%`, `${endX}%`, `${endX}%`],
                          cy: [`${layout.centerY}%`, `${endY}%`, `${endY}%`, `${endY}%`],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeOut",
                          times: [0, 0.4, 0.6, 1],
                          delay: 0.1,
                        }}
                      />
                      {/* Enhanced light trail line */}
                      <motion.line
                        x1={`${layout.centerX}%`}
                        y1={`${layout.centerY}%`}
                        x2={`${endX}%`}
                        y2={`${endY}%`}
                        stroke="url(#pulseGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        filter="url(#glow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: [0, 1, 1, 0],
                          opacity: [0, 1, 0.9, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </>
                  )}
                </g>
              );
            })}

            {/* Lines from categories to services with smooth pulse animation */}
            {layout.categories.map((cat, catIdx) =>
              cat.services.map((service, serviceIdx) => {
                const isServiceHovered = hoveredService?.service.slug === service.slug;
                const isCategoryActive = cat.id === activeCategory || cat.id === hoveredCategory;
                const isActive = isServiceHovered || isCategoryActive;
                
                // Calculate line end points (shorter, not reaching the elements)
                const lineLength = 0.92; // Line ends at 92% of the distance (closer to elements)
                const catEndX = layout.centerX + (cat.x - layout.centerX) * lineLength;
                const catEndY = layout.centerY + (cat.y - layout.centerY) * lineLength;
                const serviceEndX = cat.x + (service.x - cat.x) * lineLength;
                const serviceEndY = cat.y + (service.y - cat.y) * lineLength;
                
                return (
                  <g key={`${cat.id}-${service.slug}`}>
                    <motion.line
                      x1={`${cat.x}%`}
                      y1={`${cat.y}%`}
                      x2={`${serviceEndX}%`}
                      y2={`${serviceEndY}%`}
                      className={cn(
                        "connection-line",
                        isActive && "connection-line-active"
                      )}
                      initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1,
                      opacity: isActive 
                        ? [0.7, 0.85, 0.7] 
                        : [0.45, 0.55, 0.45],
                      strokeWidth: isServiceHovered 
                        ? [3, 3.5, 3] 
                        : isCategoryActive 
                        ? [2.7, 3, 2.7] 
                        : [2.5, 2.7, 2.5],
                    }}
                      transition={{ 
                        pathLength: { 
                          duration: 0.5, 
                          delay: 0.6 + catIdx * 0.1 + serviceIdx * 0.03 
                        },
                        opacity: { 
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: serviceIdx * 0.1,
                        },
                        strokeWidth: { 
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: serviceIdx * 0.1,
                        },
                      }}
                    />
                    
                    {/* Cool pulse animation when hovering service - from center through category to service */}
                    {isServiceHovered && (
                      <>
                        {/* Pulse from center to category with enhanced glow */}
                        <motion.circle
                          r="8"
                          fill="url(#pulseGlow)"
                          filter="url(#strongGlow)"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0.2, 1.4, 1.1, 0.2],
                            cx: [`${layout.centerX}%`, `${catEndX}%`, `${catEndX}%`, `${catEndX}%`],
                            cy: [`${layout.centerY}%`, `${catEndY}%`, `${catEndY}%`, `${catEndY}%`],
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: [0.4, 0, 0.2, 1],
                            times: [0, 0.45, 0.55, 1],
                          }}
                        />
                        {/* Trail for center to category */}
                        <motion.circle
                          r="4"
                          fill="#E08576"
                          opacity="0.6"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 0.8, 0.4, 0],
                            scale: [0.2, 0.8, 0.6, 0.2],
                            cx: [`${layout.centerX}%`, `${catEndX}%`, `${catEndX}%`, `${catEndX}%`],
                            cy: [`${layout.centerY}%`, `${catEndY}%`, `${catEndY}%`, `${catEndY}%`],
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeOut",
                            times: [0, 0.35, 0.5, 1],
                            delay: 0.15,
                          }}
                        />
                        {/* Enhanced light trail line from center to category */}
                        <motion.line
                          x1={`${layout.centerX}%`}
                          y1={`${layout.centerY}%`}
                          x2={`${catEndX}%`}
                          y2={`${catEndY}%`}
                          stroke="url(#pulseGradient)"
                          strokeWidth="4"
                          strokeLinecap="round"
                          filter="url(#glow)"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{
                            pathLength: [0, 1, 1, 0],
                            opacity: [0, 1, 0.9, 0],
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        
                        {/* Pulse from category to service with enhanced glow */}
                        <motion.circle
                          r="8"
                          fill="url(#pulseGlow)"
                          filter="url(#strongGlow)"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 0, 1, 1, 0],
                            scale: [0.2, 0.2, 1.4, 1.1, 0.2],
                            cx: [`${catEndX}%`, `${catEndX}%`, `${serviceEndX}%`, `${serviceEndX}%`, `${serviceEndX}%`],
                            cy: [`${catEndY}%`, `${catEndY}%`, `${serviceEndY}%`, `${serviceEndY}%`, `${serviceEndY}%`],
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: [0.4, 0, 0.2, 1],
                            times: [0, 0.45, 0.7, 0.85, 1],
                            delay: 0.8,
                          }}
                        />
                        {/* Trail for category to service */}
                        <motion.circle
                          r="4"
                          fill="#E08576"
                          opacity="0.6"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 0, 0.8, 0.4, 0],
                            scale: [0.2, 0.2, 0.8, 0.6, 0.2],
                            cx: [`${catEndX}%`, `${catEndX}%`, `${serviceEndX}%`, `${serviceEndX}%`, `${serviceEndX}%`],
                            cy: [`${catEndY}%`, `${catEndY}%`, `${serviceEndY}%`, `${serviceEndY}%`, `${serviceEndY}%`],
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeOut",
                            times: [0, 0.4, 0.6, 0.75, 1],
                            delay: 0.95,
                          }}
                        />
                        {/* Enhanced light trail line from category to service */}
                        <motion.line
                          x1={`${catEndX}%`}
                          y1={`${catEndY}%`}
                          x2={`${serviceEndX}%`}
                          y2={`${serviceEndY}%`}
                          stroke="url(#pulseGradient)"
                          strokeWidth="4"
                          strokeLinecap="round"
                          filter="url(#glow)"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{
                            pathLength: [0, 0, 1, 1, 0],
                            opacity: [0, 0, 1, 0.9, 0],
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.45, 0.7, 0.85, 1],
                            delay: 0.8,
                          }}
                        />
                      </>
                    )}
                  </g>
                );
              })
            )}
          </svg>

          {/* HTML Layer for Interactive Nodes */}
          <div className="absolute inset-0 z-10">
            {/* Center Node - Services with enhanced floating animation */}
            <motion.div
              className="absolute flex items-center justify-center gap-4"
              style={{
                left: `${layout.centerX}%`,
                top: `${layout.centerY}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                y: [0, -3, 0],
                rotate: [0, 0.5, -0.5, 0],
              }}
              transition={{ 
                duration: 0.5, 
                delay: 0.2,
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              }}
            >
              {/* Glow effect behind logo */}
              <motion.div
                className="absolute -inset-4 rounded-full bg-coral/20 blur-xl"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <CenterLogo className="flex-shrink-0 relative z-10" />
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight whitespace-nowrap relative z-10">
                Caste//s
              </h2>
            </motion.div>

            {/* Category Nodes with floating animation */}
            {layout.categories.map((cat, catIdx) => {
              const isActive = cat.id === activeCategory || cat.id === hoveredCategory;
              
              // Minimal floating patterns for each category
              const floatOffset = catIdx % 2 === 0 ? 2 : -2; // Reduced from 4 to 2
              const floatDuration = 4 + catIdx * 0.5; // Slower movement
              const floatDelay = catIdx * 0.2;
              
              return (
                <motion.div
                  key={cat.id}
                  className="absolute cursor-pointer flex items-center justify-center"
                  style={{
                    left: `${cat.x}%`,
                    top: `${cat.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    y: [0, floatOffset, -floatOffset, 0],
                    x: [0, floatOffset * 0.3, -floatOffset * 0.3, 0], // Reduced from 0.5 to 0.3
                  }}
                  transition={{ 
                    scale: { duration: 0.4, delay: 0.3 + catIdx * 0.1 },
                    opacity: { duration: 0.4, delay: 0.3 + catIdx * 0.1 },
                    y: {
                      duration: floatDuration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: floatDelay,
                    },
                    x: {
                      duration: floatDuration * 1.5, // Slower
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: floatDelay,
                    }
                  }}
                  onMouseEnter={() => setHoveredCategory(cat.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <motion.div
                    className={cn(
                      "text-center transition-all duration-300 px-3 py-2 rounded-lg",
                      isActive
                        ? "text-white scale-105 bg-white/5 backdrop-blur-sm"
                        : "text-white/70"
                    )}
                    whileHover={{ scale: 1.15, y: -2 }}
                  >
                    <h3 className="text-base md:text-lg lg:text-xl font-semibold whitespace-nowrap relative">
                      <span className="relative z-10">{cat.label}</span>
                      {isActive && (
                        <motion.span
                          className="absolute inset-0 bg-coral/10 rounded-lg blur-sm -z-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}
                    </h3>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Service Nodes with floating animation */}
            {layout.categories.map((cat) =>
              cat.services.map((service, idx) => {
                const isHovered = hoveredService?.service.slug === service.slug;
                const isCategoryActive = cat.id === activeCategory || cat.id === hoveredCategory;
                const shouldUnderline = idx === 2 || idx === 4; // Underline some services

                // Minimal floating pattern for each service
                const serviceFloatOffset = (idx % 3) * 0.8 - 0.8; // -0.8, 0, 0.8 pattern (minimal)
                const serviceFloatDuration = 3.5 + (idx % 3) * 0.4; // Slower movement
                const serviceFloatDelay = idx * 0.15;

                return (
                  <motion.div
                    key={`${cat.id}-${service.slug}`}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{
                      left: `${service.x}%`,
                      top: `${service.y}%`,
                    }}
                    initial={{ scale: 0, opacity: 0, y: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      y: [0, serviceFloatOffset, -serviceFloatOffset, 0],
                    }}
                    transition={{
                      scale: { duration: 0.3, delay: 0.5 + idx * 0.05 },
                      opacity: { duration: 0.3, delay: 0.5 + idx * 0.05 },
                      y: {
                        duration: serviceFloatDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: serviceFloatDelay,
                      }
                    }}
                    whileHover={{ 
                      scale: 1.15, 
                      y: -3,
                      transition: { duration: 0.2 }
                    }}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      if (containerRef.current) {
                        const rect = containerRef.current.getBoundingClientRect();
                        // Use element position instead of cursor position for better stability
                        const elementX = service.x;
                        const elementY = service.y;
                        setHoveredService({ 
                          service, 
                          categoryId: cat.id,
                          x: elementX,
                          y: elementY
                        });
                        setHoveredCategory(cat.id);
                      }
                    }}
                    onMouseLeave={() => {
                      // Let the card handle its own mouse leave
                    }}
                  >
                    <motion.span
                      className={cn(
                        "text-sm md:text-base font-medium transition-all duration-300 whitespace-nowrap px-3 py-1.5 rounded-md relative",
                        isHovered
                          ? "text-white scale-110 font-semibold bg-coral/20 backdrop-blur-sm"
                          : isCategoryActive
                          ? "text-white/80 bg-white/5"
                          : "text-white/60",
                        shouldUnderline && "underline decoration-coral/50"
                      )}
                      whileHover={{ scale: 1.15, y: -3 }}
                    >
                      {isHovered && (
                        <motion.span
                          className="absolute inset-0 bg-coral/10 rounded-md blur-md -z-0"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1.2 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      <span className="relative z-10">
                        {service.name.length > 25 
                          ? service.name.substring(0, 23) + '...' 
                          : service.name}
                      </span>
                    </motion.span>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Hover Card - Desktop: Positioned dynamically */}
          <AnimatePresence>
            {hoveredService && (
              <>
                {/* Desktop version */}
                <motion.div
                  key={`card-${hoveredService.service.slug}`}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-50 max-w-sm w-full pointer-events-auto hidden lg:block"
                  style={{
                    left: `${hoveredService.x}%`,
                    top: `${hoveredService.y}%`,
                    transform: hoveredService.x > 70 
                      ? 'translate(calc(-100% - 20px), calc(-100% - 20px))' // Left side, above
                      : hoveredService.x < 30
                      ? 'translate(20px, calc(-100% - 20px))' // Right side, above
                      : 'translate(-50%, calc(-100% - 20px))', // Centered, above
                  }}
                  onMouseEnter={() => {
                    // Keep card visible when hovering over it
                  }}
                  onMouseLeave={() => {
                    setHoveredService(null);
                    setHoveredCategory(null);
                  }}
                >
                  <div className="bg-[#1a1a1a] dark:bg-[#1a1a1a] rounded-[2rem] p-6   -white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-coral/20 flex-shrink-0">
                        <hoveredService.service.icon className="w-5 h-5 text-coral" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-coral uppercase tracking-wider mb-1">
                          {SERVICE_CATEGORIES.find(c => c.id === hoveredService.categoryId)?.label}
                        </div>
                        <h3 className="font-bold text-white text-lg leading-tight">
                          {hoveredService.service.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {hoveredService.service.description}
                    </p>
                  </div>
                </motion.div>

                {/* Mobile version - Fixed at bottom */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-4 left-4 right-4 z-50 pointer-events-auto lg:hidden"
                  onMouseEnter={() => {
                    // Keep card visible when hovering over it
                  }}
                  onMouseLeave={() => {
                    setHoveredService(null);
                    setHoveredCategory(null);
                  }}
                >
                  <div className="bg-[#1a1a1a] dark:bg-[#1a1a1a] rounded-[2rem] p-4   -white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-coral/20 flex-shrink-0">
                        <hoveredService.service.icon className="w-4 h-4 text-coral" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-coral uppercase tracking-wider mb-1">
                          {SERVICE_CATEGORIES.find(c => c.id === hoveredService.categoryId)?.label}
                        </div>
                        <h3 className="font-bold text-white text-base leading-tight">
                          {hoveredService.service.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {hoveredService.service.description}
                    </p>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesMindMapSection;


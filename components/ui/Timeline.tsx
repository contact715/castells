import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Calendar, TrendingUp, Users, Award, Rocket, Target } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ events, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Animate the progress line (0 to 1 for scaleY)
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className={cn('relative py-20', className)}>
      <div className="relative max-w-6xl mx-auto">
        {/* Sticky Vertical Line with Progress - positioned absolutely */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-1 pointer-events-none z-0">
          {/* Background line */}
          <div className="absolute inset-0 w-full bg-black/5" />
          {/* Animated progress line */}
          <motion.div
            style={{ scaleY: lineProgress, transformOrigin: 'top' }}
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-coral via-coral/80 to-coral/40"
          />
        </div>

        {/* Mobile vertical line */}
        <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-coral via-coral/50 to-coral/20" />

        {/* Events Container */}
        <div className="relative space-y-32 md:space-y-40 z-10">
          {events.map((event, index) => {
            const Icon = event.icon || Calendar;
            const isEven = index % 2 === 0;
            
            return (
              <TimelineEventItem
                key={event.year}
                event={event}
                Icon={Icon}
                isEven={isEven}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface TimelineEventItemProps {
  event: TimelineEvent;
  Icon: React.ComponentType<{ className?: string }>;
  isEven: boolean;
  index: number;
}

const TimelineEventItem: React.FC<TimelineEventItemProps> = ({ event, Icon, isEven, index }) => {
  const eventRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(eventRef, {
    once: true,
    margin: '-200px 0px',
    amount: 0.3,
  });

  return (
    <motion.div
      ref={eventRef}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        'relative flex items-center gap-8 md:gap-12',
        'md:grid md:grid-cols-2',
        isEven ? 'md:grid-flow-col' : 'md:grid-flow-col-dense'
      )}
    >
      {/* Year Badge - centered on desktop */}
      <div className={cn(
        'relative z-10 flex-shrink-0 flex justify-center md:justify-center',
        isEven ? 'md:order-1' : 'md:order-2'
      )}>
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="relative"
        >
          {/* Outer glow */}
          <motion.div
            animate={isInView ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 rounded-full bg-coral/30 blur-xl"
          />
          <div
            className={cn(
              'relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center border-2 border-coral bg-white shadow-xl backdrop-blur-sm',
              event.highlight && 'bg-coral text-white border-coral shadow-coral/50'
            )}
          >
            <span className="font-display font-bold text-base md:text-lg">{event.year}</span>
          </div>
        </motion.div>
      </div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -80 : 80, scale: 0.9 }}
        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: isEven ? -80 : 80, scale: 0.9 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ scale: 1.02, y: -4 }}
        className={cn(
          'flex-1 bg-white rounded-3xl p-8 md:p-10 border border-black/5 shadow-lg hover:shadow-2xl transition-all duration-500',
          isEven ? 'md:order-2' : 'md:order-1',
          event.highlight && 'border-coral/30 bg-gradient-to-br from-coral/5 via-white to-white shadow-xl'
        )}
      >
        <div className="flex items-start gap-5 mb-4">
          <motion.div
            initial={{ rotate: -90, scale: 0 }}
            animate={isInView ? { rotate: 0, scale: 1 } : { rotate: -90, scale: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.4,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className={cn(
              'w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0',
              event.highlight
                ? 'bg-coral text-white shadow-lg'
                : 'bg-coral/10 text-coral'
            )}
          >
            <Icon className="w-6 h-6 md:w-7 md:h-7" />
          </motion.div>
          <div className="flex-1">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="font-display text-2xl md:text-3xl font-semibold mb-4 text-text-primary"
            >
              {event.title}
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-text-secondary text-base md:text-lg leading-relaxed space-y-3"
            >
              {event.description.split('\n').map((paragraph, pIndex) => (
                <p key={pIndex} className="mb-3">
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Timeline;





import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Mail, Phone, Clock, Heart, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { PageView } from '../../App';
import SEO from '../ui/SEO';

interface ThankYouPageProps {
  onNavigate: (page: PageView) => void;
  type?: 'contact' | 'newsletter' | 'booking' | 'general';
}

// Confetti particle component
const Confetti: React.FC<{ delay: number; x: number }> = ({ delay, x }) => {
  const colors = ['#FF6B5B', '#FFD93D', '#6BCB77', '#4D96FF', '#F38181', '#AA96DA'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomRotation = Math.random() * 360;
  const randomSize = 8 + Math.random() * 8;
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: '-20px',
        width: randomSize,
        height: randomSize,
        backgroundColor: randomColor,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      }}
      initial={{ y: -20, rotate: 0, opacity: 1 }}
      animate={{
        y: ['0vh', '100vh'],
        rotate: [0, randomRotation + 360],
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay: delay,
        ease: 'easeOut',
      }}
    />
  );
};

// Floating icon component
const FloatingIcon: React.FC<{ icon: React.ReactNode; delay: number; x: number; y: number }> = ({ icon, delay, x, y }) => (
  <motion.div
    className="absolute text-coral/20 dark:text-coral/30"
    style={{ left: `${x}%`, top: `${y}%` }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 1, 0],
      scale: [0, 1.2, 1, 0.8],
      y: [0, -30, -60, -100],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      repeatDelay: 2,
    }}
  >
    {icon}
  </motion.div>
);

const ThankYouPage: React.FC<ThankYouPageProps> = ({ onNavigate, type = 'general' }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [confettiParticles, setConfettiParticles] = useState<{ id: number; delay: number; x: number }[]>([]);

  // Generate confetti particles
  useEffect(() => {
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      delay: Math.random() * 0.5,
      x: Math.random() * 100,
    }));
    setConfettiParticles(particles);

    // Stop confetti after 4 seconds
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const contentByType = {
    contact: {
      title: 'Message Sent!',
      subtitle: 'We\'ve received your message and will get back to you shortly.',
      icon: <Mail className="w-8 h-8" />,
      features: [
        { icon: <Clock className="w-5 h-5" />, text: 'Response within 24 hours' },
        { icon: <Phone className="w-5 h-5" />, text: 'Direct call if urgent' },
        { icon: <Star className="w-5 h-5" />, text: 'Priority support' },
      ],
    },
    newsletter: {
      title: 'You\'re In!',
      subtitle: 'Welcome to our community. Check your inbox for a confirmation email.',
      icon: <Heart className="w-8 h-8" />,
      features: [
        { icon: <Sparkles className="w-5 h-5" />, text: 'Exclusive insights weekly' },
        { icon: <Star className="w-5 h-5" />, text: 'Early access to new content' },
        { icon: <Mail className="w-5 h-5" />, text: 'No spam, ever' },
      ],
    },
    booking: {
      title: 'Booking Confirmed!',
      subtitle: 'Your appointment has been scheduled. We\'ll send you a reminder.',
      icon: <Check className="w-8 h-8" />,
      features: [
        { icon: <Clock className="w-5 h-5" />, text: 'Calendar invite sent' },
        { icon: <Phone className="w-5 h-5" />, text: 'Reminder before call' },
        { icon: <Star className="w-5 h-5" />, text: 'Preparation tips included' },
      ],
    },
    general: {
      title: 'Thank You!',
      subtitle: 'Your submission was successful. We appreciate your interest.',
      icon: <Sparkles className="w-8 h-8" />,
      features: [
        { icon: <Check className="w-5 h-5" />, text: 'Submission received' },
        { icon: <Clock className="w-5 h-5" />, text: 'Quick response guaranteed' },
        { icon: <Heart className="w-5 h-5" />, text: 'We value your trust' },
      ],
    },
  };

  const content = contentByType[type];

  return (
    <div className="min-h-screen bg-ivory dark:bg-[#191919] relative overflow-hidden flex items-center justify-center selection:bg-coral selection:text-white">
      <SEO
        title="Thank you | Castells Agency"
        description="Thanks for reaching out. We’ll get back to you shortly."
        canonical="/thank-you"
        robots="noindex, nofollow"
      />
      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {confettiParticles.map(particle => (
              <Confetti key={particle.id} delay={particle.delay} x={particle.x} />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Floating Background Icons */}
      <FloatingIcon icon={<Star className="w-6 h-6" />} delay={0} x={10} y={30} />
      <FloatingIcon icon={<Heart className="w-8 h-8" />} delay={1} x={85} y={40} />
      <FloatingIcon icon={<Sparkles className="w-5 h-5" />} delay={2} x={20} y={70} />
      <FloatingIcon icon={<Star className="w-7 h-7" />} delay={1.5} x={75} y={20} />
      <FloatingIcon icon={<Heart className="w-6 h-6" />} delay={0.5} x={90} y={75} />
      <FloatingIcon icon={<Sparkles className="w-8 h-8" />} delay={2.5} x={5} y={60} />

      {/* Gradient Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-coral/20 to-transparent blur-3xl"
          style={{ top: '-200px', right: '-200px' }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-blue-500/10 to-transparent blur-3xl"
          style={{ bottom: '-100px', left: '-100px' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Success Icon */}
          <motion.div
            className="relative inline-flex mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 200, 
              damping: 15,
              delay: 0.2 
            }}
          >
            {/* Pulse rings */}
            <motion.div
              className="absolute inset-0 rounded-full bg-coral/20"
              animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-coral/20"
              animate={{ scale: [1, 1.8, 1.8], opacity: [0.3, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            
            {/* Main circle */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-coral to-coral/80 flex items-center justify-center shadow-2xl shadow-coral/30">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
              >
                <Check className="w-12 h-12 md:w-16 md:h-16 text-white" strokeWidth={3} />
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-text-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {content.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-text-secondary mb-10 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {content.subtitle}
          </motion.p>

          {/* Feature Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {content.features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl p-6 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              >
                <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center text-coral mb-3 mx-auto">
                  {feature.icon}
                </div>
                <p className="text-sm text-text-secondary font-medium">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Button
              onClick={() => onNavigate('home')}
              size="lg"
              className="group"
            >
              Back to Home
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => onNavigate('work')}
              variant="outline"
              size="lg"
            >
              View Our Work
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            className="mt-16 pt-8 border-t border-black/5 dark:border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <p className="text-sm text-text-secondary mb-4">
              Join 100+ satisfied clients who trust Castells
            </p>
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                >
                  <Star className="w-5 h-5 text-coral fill-coral" />
                </motion.div>
              ))}
              <span className="ml-2 text-sm font-semibold text-text-primary">5.0</span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;



import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Search, ArrowLeft, RefreshCw, Sparkles, Ghost, Zap } from 'lucide-react';
import { PageView } from '../../App';
import SEO from '../ui/SEO';
import type { NavigateFn } from '../../types';

interface NotFoundProps {
  onNavigate?: NavigateFn;
}

// Floating particle component
const FloatingParticle: React.FC<{ delay: number }> = ({ delay }) => {
  const randomX = Math.random() * 100;
  const randomSize = 2 + Math.random() * 4;
  const duration = 15 + Math.random() * 10;

  return (
    <motion.div
      className="absolute rounded-full bg-coral/30"
      style={{
        width: randomSize,
        height: randomSize,
        left: `${randomX}%`,
        bottom: '-10px',
      }}
      animate={{
        y: [0, -window.innerHeight - 50],
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
};

// Glitch text effect
const GlitchText: React.FC<{ children: string }> = ({ children }) => {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block">
      <span className={glitching ? 'invisible' : ''}>{children}</span>
      {glitching && (
        <>
          <span className="absolute inset-0 text-cyan-400 animate-pulse" style={{ clipPath: 'inset(0 0 50% 0)', transform: 'translate(-2px, -1px)' }}>
            {children}
          </span>
          <span className="absolute inset-0 text-red-400 animate-pulse" style={{ clipPath: 'inset(50% 0 0 0)', transform: 'translate(2px, 1px)' }}>
            {children}
          </span>
        </>
      )}
    </span>
  );
};

// Interactive ghost that follows cursor slowly
const FollowingGhost: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
  const [ghostPos, setGhostPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setGhostPos(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.02,
        y: prev.y + (mousePosition.y - prev.y) * 0.02,
      }));
    }, 16);
    return () => clearInterval(timer);
  }, [mousePosition]);

  return (
    <motion.div
      className="fixed pointer-events-none z-10 opacity-20"
      style={{ left: ghostPos.x - 30, top: ghostPos.y - 30 }}
    >
      <Ghost className="w-16 h-16 text-coral" />
    </motion.div>
  );
};

// Mini game: Click the numbers
const NumberGame: React.FC<{ onWin: () => void }> = ({ onWin }) => {
  const [numbers, setNumbers] = useState([4, 0, 4]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const scrambleNumber = (index: number) => {
    if (!gameActive) return;
    
    setNumbers(prev => {
      const newNums = [...prev];
      newNums[index] = Math.floor(Math.random() * 10);
      return newNums;
    });
    setScore(s => s + 1);

    if (score >= 9) {
      onWin();
    }
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setNumbers([4, 0, 4]);
  };

  return (
    <div className="text-center">
      {!gameActive ? (
        <motion.button
          onClick={startGame}
          className="text-sm text-white/50 hover:text-coral transition-colors flex items-center gap-2 mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Zap className="w-4 h-4" />
          Click to play a mini game
        </motion.button>
      ) : (
        <div>
          <p className="text-xs text-white/50 mb-2">Click the numbers! ({10 - score} clicks left)</p>
          <div className="flex justify-center gap-4">
            {numbers.map((num, idx) => (
              <motion.button
                key={idx}
                onClick={() => scrambleNumber(idx)}
                className="font-display text-6xl md:text-8xl font-bold text-coral hover:text-white transition-colors cursor-pointer"
                whileHover={{ scale: 1.1, rotate: Math.random() * 10 - 5 }}
                whileTap={{ scale: 0.9 }}
              >
                {num}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const NotFound: React.FC<NotFoundProps> = ({ onNavigate }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasWonGame, setHasWonGame] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles] = useState(() => 
    Array.from({ length: 20 }, (_, i) => ({ id: i, delay: Math.random() * 10 }))
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Easter egg: type "magic" to reveal secret
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const newQuery = (searchQuery + key).slice(-5);
      setSearchQuery(newQuery);
      if (newQuery === 'magic') {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 3000);
      }
    };
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [searchQuery]);

  const handleGameWin = useCallback(() => {
    setHasWonGame(true);
  }, []);

  const handleNavigate = (page: PageView) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen w-full flex flex-col items-center justify-center bg-[#191919] text-white relative overflow-hidden cursor-none selection:bg-coral selection:text-white"
    >
      <SEO
        title="404 | Page not found"
        description="The page you’re looking for doesn’t exist."
        canonical="/404"
        robots="noindex, nofollow"
      />
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map(p => (
          <FloatingParticle key={p.id} delay={p.delay} />
        ))}
      </div>

      {/* Following Ghost */}
      <FollowingGhost mousePosition={mousePosition} />

      {/* Easter Egg Animation */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-6xl"
              animate={{ 
                scale: [1, 1.5, 1],
                rotate: [0, 360],
              }}
              transition={{ duration: 1 }}
            >
              ✨🎉✨
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-coral/20 to-transparent blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x * 0.02 - 250,
          y: mousePosition.y * 0.02 - 250,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-blue-500/10 to-transparent blur-3xl pointer-events-none"
        style={{ bottom: '10%', right: '10%' }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Layer 1: Dim Content (Background) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
        <h1 className="font-display text-[10rem] md:text-[18rem] lg:text-[22rem] leading-none font-semibold text-white/[0.03]">
          <GlitchText>404</GlitchText>
        </h1>
      </div>

      {/* Layer 2: Spotlight Content (Revealed by mask) */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20"
        style={{
          maskImage: `radial-gradient(circle 350px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 350px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
        }}
      >
        <motion.h1 
          className="font-display text-[10rem] md:text-[18rem] lg:text-[22rem] leading-none font-semibold text-coral"
          animate={hasWonGame ? {
            color: ['#FF6B5B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF6B5B'],
          } : {}}
          transition={{ duration: 2, repeat: hasWonGame ? Infinity : 0 }}
        >
          404
        </motion.h1>
      </motion.div>

      {/* Layer 3: Main Content - Always visible */}
      <div className="relative z-30 text-center px-6 mt-16 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-display text-3xl md:text-5xl mb-4 text-white font-light">
            {hasWonGame ? '🎉 You Found It!' : 'Page Not Found'}
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-md mx-auto mb-4">
            {hasWonGame 
              ? 'You\'ve discovered the secret! Here\'s a virtual high-five 🖐️'
              : 'The page you\'re looking for has vanished into the digital void.'
            }
          </p>
          <p className="text-sm text-white/40 mb-8">
            Hint: Move your cursor to reveal the hidden message
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            onClick={() => handleNavigate('home')}
            size="lg" 
            variant="secondary" 
            className="group"
          >
            <Home className="w-4 h-4 mr-2" />
            Return Home
          </Button>
          <Button 
            onClick={() => window.history.back()}
            size="lg" 
            variant="outline-white"
            className="group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>
        </motion.div>

        {/* Mini Game Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <NumberGame onWin={handleGameWin} />
        </motion.div>

        {/* Popular Links */}
        <motion.div
          className="mt-16 pt-8 -t -white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm text-white/50 mb-6">Or try these popular pages:</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { name: 'Services', page: 'services' as PageView },
              { name: 'Work', page: 'work' as PageView },
              { name: 'About', page: 'about' as PageView },
              { name: 'Contact', page: 'contact' as PageView },
            ].map((link, idx) => (
              <motion.button
                key={link.name}
                onClick={() => handleNavigate(link.page)}
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm transition-all cursor-pointer  -white/10 hover:-white/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Secret hint */}
        <motion.p
          className="mt-8 text-xs text-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          Psst... try typing "magic" 🪄
        </motion.p>
      </div>

      {/* Custom Cursor Elements */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-coral rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{ x: mousePosition.x - 8, y: mousePosition.y - 8 }}
        transition={{ type: 'spring', stiffness: 1000, damping: 50, mass: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12  -white/30 rounded-full pointer-events-none z-40"
        animate={{ x: mousePosition.x - 24, y: mousePosition.y - 24 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
      />
      
      {/* Outer cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-20 h-20  -coral/20 rounded-full pointer-events-none z-30"
        animate={{ 
          x: mousePosition.x - 40, 
          y: mousePosition.y - 40,
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          x: { type: 'spring', stiffness: 300, damping: 25 },
          y: { type: 'spring', stiffness: 300, damping: 25 },
          scale: { duration: 2, repeat: Infinity },
        }}
      />
    </div>
  );
};

export default NotFound;

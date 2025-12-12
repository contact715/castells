import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen w-full flex flex-col items-center justify-center bg-[#191919] text-white relative overflow-hidden cursor-none selection:bg-coral selection:text-white">

            {/* Layer 1: Dim Content (Background) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                <h1 className="font-display text-[12rem] md:text-[20rem] leading-none font-bold text-white/5">404</h1>
                <h2 className="font-display text-3xl md:text-5xl mb-4 text-white/5 font-light">Page Not Found</h2>
            </div>

            {/* Layer 2: Spotlight Content (Revealed by mask) */}
            <div
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20"
                style={{
                    maskImage: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
                    WebkitMaskImage: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
                }}
            >
                <h1 className="font-display text-[12rem] md:text-[20rem] leading-none font-bold text-coral drop-shadow-2xl">404</h1>
                <h2 className="font-display text-3xl md:text-5xl mb-4 text-white font-light">Page Not Found</h2>
                <p className="text-lg md:text-xl text-white/90 max-w-md text-center font-sans mt-4 px-6">
                    The page you are looking for has vanished into the shadows.
                </p>
            </div>

            {/* Layer 3: Interactive UI (Button) - Always visible */}
            <div className="relative z-30 mt-[40vh] md:mt-[50vh]">
                <Button href="/" size="md" variant="secondary" className="shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    Return Home
                </Button>
            </div>

            {/* Custom Cursor Elements */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-coral rounded-full pointer-events-none z-50 mix-blend-difference"
                animate={{ x: mousePosition.x - 8, y: mousePosition.y - 8 }}
                transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 border border-white/30 rounded-full pointer-events-none z-40"
                animate={{ x: mousePosition.x - 24, y: mousePosition.y - 24 }}
                transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
            />

        </div>
    );
};

export default NotFound;

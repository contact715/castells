import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const SmoothScroll = () => {
    const lenisRef = useRef<Lenis | null>(null);
    const rafIdRef = useRef<number>();

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // Disable smooth scroll for users who prefer reduced motion
            return;
        }

        // Check performance - disable on low-end devices
        const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
        if (isLowEndDevice) {
            return;
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing for premium feel
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            // Performance optimizations
            infinite: false,
            syncTouch: false, // Disable touch sync for better performance
        });

        lenisRef.current = lenis;

        let lastTime = 0;
        function raf(time: number) {
            if (lenisRef.current) {
                lenisRef.current.raf(time);
                
                // Throttle to ~60fps max
                const delta = time - lastTime;
                if (delta >= 16) {
                    lastTime = time;
                }
                
                rafIdRef.current = requestAnimationFrame(raf);
            }
        }

        rafIdRef.current = requestAnimationFrame(raf);

        return () => {
            if (lenisRef.current) {
                lenisRef.current.destroy();
                lenisRef.current = null;
            }
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, []);

    return null;
};

export default SmoothScroll;

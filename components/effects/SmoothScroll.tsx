import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const SmoothScroll = () => {
    const lenisRef = useRef<Lenis | null>(null);
    // В типах React 19 useRef требует явного начального значения
    const rafIdRef = useRef<number | undefined>(undefined);
    const idleTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const isRunning = useRef(false);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
        if (isLowEndDevice) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
            syncTouch: false,
        });

        lenisRef.current = lenis;

        // RAF loop that auto-stops when idle
        function raf(time: number) {
            if (lenisRef.current) {
                lenisRef.current.raf(time);
                rafIdRef.current = requestAnimationFrame(raf);
            }
        }

        function startLoop() {
            if (!isRunning.current) {
                isRunning.current = true;
                rafIdRef.current = requestAnimationFrame(raf);
            }
            // Auto-stop after 200ms of no scroll events
            clearTimeout(idleTimeoutRef.current);
            idleTimeoutRef.current = setTimeout(() => {
                if (rafIdRef.current) {
                    cancelAnimationFrame(rafIdRef.current);
                    rafIdRef.current = undefined;
                }
                isRunning.current = false;
            }, 200);
        }

        // Start loop on scroll/wheel/touch events
        const onInteraction = () => startLoop();

        window.addEventListener('wheel', onInteraction, { passive: true });
        window.addEventListener('touchstart', onInteraction, { passive: true });
        window.addEventListener('touchmove', onInteraction, { passive: true });

        // Initial start for any in-progress scroll
        startLoop();

        return () => {
            clearTimeout(idleTimeoutRef.current);
            if (lenisRef.current) {
                lenisRef.current.destroy();
                lenisRef.current = null;
            }
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
            window.removeEventListener('wheel', onInteraction);
            window.removeEventListener('touchstart', onInteraction);
            window.removeEventListener('touchmove', onInteraction);
        };
    }, []);

    return null;
};

export default SmoothScroll;

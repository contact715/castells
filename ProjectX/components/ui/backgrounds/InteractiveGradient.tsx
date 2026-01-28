import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { useEffect, memo } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

export const InteractiveGradient = memo(function InteractiveGradient() {
    const { theme } = useTheme();

    // Mouse position (0-100)
    const pointerX = useMotionValue(50);
    const pointerY = useMotionValue(50);

    // Spring physics for smooth following
    const pX = useSpring(pointerX, { stiffness: 100, damping: 20, mass: 1 });
    const pY = useSpring(pointerY, { stiffness: 100, damping: 20, mass: 1 });

    // Colors based on theme
    const colors = theme === "dark" ? {
        c1: "rgba(37, 99, 235, 0.4)", // Blue
        c2: "rgba(124, 58, 237, 0.4)", // Violet
        c3: "rgba(219, 39, 119, 0.4)"  // Pink
    } : {
        c1: "rgba(96, 165, 250, 0.4)", // Light Blue
        c2: "rgba(167, 139, 250, 0.4)", // Light Violet
        c3: "rgba(244, 114, 182, 0.4)"  // Light Pink
    };

    // Three orbiting points
    const phase = useMotionValue(0);

    useEffect(() => {
        let controls = animate(phase, Math.PI * 2, {
            duration: 10,
            ease: "linear",
            repeat: Infinity
        });

        // OPTIMIZATION: Stop animation when page is hidden
        const handleVisibilityChange = () => {
            if (document.hidden) controls.stop();
            else controls = animate(phase, Math.PI * 2, {
                duration: 10,
                ease: "linear",
                repeat: Infinity
            });
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            controls.stop();
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [phase]);

    // Orbit calculations
    const orbitRadius = 25;
    const x1 = useTransform(pX, v => v); // Primary follows mouse
    const y1 = useTransform(pY, v => v);

    const x2 = useTransform(phase, t => 50 + Math.cos(t) * orbitRadius);
    const y2 = useTransform(phase, t => 50 + Math.sin(t) * orbitRadius);

    const x3 = useTransform(phase, t => 50 + Math.cos(t + 2 * Math.PI / 3) * orbitRadius);
    const y3 = useTransform(phase, t => 50 + Math.sin(t + 2 * Math.PI / 3) * orbitRadius);

    const background = useMotionTemplate`
    radial-gradient(circle at ${x1}% ${y1}%, ${colors.c1} 0%, transparent 50%),
    radial-gradient(circle at ${x2}% ${y2}%, ${colors.c2} 0%, transparent 50%),
    radial-gradient(circle at ${x3}% ${y3}%, ${colors.c3} 0%, transparent 50%)
  `;

    // Global mouse tracker
    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            pointerX.set((e.clientX / window.innerWidth) * 100);
            pointerY.set((e.clientY / window.innerHeight) * 100);
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, [pointerX, pointerY]);

    return (
        <motion.div
            className="fixed inset-0 z-[-1] opacity-100 pointer-events-none"
            style={{ background, filter: "blur(60px)", contain: "strict" }}
        />
    );
});

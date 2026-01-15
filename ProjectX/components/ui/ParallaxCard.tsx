import React, { useState, useRef, startTransition } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface ParallaxCardProps {
    children: React.ReactNode;
    className?: string;
    tiltDepth?: number;
    glareOpacity?: number;
}

export const ParallaxCard: React.FC<ParallaxCardProps> = ({
    children,
    className = "",
    tiltDepth = 10,
    glareOpacity = 0.15,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);

    // Mouse position relative to center (-1 to 1)
    const x = useSpring(0, { stiffness: 150, damping: 20 });
    const y = useSpring(0, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(y, [-1, 1], [tiltDepth, -tiltDepth]);
    const rotateY = useTransform(x, [-1, 1], [-tiltDepth, tiltDepth]);

    // Glare position
    const glareX = useTransform(x, [-1, 1], [-50, 150]);
    const glareY = useTransform(y, [-1, 1], [-50, 150]);
    const glareOp = useSpring(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const relativeX = (mouseX / rect.width) * 2 - 1;
        const relativeY = (mouseY / rect.height) * 2 - 1;

        startTransition(() => {
            x.set(relativeX);
            y.set(relativeY);
            glareOp.set(glareOpacity);
        });
    };

    const handleMouseLeave = () => {
        startTransition(() => {
            x.set(0);
            y.set(0);
            glareOp.set(0);
        });
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={className}
        >
            <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                {children}
            </div>

            {/* Glare Effect Purged for No-Glow Policy */}
        </motion.div>
    );
};

export default ParallaxCard;

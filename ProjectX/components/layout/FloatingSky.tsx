"use client";

import { memo } from "react";

// Cyber Grid Effect
const CyberGrid = memo(() => (
    <div className="absolute inset-0 z-0 overflow-hidden perspective-[1000px] bg-black">
        {/* Deep Space Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#000000_100%)] opacity-80" />

        {/* Animated Cyber Grid */}
        <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
                backgroundImage: `linear-gradient(to right, rgb(var(--accent)) 1px, transparent 1px),
                                 linear-gradient(to bottom, rgb(var(--accent)) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
                animation: 'gridMove 20s linear infinite',
            }}
        />

        {/* Random Particles */}
        <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        opacity: Math.random() * 0.5
                    }}
                />
            ))}
        </div>

        {/* Global Styles for Animations */}
        <style jsx global>{`
            @keyframes gridMove {
                0% { background-position: 0 0; }
                100% { background-position: 0 40px; }
            }
        `}</style>
    </div>
));
CyberGrid.displayName = "CyberGrid";

// Replaces FloatingSky with CyberSpace aesthetic
const FloatingSky = memo(() => (
    <div
        className="fixed inset-0 pointer-events-none -z-10 bg-[#0A0A0A]"
        style={{ contain: "strict", contentVisibility: "auto" }}
    >
        <CyberGrid />
    </div>
));
FloatingSky.displayName = "FloatingSky";

export default FloatingSky;

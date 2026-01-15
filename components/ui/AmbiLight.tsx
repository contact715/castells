import React, { useRef, useEffect, useState } from 'react';

interface AmbiLightProps {
    children: React.ReactNode;
    videoSrc?: string; // For HTML5 video
    vimeoId?: string;
    vimeoHash?: string; // Support for private/unlisted videos
    youtubeId?: string;
    blur?: number;
    spread?: number;
    intensity?: number;
    saturate?: number;
    brightness?: number;
    className?: string;
}

/**
 * AmbiLight Component
 * Creates an atmospheric glow effect by rendering a blurred, scaled version of the video behind the main content.
 */
export const AmbiLight: React.FC<AmbiLightProps> = ({
    children,
    videoSrc,
    vimeoId,
    vimeoHash,
    youtubeId,
    blur = 48,
    spread = 1.15,
    intensity = 0.75,
    saturate = 1.5,
    brightness = 1.2,
    className = "",
}) => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Small delay to ensure smooth entry
        const timer = setTimeout(() => setIsReady(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const glowBaseStyles: React.CSSProperties = {
        position: "absolute",
        inset: 0,
        transform: `scale(${spread})`,
        filter: `blur(${blur}px) saturate(${saturate}) brightness(${brightness})`,
        opacity: isReady ? intensity : 0,
        transition: "opacity 1000ms ease-in-out",
        pointerEvents: "none",
        zIndex: 0,
        width: "100%",
        height: "100%",
        border: 0,
    };

    const renderGlow = () => {
        if (vimeoId) {
            // Use the same video parameters as the main player to keep in sync
            // Important: Use responsive=1 and no controls for the background glow
            return (
                <iframe
                    src={`https://player.vimeo.com/video/${vimeoId}?h=${vimeoHash || ''}&background=1&autoplay=1&muted=1&loop=1&byline=0&title=0&quality=auto`}
                    style={glowBaseStyles}
                    frameBorder="0"
                    allow="autoplay"
                    title="ambilight-vimeo-glow"
                />
            );
        }

        if (youtubeId) {
            return (
                <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&controls=0&playlist=${youtubeId}&modestbranding=1&rel=0`}
                    style={glowBaseStyles}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    title="ambilight-youtube-glow"
                />
            );
        }

        if (videoSrc) {
            return (
                <video
                    src={videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ ...glowBaseStyles, objectFit: 'cover' }}
                />
            );
        }

        return null;
    };

    return (
        <div className={`relative ${className}`}>
            {/* Background Glow */}
            {renderGlow()}

            {/* Main Content */}
            <div className="relative z-10 w-full h-full overflow-hidden rounded-[inherit]">
                {children}
            </div>
        </div>
    );
};

export default AmbiLight;

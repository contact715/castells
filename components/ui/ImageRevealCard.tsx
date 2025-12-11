import React, { useRef, useState } from "react";
import { cn } from "../../lib/utils";

interface ImageRevealCardProps extends React.HTMLAttributes<HTMLDivElement> {
    revealImage: string;
    children: React.ReactNode;
}

export const ImageRevealCard: React.FC<ImageRevealCardProps> = ({
    revealImage,
    children,
    className,
    ...props
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "relative overflow-hidden bg-white dark:bg-surface border border-black/5 dark:border-white/5 rounded-[2rem] h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group",
                className
            )}
            {...props}
        >
            {/* Content Layer (Always Visible) */}
            <div className="relative z-20 h-full">
                {children}
            </div>

            {/* Reveal Layer (Masked Image) */}
            <div
                className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
                style={{
                    opacity,
                    background: `url(${revealImage}) center/cover no-repeat`,
                    maskImage: `radial-gradient(circle 150px at ${position.x}px ${position.y}px, black, transparent)`,
                    WebkitMaskImage: `radial-gradient(circle 150px at ${position.x}px ${position.y}px, black, transparent)`,
                }}
            />

            {/* Optional: Dark overlay on the image to ensure text readability if needed, 
          but user asked for "showing the image", so we keep it clear or add a slight tint if text is unreadable.
          For now, we'll assume the text (which is black) might need a white glow or the image needs to be faint?
          User said "starts to shine through... shows not all but like a flashlight".
          If the text is black and image is dark, text is lost. 
          Let's add a subtle white overlay on the image or ensure text has a shadow/glow in the parent component if needed.
          Actually, usually this effect reveals the image *instead* of the background, but the text remains on top.
      */}
        </div>
    );
};

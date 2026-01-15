"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

interface EachWordProps {
    word: string;
    starting: number;
    ending: number;
    startOpacity: number;
    endOpacity: number;
    progress: MotionValue<number>;
    animationStyle: "fade" | "slide";
    enableBlur: boolean;
    enableSmooth: boolean;
}

const EachWord: React.FC<EachWordProps> = ({
    word,
    starting,
    ending,
    startOpacity,
    endOpacity,
    progress,
    animationStyle,
    enableBlur,
    enableSmooth,
}) => {
    const progressVal = useTransform(progress, [starting, ending], [startOpacity, endOpacity]);
    const yVal = useTransform(progress, [starting, ending], animationStyle === "slide" ? [20, 0] : [0, 0]);
    const blurVal = useTransform(progress, [starting, ending], enableBlur ? [10, 0] : [0, 0]);
    const filterVal = useTransform(blurVal, (value) => `blur(${value}px)`);

    const springConfig = { stiffness: 100, damping: 20, mass: 1 };
    const smoothOpacity = useSpring(progressVal, springConfig);
    const smoothY = useSpring(yVal, springConfig);
    const smoothBlur = useSpring(blurVal, springConfig);
    const smoothFilter = useTransform(smoothBlur, (value) => `blur(${value}px)`);

    const finalOpacity = enableSmooth ? smoothOpacity : progressVal;
    const finalY = enableSmooth ? smoothY : yVal;
    const finalFilter = enableSmooth ? smoothFilter : filterVal;

    return (
        <motion.span
            style={{
                opacity: finalOpacity,
                y: finalY,
                filter: enableBlur ? finalFilter : undefined,
                willChange: animationStyle === "slide" ? "opacity, transform" : "opacity",
                display: "inline",
            }}
            dangerouslySetInnerHTML={{ __html: word }}
        />
    );
};

interface ScrollTextProps {
    text: string;
    startOffset?: number;
    endOffset?: number;
    startOpacity?: number;
    endOpacity?: number;
    animationStyle?: "fade" | "slide";
    enableSmooth?: boolean;
    enableBlur?: boolean;
    className?: string;
    textClassName?: string;
}

/**
 * ScrollText Component
 * Reveals text word-by-word as the user scrolls through the section.
 */
export const ScrollText: React.FC<ScrollTextProps> = ({
    text,
    startOffset = 0.5,
    endOffset = 0.5,
    startOpacity = 0,
    endOpacity = 1,
    animationStyle = "fade",
    enableSmooth = true,
    enableBlur = true,
    className = "",
    textClassName = "",
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: [`start ${startOffset}`, `end ${endOffset}`],
    });

    const words = useMemo(() => {
        // Split text into words, preserving HTML tags and newlines
        const textWithNewlines = text
            .replace(/<br\s*\/?>/gi, "\n")
            .replace(/\n+/g, " \n ");

        return textWithNewlines
            .split(/(\s+)/)
            .filter((word) => word.trim().length > 0 || word === "\n");
    }, [text]);

    const totalWords = words.length;

    return (
        <div ref={ref} className={`w-full ${className}`}>
            <div
                className={`flex flex-wrap items-center gap-x-[0.3em] gap-y-[0.1em] ${textClassName}`}
                style={{ wordBreak: "break-word" }}
            >
                {words.map((word, idx) => {
                    if (word === "\n") {
                        return <span key={`break-${idx}`} className="basis-full h-4" />;
                    }

                    return (
                        <EachWord
                            key={`word-${idx}`}
                            word={word}
                            starting={idx / totalWords}
                            ending={(idx + 1) / totalWords}
                            startOpacity={startOpacity}
                            endOpacity={endOpacity}
                            progress={scrollYProgress}
                            animationStyle={animationStyle}
                            enableBlur={enableBlur}
                            enableSmooth={enableSmooth}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ScrollText;

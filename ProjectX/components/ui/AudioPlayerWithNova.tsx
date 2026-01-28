"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NovaGlow } from "@/components/ui/backgrounds/NovaGlow";

interface AudioPlayerWithNovaProps {
    src: string;
    className?: string;
}

export function AudioPlayerWithNova({ src, className }: AudioPlayerWithNovaProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [intensity, setIntensity] = useState(0);

    const audioRef = useRef<HTMLAudioElement>(null);
    const analyzerRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const rafRef = useRef<number>();

    useEffect(() => {
        if (!audioRef.current) return;

        const audio = audioRef.current;

        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("ended", handleEnded);
        };
    }, []);

    const initAudioContext = () => {
        if (analyzerRef.current) return;

        const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContextClass();
        const analyzer = audioContext.createAnalyser();
        analyzer.fftSize = 256;

        const source = audioContext.createMediaElementSource(audioRef.current!);
        source.connect(analyzer);
        analyzer.connect(audioContext.destination);

        const dataArray = new Uint8Array(analyzer.frequencyBinCount);

        analyzerRef.current = analyzer;
        dataArrayRef.current = dataArray;
    };

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            initAudioContext();
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const updateIntensity = () => {
        if (isPlaying && analyzerRef.current && dataArrayRef.current) {
            analyzerRef.current.getByteFrequencyData(dataArrayRef.current as any);
            let sum = 0;
            for (let i = 0; i < (dataArrayRef.current as any).length; i++) {
                sum += (dataArrayRef.current as any)[i];
            }
            const average = sum / (dataArrayRef.current as any).length;
            // Normalize to 0-1 range with some scaling for better visuals
            setIntensity(Math.min(average / 128, 1));
        } else if (!isPlaying) {
            // Decay intensity when paused
            setIntensity(prev => Math.max(0, prev - 0.05));
        }
        rafRef.current = requestAnimationFrame(updateIntensity);
    };

    useEffect(() => {
        rafRef.current = requestAnimationFrame(updateIntensity);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isPlaying]);

    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`p-4 bg-white dark:bg-black/20 rounded-xl border border-white/10 flex flex-col gap-4 relative overflow-hidden ${className}`}>
            {/* Nova Glow Background Visualization */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <NovaGlow intensity={intensity} hue={200} />
            </div>

            <div className="relative z-10 flex items-center gap-4">
                <audio ref={audioRef} src={src} crossOrigin="anonymous" />

                <Button
                    onClick={togglePlay}
                    size="icon"
                    variant="neon"
                    className="rounded-full w-10 h-10 shrink-0 shadow-[0_0_15px_rgba(var(--accent),0.25)]"
                >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </Button>

                <div className="flex-1 flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-white/40">
                        <span>Recording Transcript Live</span>
                        <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                    </div>

                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden group cursor-pointer relative">
                        <div
                            className="h-full bg-primary shadow-[0_0_10px_rgba(var(--accent),0.35)] transition-all duration-100"
                            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-white/40 hover:text-white">
                        <Volume2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-white/40 hover:text-white">
                        <Maximize2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

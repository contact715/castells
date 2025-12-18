import React, { useState } from 'react';
import { Search, PenTool, Rocket, BarChart3, ArrowRight, Send, Video, CheckCircle2 } from 'lucide-react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

// ============ STEP ILLUSTRATIONS ============

// Application - Envelope/Message Animation
const ApplicationIllustration: React.FC = () => (
    <svg viewBox="0 0 600 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
            <linearGradient id="envelopeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E08576" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#E08576" stopOpacity="0"/>
            </linearGradient>
        </defs>
        
        {/* Background glow */}
        <motion.ellipse
            cx="300" cy="150" rx="120" ry="80"
            fill="url(#envelopeGlow)"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0.3, 0.5, 0.3], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
            <motion.circle
                key={i}
                cx={150 + (i % 4) * 100}
                cy={60 + Math.floor(i / 4) * 90}
                r={2 + (i % 3)}
                fill="#E08576"
                initial={{ opacity: 0, y: 0 }}
                animate={{ 
                    opacity: [0, 0.6, 0], 
                    y: [0, -20, -40],
                    x: [0, (i % 2 === 0 ? 10 : -10), 0]
                }}
                transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: "easeOut" }}
            />
        ))}
        
        {/* Central envelope with shadow */}
        <motion.g
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "backOut" }}
        >
            {/* Shadow */}
            <ellipse cx="300" cy="220" rx="70" ry="12" fill="#E08576" opacity="0.15"/>
            
            {/* Envelope body fill */}
            <rect x="220" y="95" width="160" height="115" rx="12" fill="#E08576" opacity="0.08"/>
            
            {/* Envelope body */}
            <motion.rect
                x="220" y="95" width="160" height="115" rx="12"
                fill="none" stroke="#E08576" strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            />
            
            {/* Envelope flap with fill */}
            <motion.path
                d="M 232 95 L 300 155 L 368 95"
                fill="#E08576" fillOpacity="0.05"
                stroke="#E08576" strokeWidth="2" strokeLinejoin="round"
                initial={{ pathLength: 0, fillOpacity: 0 }}
                animate={{ pathLength: 1, fillOpacity: 0.08 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            />
            
            {/* Letter peeking out */}
            <motion.rect
                x="240" y="130" width="120" height="60" rx="4"
                fill="#E08576" opacity="0.15"
                initial={{ y: 150, opacity: 0 }}
                animate={{ y: 130, opacity: 0.15 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            />
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                {[0, 1, 2].map((i) => (
                    <rect key={i} x="255" y={142 + i * 12} width={90 - i * 20} height="4" rx="2" fill="#E08576" opacity={0.3 - i * 0.08}/>
                ))}
            </motion.g>
        </motion.g>
        
        {/* Animated send indicators */}
        {[
            { x: 120, y: 80, delay: 0.8 },
            { x: 480, y: 70, delay: 1.1 },
            { x: 100, y: 200, delay: 1.4 },
            { x: 500, y: 190, delay: 1.7 },
        ].map((item, i) => (
            <motion.g key={i}>
                <motion.circle
                    cx={item.x} cy={item.y} r="8"
                    fill="#E08576" opacity="0.2"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.5, 1] }}
                    transition={{ duration: 0.6, delay: item.delay }}
                />
                <motion.path
                    d={`M ${item.x - 5} ${item.y} L ${item.x + 5} ${item.y} M ${item.x + 2} ${item.y - 3} L ${item.x + 5} ${item.y} L ${item.x + 2} ${item.y + 3}`}
                    stroke="#E08576" strokeWidth="2" strokeLinecap="round" fill="none"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 0.6, x: 0 }}
                    transition={{ duration: 0.4, delay: item.delay + 0.2 }}
                />
            </motion.g>
        ))}
        
        {/* Success checkmark */}
        <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.2, ease: "backOut" }}
        >
            <circle cx="390" cy="90" r="16" fill="#E08576" opacity="0.2"/>
            <motion.path
                d="M 382 90 L 388 96 L 400 84"
                stroke="#E08576" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 1.4 }}
            />
        </motion.g>
        
        {/* Pulse rings */}
        {[0, 1, 2].map((i) => (
            <motion.circle
                key={i}
                cx="300" cy="152" r="70"
                fill="none" stroke="#E08576" strokeWidth="1"
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 2.5, delay: i * 0.8, repeat: Infinity, ease: "easeOut" }}
            />
        ))}
    </svg>
);

// Discovery Call - Video/Communication Animation
const DiscoveryIllustration: React.FC = () => (
    <svg viewBox="0 0 600 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
            <linearGradient id="screenGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E08576" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#E08576" stopOpacity="0.05"/>
            </linearGradient>
        </defs>
        
        {/* Connection lines background */}
        {[...Array(5)].map((_, i) => (
            <motion.line
                key={i}
                x1={100 + i * 50} y1="280" x2={300} y2="150"
                stroke="#E08576" strokeWidth="1" strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.1 }}
                transition={{ duration: 1, delay: i * 0.1 }}
            />
        ))}
        {[...Array(5)].map((_, i) => (
            <motion.line
                key={i}
                x1={350 + i * 50} y1="280" x2={300} y2="150"
                stroke="#E08576" strokeWidth="1" strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.1 }}
                transition={{ duration: 1, delay: i * 0.1 }}
            />
        ))}
        
        {/* Main video screen */}
        <motion.g
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Screen shadow */}
            <ellipse cx="260" cy="220" rx="90" ry="15" fill="#E08576" opacity="0.1"/>
            
            {/* Screen background */}
            <rect x="160" y="60" width="200" height="145" rx="16" fill="url(#screenGlow)"/>
            <rect x="160" y="60" width="200" height="145" rx="16" fill="none" stroke="#E08576" strokeWidth="2"/>
            
            {/* Screen header bar */}
            <rect x="160" y="60" width="200" height="25" rx="16" fill="#E08576" opacity="0.15"/>
            <rect x="160" y="75" width="200" height="10" fill="#E08576" opacity="0.15"/>
            
            {/* Window controls */}
            {[0, 1, 2].map((i) => (
                <circle key={i} cx={175 + i * 14} cy="72" r="4" fill="#E08576" opacity={0.4 - i * 0.1}/>
            ))}
            
            {/* Person avatar */}
            <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4, ease: "backOut" }}
            >
                <circle cx="260" cy="125" r="28" fill="#E08576" opacity="0.2"/>
                <circle cx="260" cy="118" r="14" fill="#E08576" opacity="0.4"/>
                <ellipse cx="260" cy="155" rx="22" ry="16" fill="#E08576" opacity="0.3"/>
            </motion.g>
            
            {/* Mute/unmute icons */}
            <motion.g
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <circle cx="230" cy="185" r="12" fill="#E08576" opacity="0.2"/>
                <circle cx="260" cy="185" r="12" fill="#E08576" opacity="0.15"/>
                <circle cx="290" cy="185" r="12" fill="#E08576" opacity="0.2"/>
            </motion.g>
        </motion.g>
        
        {/* Secondary video (small) */}
        <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6, ease: "backOut" }}
        >
            <rect x="400" y="100" width="90" height="70" rx="10" fill="#E08576" opacity="0.1"/>
            <rect x="400" y="100" width="90" height="70" rx="10" fill="none" stroke="#E08576" strokeWidth="1.5"/>
            <circle cx="445" cy="125" r="12" fill="#E08576" opacity="0.3"/>
            <ellipse cx="445" cy="150" rx="16" ry="10" fill="#E08576" opacity="0.2"/>
        </motion.g>
        
        {/* Animated sound waves */}
        <motion.g>
            {[0, 1, 2, 3].map((i) => (
                <motion.rect
                    key={i}
                    x={95 + i * 12} y={130 - i * 5}
                    width="6" height={20 + i * 10} rx="3"
                    fill="#E08576"
                    initial={{ scaleY: 0.3 }}
                    animate={{ scaleY: [0.3, 1, 0.5, 0.8, 0.3] }}
                    transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
                    style={{ originY: 1 }}
                />
            ))}
        </motion.g>
        
        {/* Signal waves from camera */}
        {[0, 1, 2].map((i) => (
            <motion.path
                key={i}
                d={`M 500 ${125 - i * 15} Q 520 135 500 ${145 + i * 15}`}
                fill="none" stroke="#E08576" strokeWidth="2" strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 - i * 0.15 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
            />
        ))}
        
        {/* Chat typing indicator */}
        <motion.g
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
        >
            <rect x="160" y="235" width="120" height="35" rx="18" fill="#E08576" opacity="0.15"/>
            {[0, 1, 2].map((i) => (
                <motion.circle
                    key={i}
                    cx={195 + i * 18} cy="252" r="5"
                    fill="#E08576" opacity="0.5"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                />
            ))}
        </motion.g>
        
        {/* Recording indicator with pulse */}
        <motion.g>
            <motion.circle
                cx="350" cy="72" r="12"
                fill="#E08576" opacity="0.1"
                animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.circle
                cx="350" cy="72" r="5"
                fill="#E08576"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
            />
        </motion.g>
    </svg>
);

// Audit - Magnifying Glass & Data Analysis
const AuditIllustration: React.FC = () => (
    <svg viewBox="0 0 600 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
            <linearGradient id="lensGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E08576" stopOpacity="0.15"/>
                <stop offset="100%" stopColor="#E08576" stopOpacity="0.02"/>
            </linearGradient>
            <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E08576" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#E08576" stopOpacity="0.15"/>
            </linearGradient>
        </defs>
        
        {/* Data bars with gradient */}
        {[
            { x: 100, h: 90, delay: 0.1, highlight: false },
            { x: 150, h: 130, delay: 0.15, highlight: false },
            { x: 200, h: 70, delay: 0.2, highlight: true },
            { x: 250, h: 160, delay: 0.25, highlight: true },
            { x: 300, h: 110, delay: 0.3, highlight: true },
            { x: 350, h: 85, delay: 0.35, highlight: false },
            { x: 400, h: 140, delay: 0.4, highlight: false },
            { x: 450, h: 100, delay: 0.45, highlight: false },
        ].map((bar, i) => (
            <motion.g key={i}>
                <motion.rect
                    x={bar.x} y={260 - bar.h} width="38" height={bar.h} rx="6"
                    fill="url(#barGradient)"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.4, delay: bar.delay, ease: "backOut" }}
                    style={{ originY: 1 }}
                />
                {bar.highlight && (
                    <motion.rect
                        x={bar.x} y={260 - bar.h} width="38" height={bar.h} rx="6"
                        fill="none" stroke="#E08576" strokeWidth="2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, delay: 1 + i * 0.2, repeat: Infinity }}
                    />
                )}
            </motion.g>
        ))}
        
        {/* Magnifying glass */}
        <motion.g
            initial={{ x: -80, y: 30, opacity: 0, rotate: -10 }}
            animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
            {/* Lens glass fill */}
            <circle cx="275" cy="130" r="55" fill="url(#lensGradient)"/>
            
            {/* Lens ring */}
            <circle cx="275" cy="130" r="55" fill="none" stroke="#E08576" strokeWidth="4"/>
            
            {/* Inner lens detail */}
            <circle cx="275" cy="130" r="45" fill="none" stroke="#E08576" strokeWidth="1" opacity="0.3"/>
            
            {/* Lens highlight */}
            <path d="M 240 105 Q 255 90 280 90" fill="none" stroke="#E08576" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
            
            {/* Handle */}
            <rect x="315" y="170" width="12" height="70" rx="6" fill="#E08576" opacity="0.8" transform="rotate(45 321 205)"/>
            <rect x="317" y="172" width="8" height="65" rx="4" fill="#E08576" opacity="0.4" transform="rotate(45 321 205)"/>
        </motion.g>
        
        {/* Scanning effect inside lens */}
        <motion.line
            x1="230" y1="130" x2="320" y2="130"
            stroke="#E08576" strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ 
                opacity: [0, 0.8, 0],
                y1: [100, 160, 100],
                y2: [100, 160, 100]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Data points found */}
        {[
            { x: 255, y: 115, delay: 1.2 },
            { x: 280, y: 140, delay: 1.4 },
            { x: 295, y: 120, delay: 1.6 },
        ].map((point, i) => (
            <motion.g key={i}>
                <motion.circle
                    cx={point.x} cy={point.y} r="6"
                    fill="#E08576"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.3, 1] }}
                    transition={{ duration: 0.4, delay: point.delay }}
                />
                <motion.circle
                    cx={point.x} cy={point.y} r="12"
                    fill="none" stroke="#E08576" strokeWidth="1"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 2, opacity: [0.5, 0] }}
                    transition={{ duration: 1, delay: point.delay + 0.2, repeat: Infinity }}
                />
            </motion.g>
        ))}
        
        {/* Analysis results floating */}
        {[
            { x: 480, y: 60, text: "+47%", delay: 1.3 },
            { x: 120, y: 45, text: "-12%", delay: 1.5 },
            { x: 500, y: 180, text: "OK", delay: 1.7 },
        ].map((item, i) => (
            <motion.g key={i}>
                <motion.rect
                    x={item.x - 25} y={item.y - 12} width="50" height="24" rx="12"
                    fill="#E08576" opacity="0.15"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.15 }}
                    transition={{ duration: 0.3, delay: item.delay }}
                />
                <motion.text
                    x={item.x} y={item.y + 5}
                    fill="#E08576" fontSize="12" fontWeight="bold" textAnchor="middle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 0.3, delay: item.delay + 0.1 }}
                >
                    {item.text}
                </motion.text>
            </motion.g>
        ))}
        
        {/* Checkmarks */}
        {[
            { x: 169, y: 55, delay: 1.8 },
            { x: 419, y: 50, delay: 2.0 },
        ].map((check, i) => (
            <motion.g key={i}>
                <motion.circle
                    cx={check.x} cy={check.y} r="14"
                    fill="#E08576" opacity="0.2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: check.delay }}
                />
                <motion.path
                    d={`M ${check.x - 8} ${check.y} L ${check.x} ${check.y + 8} L ${check.x + 12} ${check.y - 8}`}
                    fill="none" stroke="#E08576" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    transition={{ duration: 0.4, delay: check.delay }}
                />
            </motion.g>
        ))}
    </svg>
);

// Strategy - Mind Map Animation
const StrategyIllustration: React.FC = () => (
    <svg viewBox="0 0 600 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
            <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E08576" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#E08576" stopOpacity="0.1"/>
            </linearGradient>
        </defs>
        
        {/* Animated connection lines with flow effect */}
        {[
            { x1: 300, y1: 150, x2: 140, y2: 65, delay: 0.2 },
            { x1: 300, y1: 150, x2: 460, y2: 65, delay: 0.3 },
            { x1: 300, y1: 150, x2: 90, y2: 150, delay: 0.4 },
            { x1: 300, y1: 150, x2: 510, y2: 150, delay: 0.5 },
            { x1: 300, y1: 150, x2: 140, y2: 235, delay: 0.6 },
            { x1: 300, y1: 150, x2: 460, y2: 235, delay: 0.7 },
        ].map((line, i) => (
            <motion.g key={i}>
                {/* Line background */}
                <motion.line
                    x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                    stroke="#E08576" strokeWidth="2" opacity="0.2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: line.delay }}
                />
                {/* Animated pulse along line */}
                <motion.circle
                    r="4" fill="#E08576"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0, 0.8, 0],
                        cx: [line.x1, line.x2],
                        cy: [line.y1, line.y2]
                    }}
                    transition={{ duration: 2, delay: line.delay + 0.5, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.g>
        ))}
        
        {/* Central hub node */}
        <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
        >
            {/* Outer glow */}
            <motion.circle
                cx="300" cy="150" r="50"
                fill="#E08576" opacity="0.1"
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Main circle */}
            <circle cx="300" cy="150" r="38" fill="url(#nodeGradient)"/>
            <circle cx="300" cy="150" r="38" fill="none" stroke="#E08576" strokeWidth="2"/>
            {/* Inner ring */}
            <circle cx="300" cy="150" r="25" fill="none" stroke="#E08576" strokeWidth="1" opacity="0.5"/>
            {/* Center icon - target/crosshair */}
            <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ originX: "300px", originY: "150px" }}
            >
                <line x1="300" y1="135" x2="300" y2="145" stroke="#E08576" strokeWidth="2" strokeLinecap="round"/>
                <line x1="300" y1="155" x2="300" y2="165" stroke="#E08576" strokeWidth="2" strokeLinecap="round"/>
                <line x1="285" y1="150" x2="295" y2="150" stroke="#E08576" strokeWidth="2" strokeLinecap="round"/>
                <line x1="305" y1="150" x2="315" y2="150" stroke="#E08576" strokeWidth="2" strokeLinecap="round"/>
            </motion.g>
            <circle cx="300" cy="150" r="5" fill="#E08576"/>
        </motion.g>
        
        {/* Outer nodes with icons */}
        {[
            { cx: 140, cy: 65, r: 26, icon: "user", label: "ICP", delay: 0.4 },
            { cx: 460, cy: 65, r: 26, icon: "chart", label: "KPI", delay: 0.5 },
            { cx: 90, cy: 150, r: 22, icon: "target", label: "Goals", delay: 0.6 },
            { cx: 510, cy: 150, r: 22, icon: "message", label: "Copy", delay: 0.7 },
            { cx: 140, cy: 235, r: 20, icon: "calendar", label: "Plan", delay: 0.8 },
            { cx: 460, cy: 235, r: 20, icon: "rocket", label: "Launch", delay: 0.9 },
        ].map((node, i) => (
            <motion.g key={i}>
                <motion.circle
                    cx={node.cx} cy={node.cy} r={node.r}
                    fill="url(#nodeGradient)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: node.delay, ease: "backOut" }}
                />
                <motion.circle
                    cx={node.cx} cy={node.cy} r={node.r}
                    fill="none" stroke="#E08576" strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: node.delay, ease: "backOut" }}
                />
                {/* Inner icon placeholder */}
                <motion.circle
                    cx={node.cx} cy={node.cy} r={node.r * 0.4}
                    fill="#E08576" opacity="0.4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: node.delay + 0.15 }}
                />
                {/* Label */}
                <motion.text
                    x={node.cx} y={node.cy + node.r + 16}
                    fill="#E08576" fontSize="10" fontWeight="bold" textAnchor="middle" opacity="0.7"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 0.7, y: 0 }}
                    transition={{ duration: 0.3, delay: node.delay + 0.2 }}
                >
                    {node.label}
                </motion.text>
            </motion.g>
        ))}
        
        {/* Decorative orbiting dots */}
        {[0, 1, 2].map((i) => (
            <motion.circle
                key={i}
                r="3" fill="#E08576" opacity="0.5"
                animate={{
                    cx: [300 + 70 * Math.cos(i * 2.1), 300 + 70 * Math.cos(i * 2.1 + Math.PI), 300 + 70 * Math.cos(i * 2.1)],
                    cy: [150 + 70 * Math.sin(i * 2.1), 150 + 70 * Math.sin(i * 2.1 + Math.PI), 150 + 70 * Math.sin(i * 2.1)]
                }}
                transition={{ duration: 8, delay: i * 0.5, repeat: Infinity, ease: "linear" }}
            />
        ))}
    </svg>
);

// Launch - Rocket Animation
const LaunchIllustration: React.FC = () => (
    <svg viewBox="0 0 600 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
            <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E08576" stopOpacity="0.9"/>
                <stop offset="50%" stopColor="#E08576" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#E08576" stopOpacity="0.2"/>
            </linearGradient>
            <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E08576" stopOpacity="0.1"/>
                <stop offset="50%" stopColor="#E08576" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#E08576" stopOpacity="0.1"/>
            </linearGradient>
        </defs>
        
        {/* Stars background */}
        {[...Array(20)].map((_, i) => (
            <motion.circle
                key={i}
                cx={50 + (i * 29) % 500}
                cy={30 + (i * 37) % 200}
                r={1 + (i % 2)}
                fill="#E08576"
                animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.2, 1] }}
                transition={{ duration: 2 + (i % 3), delay: i * 0.15, repeat: Infinity }}
            />
        ))}
        
        {/* Launch pad with glow */}
        <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <ellipse cx="300" cy="270" rx="100" ry="15" fill="#E08576" opacity="0.1"/>
            <rect x="200" y="262" width="200" height="10" rx="5" fill="#E08576" opacity="0.3"/>
            {/* Support structures */}
            <rect x="230" y="230" width="8" height="35" rx="2" fill="#E08576" opacity="0.2"/>
            <rect x="362" y="230" width="8" height="35" rx="2" fill="#E08576" opacity="0.2"/>
        </motion.g>
        
        {/* Rocket */}
        <motion.g
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "backOut" }}
        >
            {/* Rocket body fill */}
            <path
                d="M 300 40 Q 330 70 330 100 L 330 175 L 315 200 L 285 200 L 270 175 L 270 100 Q 270 70 300 40 Z"
                fill="url(#rocketBody)"
            />
            {/* Rocket body outline */}
            <path
                d="M 300 40 Q 330 70 330 100 L 330 175 L 315 200 L 285 200 L 270 175 L 270 100 Q 270 70 300 40 Z"
                fill="none" stroke="#E08576" strokeWidth="2"
            />
            
            {/* Rocket window */}
            <circle cx="300" cy="100" r="18" fill="#E08576" opacity="0.15"/>
            <circle cx="300" cy="100" r="18" fill="none" stroke="#E08576" strokeWidth="2"/>
            <circle cx="300" cy="100" r="12" fill="none" stroke="#E08576" strokeWidth="1" opacity="0.5"/>
            {/* Window shine */}
            <path d="M 290 93 Q 295 88 305 90" stroke="#E08576" strokeWidth="2" strokeLinecap="round" opacity="0.5" fill="none"/>
            
            {/* Body stripes */}
            <rect x="285" y="130" width="30" height="4" rx="2" fill="#E08576" opacity="0.3"/>
            <rect x="285" y="140" width="30" height="4" rx="2" fill="#E08576" opacity="0.2"/>
            
            {/* Fins */}
            <path d="M 270 155 L 235 200 L 245 200 L 270 175" fill="#E08576" opacity="0.4" stroke="#E08576" strokeWidth="1.5"/>
            <path d="M 330 155 L 365 200 L 355 200 L 330 175" fill="#E08576" opacity="0.4" stroke="#E08576" strokeWidth="1.5"/>
            
            {/* Nose cone highlight */}
            <path d="M 300 40 Q 285 60 280 80" stroke="#E08576" strokeWidth="2" opacity="0.4" fill="none" strokeLinecap="round"/>
        </motion.g>
        
        {/* Animated flame */}
        <motion.g>
            {/* Main flame */}
            <motion.path
                d="M 285 200 Q 285 230 300 265 Q 315 230 315 200"
                fill="url(#flameGradient)"
                animate={{ 
                    d: [
                        "M 285 200 Q 285 230 300 265 Q 315 230 315 200",
                        "M 285 200 Q 280 240 300 275 Q 320 240 315 200",
                        "M 285 200 Q 285 230 300 265 Q 315 230 315 200"
                    ]
                }}
                transition={{ duration: 0.4, repeat: Infinity }}
            />
            {/* Inner flame */}
            <motion.path
                d="M 292 200 Q 292 225 300 250 Q 308 225 308 200"
                fill="#E08576" opacity="0.7"
                animate={{ 
                    d: [
                        "M 292 200 Q 292 225 300 250 Q 308 225 308 200",
                        "M 292 200 Q 288 235 300 260 Q 312 235 308 200",
                        "M 292 200 Q 292 225 300 250 Q 308 225 308 200"
                    ]
                }}
                transition={{ duration: 0.3, repeat: Infinity }}
            />
            {/* Flame particles */}
            {[...Array(6)].map((_, i) => (
                <motion.circle
                    key={i}
                    r={3 + (i % 2) * 2}
                    fill="#E08576"
                    initial={{ cx: 300, cy: 220, opacity: 0.8 }}
                    animate={{ 
                        cx: 300 + (i % 2 === 0 ? -1 : 1) * (10 + i * 5),
                        cy: [220, 270],
                        opacity: [0.8, 0]
                    }}
                    transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
                />
            ))}
        </motion.g>
        
        {/* Smoke clouds with animation */}
        {[
            { cx: 250, cy: 255, r: 25 },
            { cx: 300, cy: 268, r: 30 },
            { cx: 350, cy: 255, r: 25 },
            { cx: 210, cy: 265, r: 18 },
            { cx: 390, cy: 265, r: 18 },
        ].map((cloud, i) => (
            <motion.circle
                key={i}
                cx={cloud.cx} cy={cloud.cy} r={cloud.r}
                fill="#E08576" opacity="0.15"
                initial={{ scale: 0, y: 0 }}
                animate={{ scale: [0, 1.3, 1], y: [0, 15], opacity: [0.15, 0.25, 0.1] }}
                transition={{ duration: 2, delay: 0.8 + i * 0.15, repeat: Infinity }}
            />
        ))}
        
        {/* Launch countdown badges */}
        <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
        >
            <rect x="80" y="130" width="70" height="30" rx="15" fill="#E08576" opacity="0.15"/>
            <text x="115" y="150" fill="#E08576" fontSize="12" fontWeight="bold" textAnchor="middle" opacity="0.8">LIVE</text>
        </motion.g>
        
        {/* Progress indicators */}
        {[
            { x: 450, y: 80, label: "100%" },
            { x: 470, y: 130, label: "GO" },
        ].map((item, i) => (
            <motion.g key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.2 }}
            >
                <circle cx={item.x} cy={item.y} r="20" fill="#E08576" opacity="0.15"/>
                <text x={item.x} y={item.y + 4} fill="#E08576" fontSize="10" fontWeight="bold" textAnchor="middle" opacity="0.8">{item.label}</text>
            </motion.g>
        ))}
    </svg>
);

// Scale - Growth Chart Animation
const ScaleIllustration: React.FC = () => (
    <svg viewBox="0 0 600 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E08576" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#E08576" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="lineGlow" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E08576" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#E08576" stopOpacity="1"/>
            </linearGradient>
        </defs>
        
        {/* Background horizontal lines */}
        {[0, 1, 2, 3, 4].map((i) => (
            <motion.line
                key={i}
                x1="80" y1={250 - i * 50} x2="530" y2={250 - i * 50}
                stroke="#E08576" strokeWidth="1" strokeDasharray="4 8" opacity="0.1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
            />
        ))}
        
        {/* Y-axis labels */}
        {["0", "25%", "50%", "75%", "100%"].map((label, i) => (
            <motion.text
                key={i}
                x="70" y={255 - i * 50}
                fill="#E08576" fontSize="10" textAnchor="end" opacity="0.5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0.5, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
            >
                {label}
            </motion.text>
        ))}
        
        {/* Area fill with gradient */}
        <motion.path
            d="M 80 240 Q 140 235 180 210 T 280 155 T 380 95 T 500 45 L 500 250 L 80 250 Z"
            fill="url(#chartGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
        />
        
        {/* Growth curve with glow effect */}
        <motion.path
            d="M 80 240 Q 140 235 180 210 T 280 155 T 380 95 T 500 45"
            fill="none" stroke="url(#lineGlow)" strokeWidth="4" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        />
        
        {/* Animated particle along curve */}
        <motion.circle
            r="6" fill="#E08576"
            initial={{ opacity: 0 }}
            animate={{
                opacity: [0, 1, 1, 0],
                cx: [80, 180, 380, 500],
                cy: [240, 210, 95, 45]
            }}
            transition={{ duration: 3, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Data points with enhanced styling */}
        {[
            { x: 80, y: 240, value: "Start", delay: 0.6 },
            { x: 180, y: 210, value: "+50%", delay: 0.8 },
            { x: 280, y: 155, value: "+120%", delay: 1.0 },
            { x: 380, y: 95, value: "+250%", delay: 1.2 },
            { x: 500, y: 45, value: "+400%", delay: 1.4 },
        ].map((point, i) => (
            <motion.g key={i}>
                {/* Outer glow */}
                <motion.circle
                    cx={point.x} cy={point.y} r="20"
                    fill="#E08576" opacity="0.1"
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, delay: point.delay + 0.5, repeat: Infinity }}
                />
                {/* Point ring */}
                <motion.circle
                    cx={point.x} cy={point.y} r="12"
                    fill="none" stroke="#E08576" strokeWidth="2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.5 }}
                    transition={{ duration: 0.3, delay: point.delay }}
                />
                {/* Center point */}
                <motion.circle
                    cx={point.x} cy={point.y} r="6"
                    fill="#E08576"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: point.delay, ease: "backOut" }}
                />
                {/* Value label */}
                {i > 0 && (
                    <motion.g
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: point.delay + 0.3 }}
                    >
                        <rect 
                            x={point.x - 25} y={point.y - 35} 
                            width="50" height="22" rx="11" 
                            fill="#E08576" opacity="0.2"
                        />
                        <text
                            x={point.x} y={point.y - 20}
                            fill="#E08576" fontSize="11" fontWeight="bold" textAnchor="middle"
                        >
                            {point.value}
                        </text>
                    </motion.g>
                )}
            </motion.g>
        ))}
        
        {/* Trend arrow with animation */}
        <motion.g
            initial={{ opacity: 0, x: -30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8, ease: "backOut" }}
        >
            <circle cx="540" cy="55" r="22" fill="#E08576" opacity="0.15"/>
            <path
                d="M 530 65 L 540 50 L 550 65 M 540 50 L 540 70"
                fill="none" stroke="#E08576" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            />
        </motion.g>
        
        {/* Revenue badge */}
        <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 }}
        >
            <rect x="420" y="130" width="90" height="40" rx="20" fill="#E08576" opacity="0.15"/>
            <text x="465" y="145" fill="#E08576" fontSize="10" textAnchor="middle" opacity="0.7">REVENUE</text>
            <text x="465" y="162" fill="#E08576" fontSize="14" fontWeight="bold" textAnchor="middle">$2.4M</text>
        </motion.g>
    </svg>
);

// Map step ID to illustration component
const STEP_ILLUSTRATIONS: Record<string, React.FC> = {
    application: ApplicationIllustration,
    discovery: DiscoveryIllustration,
    audit: AuditIllustration,
    strategy: StrategyIllustration,
    launch: LaunchIllustration,
    scale: ScaleIllustration,
};

interface ProcessStep {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    icon: React.ElementType;
    duration: string;
    deliverables: string[];
    keyMetrics?: string[];
    nextSteps?: string;
}

const PROCESS_STEPS: ProcessStep[] = [
    {
        id: 'application',
        title: 'Application',
        description: 'You reach out to us via the contact form or schedule a call. We review your business and confirm if we are a good fit.',
        longDescription: 'The first step in our partnership begins with understanding your business needs. We evaluate your current marketing performance, revenue goals, and growth potential to ensure we can deliver measurable results. Our team reviews your application within 24 hours and schedules an initial consultation to discuss your objectives.',
        icon: Send,
        duration: 'Day 1',
        deliverables: ['Initial consultation', 'Business fit assessment', 'Project scope overview'],
        keyMetrics: ['Response time: <24 hours', 'Fit assessment accuracy: 95%', 'Initial consultation rate: 100%'],
        nextSteps: 'Discovery call scheduled within 48 hours'
    },
    {
        id: 'discovery',
        title: 'Discovery Call',
        description: 'A 30-minute video call to understand your goals, challenges, and current marketing infrastructure. No sales pitch, just strategy.',
        longDescription: 'During this deep-dive session, we map out your entire customer journey, identify bottlenecks in your funnel, and uncover hidden revenue opportunities. We analyze your current ad spend, conversion rates, and customer acquisition costs to build a comprehensive picture of your marketing ecosystem.',
        icon: Video,
        duration: 'Day 2-3',
        deliverables: ['Goals alignment session', 'Current state analysis', 'Opportunity identification'],
        keyMetrics: ['Call duration: 30-45 minutes', 'Data points collected: 50+', 'Opportunities identified: 5-10'],
        nextSteps: 'Comprehensive audit report delivered within 3 days'
    },
    {
        id: 'audit',
        title: 'The Audit',
        description: 'Before we build, we diagnose. We tear down your current infrastructure to find exactly where you are losing money.',
        longDescription: 'Our team conducts a forensic analysis of your marketing stack, tracking every dollar spent and every conversion path. We identify revenue leaks, inefficient ad placements, and underperforming campaigns. The audit reveals exactly where your marketing budget is being wasted and where the biggest growth opportunities lie.',
        icon: Search,
        duration: 'Week 1',
        deliverables: ['Full marketing audit', 'Competitor analysis', 'Revenue leak report'],
        keyMetrics: ['Average revenue leaks found: $50K+', 'Audit depth: 100+ touchpoints', 'ROI improvement potential: 200-400%'],
        nextSteps: 'Custom strategy roadmap presented in Week 2'
    },
    {
        id: 'strategy',
        title: 'The Strategy',
        description: 'No guesswork. We build a custom roadmap based on data, defining your ideal customer and the exact message that converts them.',
        longDescription: 'Based on audit findings, we create a data-driven growth blueprint tailored to your business. We define your Ideal Customer Profile (ICP), develop conversion-optimized messaging, and map out the exact campaigns and channels that will drive revenue. Every decision is backed by data, not assumptions.',
        icon: PenTool,
        duration: 'Week 2',
        deliverables: ['Custom growth roadmap', 'ICP definition', 'Messaging framework'],
        keyMetrics: ['Roadmap accuracy: 95%+', 'ICP match rate: 80%+', 'Messaging conversion lift: 2-3x'],
        nextSteps: 'Campaign launch begins in Week 3'
    },
    {
        id: 'launch',
        title: 'The Launch',
        description: 'Execution mode. We deploy the campaigns, launch the landing pages, and set up the tracking pixel matrix.',
        longDescription: 'This is where strategy becomes reality. We deploy multi-channel campaigns across Google, Meta, and other platforms. Landing pages are optimized for conversion, tracking pixels are installed for complete attribution, and A/B tests are launched simultaneously. Everything is monitored in real-time for immediate optimization.',
        icon: Rocket,
        duration: 'Week 3-4',
        deliverables: ['Campaign deployment', 'Landing page launch', 'Tracking setup'],
        keyMetrics: ['Campaigns launched: 10-20', 'Landing page conversion: 3-5%', 'Tracking accuracy: 99.9%'],
        nextSteps: 'Performance optimization and scaling in Week 5'
    },
    {
        id: 'scale',
        title: 'The Scale',
        description: 'Data optimization. We kill losing ads, double down on winners, and aggressively scale budget while maintaining ROAS.',
        longDescription: 'With real performance data in hand, we eliminate underperforming campaigns and aggressively scale winners. Budget allocation is optimized daily, creative variations are tested continuously, and ROAS targets are maintained while increasing spend. This is where exponential growth happens.',
        icon: BarChart3,
        duration: 'Week 5-6',
        deliverables: ['Performance optimization', 'Budget scaling', 'ROAS maintenance'],
        keyMetrics: ['Average ROAS: 4-6x', 'Budget scale: 2-5x', 'Conversion rate improvement: 50-200%'],
        nextSteps: 'Ongoing optimization and monthly strategy reviews'
    }
];

const ProcessScroll: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className="w-full">
            {/* Header */}
            <div className="max-w-3xl mb-16">
                <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-coral animate-pulse"></span>
                    <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                        Est. Timeline: 4-6 Weeks
                    </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary leading-tight tracking-tight mb-6">
                    The Growth<br />
                    <span className="text-text-secondary">Blueprint</span>
                </h2>
                <p className="text-lg text-text-secondary leading-relaxed">
                    A systematic approach to scaling your business. From audit to execution, every step is calculated for maximum ROI.
                </p>
            </div>

            {/* Horizontal Timeline Tabs - Services Style */}
            <div className="flex justify-start mb-16">
                <div className="bg-surface p-1.5 rounded-2xl border border-black/5 shadow-none inline-flex flex-wrap gap-1">
                    {PROCESS_STEPS.map((step, idx) => {
                        const isActive = activeStep === idx;
                        return (
                            <button
                                key={step.id}
                                onClick={() => setActiveStep(idx)}
                                className={cn(
                                    "relative px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 outline-none",
                                    isActive
                                        ? "text-white shadow-md"
                                        : "text-text-secondary hover:text-text-primary hover:bg-gray-100 dark:hover:bg-neutral-800"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeProcessTab"
                                        className="absolute inset-0 bg-black dark:bg-white rounded-xl"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    <span className={cn(
                                        "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold",
                                        isActive 
                                            ? "bg-white text-black dark:bg-black dark:text-white" 
                                            : "bg-coral/20 text-coral"
                                    )}>
                                        {idx + 1}
                                    </span>
                                    <span className={isActive ? "text-white dark:text-black" : ""}>
                                        {step.title}
                                    </span>
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Active Step Content - Full Width Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-[#191919] rounded-[2rem] p-8 md:p-12 border border-black/5 dark:border-white/10 shadow-lg"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left: Icon + Title + Description */}
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-coral/10 dark:bg-coral/20 flex items-center justify-center shrink-0">
                                    {React.createElement(PROCESS_STEPS[activeStep].icon, {
                                        className: "w-8 h-8 text-coral"
                                    })}
                                </div>
                                <div>
                                    <span className="text-coral text-xs font-bold uppercase tracking-widest mb-1 block">
                                        Step {activeStep + 1} of {PROCESS_STEPS.length}
                                    </span>
                                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-text-primary dark:text-white">
                                        {PROCESS_STEPS[activeStep].title}
                                    </h3>
                                </div>
                            </div>

                            <p className="text-text-secondary dark:text-white/70 text-lg leading-relaxed mb-4">
                                {PROCESS_STEPS[activeStep].description}
                            </p>

                            {PROCESS_STEPS[activeStep].longDescription && (
                                <p className="text-text-secondary dark:text-white/60 text-base leading-relaxed mb-6">
                                    {PROCESS_STEPS[activeStep].longDescription}
                                </p>
                            )}

                            {PROCESS_STEPS[activeStep].nextSteps && (
                                <div className="mb-8 p-4 bg-coral/10 dark:bg-coral/20 rounded-xl border border-coral/20 dark:border-coral/30">
                                    <span className="text-xs font-bold uppercase tracking-widest text-coral mb-2 block">
                                        Next Steps
                                    </span>
                                    <p className="text-text-primary dark:text-white font-medium">
                                        {PROCESS_STEPS[activeStep].nextSteps}
                                    </p>
                                </div>
                            )}

                            <Button size="md" className="inline-flex items-center gap-2">
                                Start Now <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Right: Unified Card with Illustration + Info */}
                        <div className="rounded-2xl overflow-hidden bg-white dark:bg-[#191919] border border-black/5 dark:border-white/10">
                            {/* Illustration Section */}
                            <div className="relative h-[260px] border-b border-black/5 dark:border-white/10 overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={PROCESS_STEPS[activeStep].id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.05 }}
                                        transition={{ duration: 0.4 }}
                                        className="absolute inset-0"
                                    >
                                        {React.createElement(STEP_ILLUSTRATIONS[PROCESS_STEPS[activeStep].id])}
                                    </motion.div>
                                </AnimatePresence>
                                
                                {/* Duration Badge - Floating */}
                                <div className="absolute top-4 left-4">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 dark:bg-black/50 backdrop-blur-sm border border-black/10 dark:border-white/20 shadow-sm">
                                        <span className="font-display text-base font-semibold text-text-primary dark:text-white">
                                            {PROCESS_STEPS[activeStep].duration}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Info Section - Two Columns */}
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* What You Get */}
                                    <div>
                                        <h4 className="text-xs font-semibold uppercase tracking-widest text-text-secondary dark:text-white/60 mb-4">
                                            What You Get
                                        </h4>
                                        <div className="space-y-3">
                                            {PROCESS_STEPS[activeStep].deliverables.map((item, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                                                    className="flex items-center gap-3"
                                                >
                                                    <div className="w-6 h-6 rounded-full bg-coral/10 dark:bg-coral/20 border border-coral/20 dark:border-coral/30 flex items-center justify-center shrink-0">
                                                        <CheckCircle2 className="w-3 h-3 text-coral" />
                                                    </div>
                                                    <span className="font-display font-semibold text-sm text-text-primary dark:text-white">
                                                        {item}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Key Metrics */}
                                    {PROCESS_STEPS[activeStep].keyMetrics && (
                                        <div className="md:border-l md:border-black/5 md:dark:border-white/10 md:pl-6">
                                            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-secondary dark:text-white/60 mb-4">
                                                Key Metrics
                                            </h4>
                                            <div className="space-y-3">
                                                {PROCESS_STEPS[activeStep].keyMetrics?.map((metric, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <div className="w-1.5 h-1.5 rounded-full bg-coral shrink-0" />
                                                        <span className="text-text-secondary dark:text-white/80 text-sm">
                                                            {metric}
                                                        </span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export const ProcessMobileStack = ProcessScroll;

export default ProcessScroll;

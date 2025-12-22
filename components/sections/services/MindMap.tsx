import React, { useMemo, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, Float, QuadraticBezierLine, OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { SERVICE_CATEGORIES, type ServiceCategoryId } from '../../../data/services';
import { cn } from '../../../lib/utils';

// --- Types ---
interface MindMapProps {
    activeCategory?: ServiceCategoryId;
}

// --- Constants ---
const CAT_RADIUS = 10;
const ITEM_RADIUS = 5;

// --- Helper Components ---

/**
 * Connection that hangs slightly like a rope/cable
 */
const HangingConnection = ({ start, end, active, isMain }: { start: THREE.Vector3 | [number, number, number], end: THREE.Vector3 | [number, number, number], active: boolean, isMain?: boolean }) => {
    const vStart = start instanceof THREE.Vector3 ? start : new THREE.Vector3(...start);
    const vEnd = end instanceof THREE.Vector3 ? end : new THREE.Vector3(...end);

    // Calculate simple midpoint
    const mid = new THREE.Vector3().addVectors(vStart, vEnd).multiplyScalar(0.5);
    // Add "sag" (gravity effect)
    // The sagging amount can depend on distance or be fixed
    mid.y -= isMain ? 1 : 0.5;

    return (
        <QuadraticBezierLine
            start={vStart}
            end={vEnd}
            midA={mid}
            lineWidth={active ? 2 : 1}
            color={active ? "#FF7F50" : (isMain ? "#ffffff" : "#666666")}
            transparent
            opacity={active ? 0.8 : 0.2}
            dashScale={5}
        />
    )
}

/**
 * Node Component
 * Renders an HTML label.
 */
const Node = ({ position, label, isHovered, isActive, onClick, onPointerOver, onPointerOut, type = 'item' }: any) => {
    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <Html
                position={position}
                center
                transform
                occlude
                style={{ pointerEvents: 'auto' }}
            >
                <div
                    className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-300",
                        type === 'category'
                            ? isActive
                                ? "bg-coral text-white  scale-110"
                                : "bg-white/10 backdrop-blur-sm text-white  -white/20"
                            : isHovered || isActive
                            ? "bg-coral/80 text-white  scale-105"
                            : "bg-white/5 backdrop-blur-sm text-white/70  -white/10"
                    )}
                    onClick={onClick}
                    onPointerOver={onPointerOver}
                    onPointerOut={onPointerOut}
                >
                    {label}
                </div>
            </Html>
        </Float>
    );
};

// --- Main Scene Component ---
const MindMapScene = ({ activeCategory: propActiveCategory }: MindMapProps) => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Calculate positions
    const { categoryPositions, itemPositions, connections } = useMemo(() => {
        const catPos: Record<string, THREE.Vector3> = {};
        const itemPos: Record<string, THREE.Vector3> = {};
        const conns: Array<{ start: THREE.Vector3; end: THREE.Vector3; isMain: boolean; key: string }> = [];

        // Place categories in a circle
        SERVICE_CATEGORIES.forEach((cat, idx) => {
            const angle = (idx / SERVICE_CATEGORIES.length) * Math.PI * 2;
            const x = Math.cos(angle) * CAT_RADIUS;
            const z = Math.sin(angle) * CAT_RADIUS;
            catPos[cat.id] = new THREE.Vector3(x, 0, z);

            // Place items around each category
            cat.items.forEach((item, itemIdx) => {
                const itemAngle = angle + (itemIdx - cat.items.length / 2) * 0.4;
                const itemX = Math.cos(itemAngle) * (CAT_RADIUS + ITEM_RADIUS);
                const itemZ = Math.sin(itemAngle) * (CAT_RADIUS + ITEM_RADIUS);
                const itemKey = `${cat.id}-${item.slug}`;
                itemPos[itemKey] = new THREE.Vector3(itemX, 0, itemZ);

                // Connection from category to item
                conns.push({
                    start: catPos[cat.id],
                    end: itemPos[itemKey],
                    isMain: false,
                    key: `${cat.id}-${item.slug}`
                });
            });
        });

        return { categoryPositions: catPos, itemPositions: itemPos, connections: conns };
    }, []);

    return (
        <>
            {/* Connections */}
            {connections.map((conn) => {
                const isActive = propActiveCategory && (
                    conn.key.startsWith(propActiveCategory) ||
                    hoveredNode === conn.key
                );
                return (
                    <HangingConnection
                        key={conn.key}
                        start={conn.start}
                        end={conn.end}
                        active={isActive || false}
                        isMain={false}
                    />
                );
            })}

            {/* Category Nodes */}
            {SERVICE_CATEGORIES.map((cat) => {
                const pos = categoryPositions[cat.id];
                const isActive = propActiveCategory === cat.id;
                return (
                    <Node
                        key={cat.id}
                        position={pos}
                        label={cat.label}
                        isActive={isActive}
                        isHovered={hoveredNode === cat.id}
                        type="category"
                        onPointerOver={() => setHoveredNode(cat.id)}
                        onPointerOut={() => setHoveredNode(null)}
                    />
                );
            })}

            {/* Item Nodes */}
            {SERVICE_CATEGORIES.map((cat) =>
                cat.items.map((item) => {
                    const itemKey = `${cat.id}-${item.slug}`;
                    const pos = itemPositions[itemKey];
                    const isActive = propActiveCategory === cat.id;
                    return (
                        <Node
                            key={itemKey}
                            position={pos}
                            label={item.name}
                            isActive={isActive}
                            isHovered={hoveredNode === itemKey}
                            type="item"
                            onPointerOver={() => setHoveredNode(itemKey)}
                            onPointerOut={() => setHoveredNode(null)}
                        />
                    );
                })
            )}
        </>
    );
};

// --- Main Export ---
export default function MindMap({ activeCategory }: MindMapProps) {
    return (
        <div className="w-full h-full min-h-[600px] relative">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 28]} fov={35} />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 1.8}
                    minPolarAngle={Math.PI / 2.2}
                    maxAzimuthAngle={Math.PI / 6}
                    minAzimuthAngle={-Math.PI / 6}
                    rotateSpeed={0.5}
                />
                <Environment preset="city" />
                <MindMapScene activeCategory={activeCategory} />
                {/* Fog for depth */}
                <fog attach="fog" args={['#191919', 20, 50]} />
            </Canvas>

            {/* Instructions or Overlay if needed */}
            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none opacity-30">
                <span className="text-xs text-white uppercase tracking-widest">Interactive 3D Map</span>
            </div>
        </div>
    );
}


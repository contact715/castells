import * as THREE from 'three'
import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, Detailed, Environment } from '@react-three/drei'
import { EffectComposer, DepthOfField, ToneMapping } from '@react-three/postprocessing'

const Banana: React.FC<{ index: number; z: number; speed: number }> = ({ index, z, speed }) => {
    const ref = useRef<THREE.Group>(null)
    const { viewport, camera } = useThree()
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z])

    const { nodes, materials } = useGLTF('/banana-v1-transformed.glb') as {
        nodes: { banana_high: THREE.Mesh };
        materials: { skin: THREE.MeshStandardMaterial };
    }

    const [data] = useState({
        y: THREE.MathUtils.randFloatSpread(height * 2),
        x: THREE.MathUtils.randFloatSpread(2),
        spin: THREE.MathUtils.randFloat(8, 12),
        rX: Math.random() * Math.PI,
        rZ: Math.random() * Math.PI
    })

    useFrame((state, dt) => {
        if (dt < 0.1 && ref.current) {
            ref.current.position.set(index === 0 ? 0 : data.x * width, (data.y += dt * speed), -z)
            ref.current.rotation.set((data.rX += dt / data.spin), Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI, (data.rZ += dt / data.spin))
            if (data.y > height * (index === 0 ? 4 : 1)) data.y = -(height * (index === 0 ? 4 : 1))
        }
    })

    // Using a single mesh to prevent popping/disappearing issues with LOD
    return (
        <group ref={ref}>
            <mesh geometry={nodes.banana_high.geometry} material={materials.skin} material-emissive="#ff9f00" />
        </group>
    )
}

export default function Bananas({ speed = 1, count = 40, depth = 80, easing = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 2)) }) {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
            <Canvas gl={{ antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 20, near: 0.01, far: depth + 40 }}>

                <spotLight position={[10, 20, 10]} penumbra={1} intensity={2} color="#ffbf40" />

                <Suspense fallback={null}>
                    {/* Bananas instances */}
                    {Array.from({ length: count }, (_, i) => <Banana key={i} index={i} z={Math.round(easing(i / count) * depth)} speed={speed} />)}
                </Suspense>

                {/* Post-processing disabled to fix transparent background artifacts */}
                {/* <EffectComposer multisampling={0}>
                    <DepthOfField target={[0, 0, 60]} focalLength={0.4} bokehScale={5} height={700} />
                    <ToneMapping />
                </EffectComposer> */}
            </Canvas>
        </div>
    )
}

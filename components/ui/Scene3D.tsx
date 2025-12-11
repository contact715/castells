import * as THREE from "three"
import { useRef, Suspense, Component, ReactNode } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, Lightformer, ContactShadows, MeshTransmissionMaterial } from "@react-three/drei"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import { easing } from "maath"

// Error Boundary Component
interface ErrorBoundaryProps {
  children: ReactNode
  fallback: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false }
  public props: ErrorBoundaryProps

  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.props = props
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_error: any) {
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("3D Scene Error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

function Rig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [Math.sin(-state.pointer.x) * 5, state.pointer.y * 3.5, 15 + Math.cos(state.pointer.x) * 10],
      0.2,
      delta,
    )
    state.camera.lookAt(0, 0, 0)
  })
}

const Knot = (props: any) => (
  <mesh receiveShadow castShadow {...props}>
    {/* Reduced geometry segments for performance */}
    <torusKnotGeometry args={[3, 1, 128, 16]} />
    {/* Optimized transmission material */}
    <MeshTransmissionMaterial
      backside
      backsideThickness={5}
      thickness={2}
      resolution={256} // Aggressively reduced resolution
      samples={4}      // Aggressively reduced samples
      anisotropy={0}   // Disable anisotropy for performance
    />
  </mesh>
)

// Fallback Box if model fails
function FallbackModel() {
  return (
    <mesh rotation={[0, Math.PI / 4, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#555" roughness={0.5} metalness={0.8} />
    </mesh>
  )
}

export default function Scene3D() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
      {/* Forced dpr to 1 for maximum performance */}
      <Canvas dpr={1} eventSource={document.getElementById("root") || undefined} eventPrefix="client" shadows camera={{ position: [0, 0, 20], fov: 50 }}>

        <spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2} />

        <ErrorBoundary fallback={<FallbackModel />}>
          <Suspense fallback={<FallbackModel />}>
            <Float floatIntensity={2}>
              <Knot />
            </Float>
            <Environment preset="city">
              <Lightformer intensity={8} position={[10, 5, 0]} scale={[10, 50, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
            </Environment>
          </Suspense>
        </ErrorBoundary>

        <ContactShadows scale={100} position={[0, -7.5, 0]} blur={1} far={100} opacity={0.85} />

        <EffectComposer disableNormalPass>
          {/* Removed N8AO and TiltShift for performance. Only Bloom remains. */}
          <Bloom mipmapBlur luminanceThreshold={0.8} intensity={2} levels={8} />
        </EffectComposer>

        <Rig />
      </Canvas>
    </div>
  )
}

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function CentriaLogo3D() {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.4
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.15
    }
  })

  // Create the C shape - BIGGER AND MORE VISIBLE
  const createCShape = () => {
    const shape = new THREE.Shape()
    const outerRadius = 3    // Increased from 2
    const innerRadius = 2     // Increased from 1.4
    const gapAngle = Math.PI * 0.55 // Slightly smaller gap for more visible C

    // Outer arc
    shape.absarc(0, 0, outerRadius, gapAngle, -gapAngle, true)

    // Right side of gap
    const x1 = Math.cos(gapAngle) * outerRadius
    const y1 = Math.sin(gapAngle) * outerRadius
    const x2 = Math.cos(gapAngle) * innerRadius
    const y2 = Math.sin(gapAngle) * innerRadius
    shape.lineTo(x2, y2)

    // Inner arc (reverse)
    shape.absarc(0, 0, innerRadius, gapAngle, -gapAngle, false)

    // Left side of gap
    const x3 = Math.cos(-gapAngle) * innerRadius
    const y3 = Math.sin(-gapAngle) * innerRadius
    const x4 = Math.cos(-gapAngle) * outerRadius
    const y4 = Math.sin(-gapAngle) * outerRadius
    shape.lineTo(x4, y4)

    return shape
  }

  const extrudeSettings = {
    steps: 2,
    depth: 1.2,              // Increased from 0.5
    bevelEnabled: true,
    bevelThickness: 0.15,    // Increased
    bevelSize: 0.15,         // Increased
    bevelSegments: 8         // More segments for smoother bevel
  }

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main C Logo - BRIGHTER */}
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[createCShape(), extrudeSettings]} />
        <meshStandardMaterial
          color="#FF3366"      // Brighter red
          metalness={0.7}       // More metallic
          roughness={0.2}       // Less rough (shinier)
          emissive="#FF1144"    // Brighter emissive
          emissiveIntensity={0.4} // Increased from 0.2
        />
      </mesh>

      {/* Edge highlight for visibility */}
      <mesh>
        <extrudeGeometry args={[createCShape(), extrudeSettings]} />
        <meshBasicMaterial color="#ffffff" wireframe opacity={0.2} transparent />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />

      {/* MUCH BRIGHTER LIGHTING */}
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight
        position={[-10, 5, -5]}
        intensity={1.5}
      />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#ff3366" />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <spotLight position={[0, 10, 0]} angle={0.5} intensity={1.5} color="#ff3366" />

      {/* 3D Logo */}
      <CentriaLogo3D />

      {/* Grid floor for industrial look */}
      <gridHelper args={[20, 20, '#444444', '#222222']} position={[0, -4, 0]} />
    </>
  )
}

export default function Logo3D() {
  return (
    <div style={{ width: '100%', height: '400px', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)' }}>
      <Canvas shadows>
        <Scene />
      </Canvas>
    </div>
  )
}

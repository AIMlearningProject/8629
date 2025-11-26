import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Grid, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

function STLModel({ url, color = '#e31e4c', wireframe = false }) {
  const meshRef = useRef()
  const [geometry, setGeometry] = useState(null)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const loader = new STLLoader()
    loader.load(
      url,
      (loadedGeometry) => {
        loadedGeometry.center()
        loadedGeometry.computeVertexNormals()
        loadedGeometry.computeBoundingBox()

        const bbox = loadedGeometry.boundingBox
        const size = new THREE.Vector3()
        bbox.getSize(size)

        // Calculate statistics
        const vertices = loadedGeometry.attributes.position.count
        const triangles = vertices / 3
        const volume = calculateVolume(loadedGeometry)
        const surfaceArea = calculateSurfaceArea(loadedGeometry)

        setStats({
          vertices,
          triangles: Math.floor(triangles),
          volume: volume.toFixed(2),
          surfaceArea: surfaceArea.toFixed(2),
          dimensions: {
            x: size.x.toFixed(2),
            y: size.y.toFixed(2),
            z: size.z.toFixed(2)
          }
        })

        setGeometry(loadedGeometry)
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
      },
      (error) => {
        console.error('Error loading STL:', error)
      }
    )
  }, [url])

  const calculateVolume = (geometry) => {
    let volume = 0
    const position = geometry.attributes.position

    for (let i = 0; i < position.count; i += 3) {
      const v1 = new THREE.Vector3(
        position.getX(i), position.getY(i), position.getZ(i)
      )
      const v2 = new THREE.Vector3(
        position.getX(i + 1), position.getY(i + 1), position.getZ(i + 1)
      )
      const v3 = new THREE.Vector3(
        position.getX(i + 2), position.getY(i + 2), position.getZ(i + 2)
      )

      volume += signedVolumeOfTriangle(v1, v2, v3)
    }

    return Math.abs(volume)
  }

  const signedVolumeOfTriangle = (p1, p2, p3) => {
    return p1.dot(p2.cross(p3)) / 6.0
  }

  const calculateSurfaceArea = (geometry) => {
    let area = 0
    const position = geometry.attributes.position

    for (let i = 0; i < position.count; i += 3) {
      const v1 = new THREE.Vector3(
        position.getX(i), position.getY(i), position.getZ(i)
      )
      const v2 = new THREE.Vector3(
        position.getX(i + 1), position.getY(i + 1), position.getZ(i + 1)
      )
      const v3 = new THREE.Vector3(
        position.getX(i + 2), position.getY(i + 2), position.getZ(i + 2)
      )

      area += triangleArea(v1, v2, v3)
    }

    return area
  }

  const triangleArea = (v1, v2, v3) => {
    const a = new THREE.Vector3().subVectors(v2, v1)
    const b = new THREE.Vector3().subVectors(v3, v1)
    return a.cross(b).length() / 2
  }

  useFrame((state) => {
    if (meshRef.current && !wireframe) {
      meshRef.current.rotation.y += 0.005
    }
  })

  if (!geometry) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#666" wireframe />
      </mesh>
    )
  }

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        color="#ffffff"
        metalness={0.3}
        roughness={0.4}
        wireframe={wireframe}
      />
    </mesh>
  )
}

function Scene({ modelUrl, showWireframe, modelColor }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[8, 8, 8]} fov={50} />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={3}
        maxDistance={20}
      />

      {/* Bright Lighting Setup for Visibility */}
      <ambientLight intensity={1.2} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-10, 10, -5]} intensity={1.5} />
      <directionalLight position={[0, -10, 0]} intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />

      {/* Model */}
      {modelUrl && <STLModel url={modelUrl} color={modelColor} wireframe={showWireframe} />}

      {/* Environment */}
      <Grid
        args={[20, 20]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#95a5a6"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#3498db"
        fadeDistance={25}
        fadeStrength={1}
        position={[0, -3, 0]}
      />

      <ContactShadows
        position={[0, -2.9, 0]}
        opacity={0.3}
        scale={10}
        blur={2}
        far={4}
      />
    </>
  )
}

export default function STLViewer({ modelUrl, showWireframe = false, modelColor = '#e31e4c', height = '600px' }) {
  return (
    <div style={{ width: '100%', height, background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)', borderRadius: '12px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)' }}>
      <Canvas shadows>
        <Scene modelUrl={modelUrl} showWireframe={showWireframe} modelColor={modelColor} />
      </Canvas>
    </div>
  )
}

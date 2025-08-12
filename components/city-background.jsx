"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Suspense } from "react"

function Building({ position, height, color }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.8, height, 0.8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.1} />
    </mesh>
  )
}

function CityScene() {
  const buildings = []

  // Generate random buildings
  for (let i = 0; i < 50; i++) {
    const x = (Math.random() - 0.5) * 20
    const z = (Math.random() - 0.5) * 20
    const height = Math.random() * 4 + 1
    const colors = ["#9333ea", "#7c3aed", "#6366f1", "#8b5cf6"]
    const color = colors[Math.floor(Math.random() * colors.length)]

    buildings.push(<Building key={i} position={[x, height / 2, z]} height={height} color={color} />)
  }

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#9333ea" />
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#6366f1" />
      {buildings}
    </>
  )
}

export default function CityBackground() {
  return (
    <div className="absolute inset-0 opacity-30">
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <Suspense fallback={null}>
          <CityScene />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  )
}

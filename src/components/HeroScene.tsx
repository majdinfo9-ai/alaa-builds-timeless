import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Structure() {
  const group = useRef<THREE.Group>(null!);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const p = state.pointer;
    mouse.current.x += (p.x - mouse.current.x) * 0.03;
    mouse.current.y += (p.y - mouse.current.y) * 0.03;
    if (group.current) {
      group.current.rotation.y = mouse.current.x * 0.25 + t * 0.03;
      group.current.rotation.x = -mouse.current.y * 0.15 + Math.sin(t * 0.2) * 0.02;
      group.current.position.y = Math.sin(t * 0.3) * 0.05;
    }
  });

  // Elegant architectural wireframe: nested rings + vertical beams
  const rings = [1.6, 2.2, 2.8, 3.4];
  const beams = 12;
  const beamHeight = 3;

  return (
    <group ref={group} scale={viewport.width < 6 ? 0.7 : 1}>
      {rings.map((r, i) => (
        <mesh key={`ring-${i}`} position={[0, -1.4 + i * 0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r - 0.005, r, 128]} />
          <meshBasicMaterial color="#A98A5A" transparent opacity={0.35 - i * 0.05} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {Array.from({ length: beams }).map((_, i) => {
        const a = (i / beams) * Math.PI * 2;
        const r = 3.4;
        return (
          <mesh key={`beam-${i}`} position={[Math.cos(a) * r, 0, Math.sin(a) * r]}>
            <boxGeometry args={[0.02, beamHeight, 0.02]} />
            <meshBasicMaterial color="#171717" transparent opacity={0.35} />
          </mesh>
        );
      })}
      {/* Floor plane grid */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9, 9, 24, 24]} />
        <meshBasicMaterial color="#A98A5A" wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.4, 7], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <Structure />
      </Suspense>
    </Canvas>
  );
}

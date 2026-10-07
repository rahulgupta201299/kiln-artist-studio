"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, Sparkles } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/** Thrown-on-the-wheel ceramic vessels, built from lathe profiles. */
function Vessel({ profile, color, position, scale = 1, speed = 0.3 }: { profile: number[][]; color: string; position: [number, number, number]; scale?: number; speed?: number }) {
  const geo = useMemo(() => {
    // smooth the hand-written profile with a spline so the vessels look thrown, not faceted
    const curve = new THREE.SplineCurve(profile.map(([x, y]) => new THREE.Vector2(x, y)));
    const pts = curve.getPoints(64);
    const g = new THREE.LatheGeometry(pts, 96);
    g.computeVertexNormals();
    return g;
  }, [profile]);
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * speed;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.7}>
      <mesh ref={ref} geometry={geo} position={position} scale={scale}>
        <meshPhysicalMaterial color={color} roughness={0.35} clearcoat={0.8} clearcoatRoughness={0.3} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
}

const vase = [[0, -1], [0.55, -1], [0.75, -0.6], [0.8, -0.1], [0.55, 0.45], [0.3, 0.75], [0.34, 1.0], [0.3, 1.02]];
const bowl = [[0, -0.4], [0.5, -0.4], [0.95, -0.1], [1.15, 0.3], [1.1, 0.32]];
const bottle = [[0, -1.1], [0.45, -1.1], [0.6, -0.7], [0.58, 0], [0.22, 0.45], [0.16, 1.1], [0.2, 1.2], [0.17, 1.22]];

function Rig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.8, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.5, 0.04);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Group({ variant, children }: { variant: "cta" | "about"; children: React.ReactNode }) {
  const { viewport } = useThree();
  const wide = viewport.width > 7;
  const pos: [number, number, number] = wide ? [variant === "cta" ? 1.8 : 2.4, 0.3, 0] : [0, 1.3, -1.5];
  return <group position={pos} scale={wide ? 1 : 0.75}>{children}</group>;
}

export default function VesselScene({ variant = "cta" }: { variant?: "cta" | "about" }) {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 40 }} dpr={[1, 1.6]} gl={{ alpha: true }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 2]} intensity={10} color="#ff7a3c" distance={8} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} color="#ffe1c4" />
      <Suspense fallback={null}>
        <Group variant={variant}>
          <Vessel profile={vase} color="#d9572c" position={[0, 0.2, 0]} scale={1.15} />
          <Vessel profile={bowl} color="#f2ebe3" position={[-2.1, -1.1, -1.2]} scale={0.8} speed={-0.2} />
          <Vessel profile={bottle} color="#5e6b5a" position={[1.9, -0.3, -1]} scale={0.9} speed={0.4} />
        </Group>
        <Sparkles count={50} scale={[10, 5, 5]} size={2} speed={0.3} color="#f0a35e" />
        <Environment resolution={128}>
          <Lightformer form="rect" intensity={3} color="#ffd2ad" position={[0, 4, 4]} scale={[8, 2, 1]} />
          <Lightformer form="ring" intensity={3} color="#e2683c" position={[-5, 0, -2]} scale={3} />
        </Environment>
      </Suspense>
      <Rig />
    </Canvas>
  );
}

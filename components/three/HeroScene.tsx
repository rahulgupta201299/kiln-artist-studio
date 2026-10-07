"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial, RoundedBox, Sparkles } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { paintCanvas } from "@/lib/art";
import { artists } from "@/lib/data";
import { sceneColors, useTheme } from "@/lib/theme";

/** The glowing, breathing "kiln" at the centre of the hero. */
function Core() {
  const mat = useRef<THREE.MeshPhysicalMaterial & { distort: number }>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const [hot, setHot] = useState(false);
  useFrame((s, d) => {
    if (!mesh.current || !mat.current) return;
    mesh.current.rotation.y += d * 0.15;
    mat.current.distort = THREE.MathUtils.lerp(mat.current.distort, hot ? 0.55 : 0.32, 0.06);
    const k = hot ? 1.08 : 1;
    mesh.current.scale.lerp(new THREE.Vector3(k, k, k), 0.08);
  });
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh} onPointerOver={() => setHot(true)} onPointerOut={() => setHot(false)}>
        <icosahedronGeometry args={[1.25, 64]} />
        <MeshDistortMaterial
          ref={mat as never}
          color="#d9572c"
          emissive="#5a1606"
          emissiveIntensity={0.5}
          roughness={0.18}
          metalness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.15}
          distort={0.32}
          speed={1.6}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.25, 0.25, 0]}>
        <torusGeometry args={[2.05, 0.012, 16, 200]} />
        <meshBasicMaterial color="#f0a35e" toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, -0.4, 0.3]}>
        <torusGeometry args={[2.45, 0.006, 16, 200]} />
        <meshBasicMaterial color="#f2ebe3" transparent opacity={0.5} />
      </mesh>
    </Float>
  );
}

/** A framed artwork that floats in the orbit. Click opens the artist. */
function Frame({ index, total, radius, onHover }: { index: number; total: number; radius: number; onHover: (s: string | null) => void }) {
  const a = artists[index % artists.length];
  const router = useRouter();
  const tex = useMemo(() => {
    const t = new THREE.CanvasTexture(paintCanvas(a.seed, a.palette, 384, 480));
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }, [a]);
  const g = useRef<THREE.Group>(null);
  const [hover, setHover] = useState(false);
  const angle = (index / total) * Math.PI * 2;
  const y = Math.sin(index * 1.7) * 0.9;
  useFrame(() => {
    if (!g.current) return;
    const k = hover ? 1.18 : 1;
    g.current.scale.lerp(new THREE.Vector3(k, k, k), 0.12);
    // always turn the artwork to face the camera a little
    g.current.lookAt(0, g.current.position.y * 0.3, 8);
  });
  return (
    <group ref={g} position={[Math.cos(angle) * radius, y, Math.sin(angle) * radius]}>
      <Float speed={2} rotationIntensity={0.25} floatIntensity={0.5}>
        <group
          onPointerOver={(e) => {
            e.stopPropagation();
            setHover(true);
            onHover(a.name);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHover(false);
            onHover(null);
            document.body.style.cursor = "";
          }}
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/artists/${a.slug}`);
          }}
        >
          <RoundedBox args={[1.08, 1.32, 0.06]} radius={0.02} smoothness={3}>
            <meshStandardMaterial color="#1c1512" roughness={0.6} metalness={0.2} />
          </RoundedBox>
          <mesh position={[0, 0, 0.032]}>
            <planeGeometry args={[0.96, 1.2]} />
            <meshStandardMaterial map={tex} roughness={0.85} emissive="#ffffff" emissiveMap={tex} emissiveIntensity={hover ? 0.35 : 0.12} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function Orbit({ count, onHover }: { count: number; onHover: (s: string | null) => void }) {
  const g = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const radius = viewport.width < 7 ? 2.9 : 3.7;
  useFrame((s, d) => {
    if (!g.current) return;
    const scroll = typeof window !== "undefined" ? window.scrollY / window.innerHeight : 0;
    g.current.rotation.y += d * 0.06;
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, 0.12 + scroll * 0.25, 0.05);
  });
  return (
    <group ref={g}>
      {Array.from({ length: count }).map((_, i) => (
        <Frame key={i} index={i} total={count} radius={radius} onHover={onHover} />
      ))}
    </group>
  );
}

/** On wide screens the sculpture sits to the right so the headline stays readable. */
function Stage({ children }: { children: React.ReactNode }) {
  const { viewport } = useThree();
  const wide = viewport.width > 7;
  return (
    <group position={wide ? [2.4, 0.75, -1.2] : [0, 1.1, -1.6]} scale={wide ? 0.9 : 0.8}>
      {children}
    </group>
  );
}

function Rig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    const scroll = window.scrollY / window.innerHeight;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.9, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.4 + pointer.y * 0.5 - scroll * 1.2, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8.2 + scroll * 2.2, 0.06);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  const [theme] = useTheme();
  const c = sceneColors[theme];
  const [label, setLabel] = useState<string | null>(null);
  const [count, setCount] = useState(9);
  useEffect(() => {
    if (window.innerWidth < 700) setCount(6);
  }, []);
  return (
    <>
      <Canvas camera={{ position: [0, 0.4, 8.2], fov: 42 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <color attach="background" args={[c.bg]} />
        <fog attach="fog" args={[c.bg, 8, 16]} />
        <ambientLight intensity={theme === "light" ? 0.6 : 0.25} />
        <pointLight position={[0, 0, 0]} intensity={18} color="#ff7a3c" distance={6} />
        <directionalLight position={[4, 6, 5]} intensity={1.4} color="#ffe1c4" />
        <Suspense fallback={null}>
          <Stage>
            <Core />
            <Orbit count={count} onHover={setLabel} />
          </Stage>
          <Sparkles count={70} scale={[12, 6, 8]} size={2.2} speed={0.35} color={c.sparkle} opacity={0.8} />
          <Environment resolution={256}>
            <Lightformer form="rect" intensity={3} color="#ffd2ad" position={[0, 4, 4]} scale={[8, 2, 1]} />
            <Lightformer form="ring" intensity={4} color="#e2683c" position={[-5, 0, -2]} scale={3} />
            <Lightformer form="rect" intensity={1.5} color="#ffffff" position={[5, 1, 2]} scale={[2, 6, 1]} />
          </Environment>
        </Suspense>
        <Rig />
      </Canvas>
      {label && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 104,
            transform: "translateX(-50%)",
            zIndex: 3,
            padding: "8px 16px",
            borderRadius: 999,
            background: c.label,
            color: c.labelInk,
            border: "1px solid var(--line-2)",
            fontSize: 13,
            backdropFilter: "blur(10px)",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {label} — click to view work
        </div>
      )}
    </>
  );
}

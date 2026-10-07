"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Edges, Environment, Html, Lightformer, OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { spaces, type Space } from "@/lib/data";

function Props({ id, w, d }: { id: string; w: number; d: number }) {
  // tiny furniture so each room reads at a glance
  if (id === "photo")
    return (
      <mesh position={[0, 0.25, -d / 2 + 0.25]}>
        <cylinderGeometry args={[0.45, 0.45, w * 0.8, 24, 1, true, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#f2ebe3" side={THREE.DoubleSide} roughness={0.9} />
      </mesh>
    );
  if (id === "hall")
    return (
      <group>
        {[-0.9, -0.3, 0.3, 0.9].map((x) => (
          <mesh key={x} position={[x, 0.3, -d / 2 + 0.06]}>
            <boxGeometry args={[0.42, 0.32, 0.02]} />
            <meshStandardMaterial color={["#e2683c", "#f0a35e", "#5e6b5a", "#c9b8a6"][Math.abs(Math.round(x * 3)) % 4]} />
          </mesh>
        ))}
        <mesh position={[0, 0.06, 0.3]}>
          <boxGeometry args={[0.8, 0.1, 0.25]} />
          <meshStandardMaterial color="#2a211c" />
        </mesh>
      </group>
    );
  if (id === "sound")
    return (
      <group>
        <mesh position={[0.25, 0.1, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.12, 24]} />
          <meshStandardMaterial color="#e2683c" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[-0.3, 0.08, 0.2]}>
          <boxGeometry args={[0.4, 0.12, 0.25]} />
          <meshStandardMaterial color="#1c1512" />
        </mesh>
      </group>
    );
  if (id === "workshop")
    return (
      <group>
        {[-0.6, 0, 0.6].map((x) => (
          <mesh key={x} position={[x, 0.17, 0]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.04, 0.34, 0.24]} />
            <meshStandardMaterial color="#c9b8a6" />
          </mesh>
        ))}
        <mesh position={[0.7, 0.14, 0.35]}>
          <cylinderGeometry args={[0.12, 0.15, 0.28, 16]} />
          <meshStandardMaterial color="#e2683c" emissive="#e2683c" emissiveIntensity={0.6} />
        </mesh>
      </group>
    );
  return (
    <group>
      {[-0.35, 0.35].map((x) =>
        [-0.35, 0.35].map((z) => (
          <mesh key={`${x}${z}`} position={[x, 0.08, z]}>
            <cylinderGeometry args={[0.16, 0.16, 0.04, 20]} />
            <meshStandardMaterial color="#c9b8a6" />
          </mesh>
        ))
      )}
    </group>
  );
}

function Room({ s, active, onSelect }: { s: Space; active: boolean; onSelect: (id: string) => void }) {
  const g = useRef<THREE.Group>(null);
  const [hover, setHover] = useState(false);
  const [w, h, d] = s.dims;
  useFrame(() => {
    if (!g.current) return;
    const ty = active ? 0.35 : hover ? 0.14 : 0;
    g.current.position.y = THREE.MathUtils.lerp(g.current.position.y, ty, 0.1);
  });
  return (
    <group
      ref={g}
      position={s.pos}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHover(false);
        document.body.style.cursor = "";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(s.id);
      }}
    >
      {/* floor */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[w, 0.04, d]} />
        <meshStandardMaterial color={active ? s.color : "#2a211c"} roughness={0.7} emissive={s.color} emissiveIntensity={active ? 0.25 : hover ? 0.08 : 0} />
      </mesh>
      {/* glass walls */}
      <mesh position={[0, h / 2, 0]}>
        <boxGeometry args={[w, h, d]} />
        <meshPhysicalMaterial color={s.color} transparent opacity={active ? 0.16 : 0.06} roughness={0.1} depthWrite={false} />
        <Edges color={active || hover ? s.color : "#5a4d44"} threshold={15} />
      </mesh>
      <Props id={s.id} w={w} d={d} />
      {(active || hover) && (
      <Html position={[0, h + 0.25, 0]} center distanceFactor={7} zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
        <div
          style={{
            whiteSpace: "nowrap",
            fontSize: 13,
            padding: "6px 12px",
            borderRadius: 999,
            background: active ? s.color : "rgba(14,11,10,.75)",
            color: active ? "#1a0f0a" : "#f2ebe3",
            border: "1px solid rgba(242,235,227,.2)",
            transition: "all .3s",
            fontFamily: "var(--sans)",
          }}
        >
          {s.name}
        </div>
      </Html>
      )}
    </group>
  );
}

export default function StudioScene({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <Canvas camera={{ position: [6.5, 6.2, 7.5], fov: 34 }} dpr={[1, 1.75]} shadows="percentage">
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 4]} intensity={1.6} castShadow color="#ffe7d1" />
      <pointLight position={[-3, 2, 2]} intensity={6} color="#e2683c" distance={8} />
      <Suspense fallback={null}>
        {/* building slab */}
        <mesh position={[0, -0.08, 0]} receiveShadow>
          <boxGeometry args={[7.4, 0.12, 5.2]} />
          <meshStandardMaterial color="#1a1512" roughness={0.9} />
        </mesh>
        <gridHelper args={[7.4, 24, "#3a2f28", "#241d19"]} position={[0, -0.015, 0]} />
        {spaces.map((s) => (
          <Room key={s.id} s={s} active={active === s.id} onSelect={onSelect} />
        ))}
        <ContactShadows position={[0, -0.14, 0]} opacity={0.6} scale={14} blur={2.4} far={4} />
        <Environment resolution={128}>
          <Lightformer form="rect" intensity={2} color="#ffd8b8" position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} />
          <Lightformer form="ring" intensity={2} color="#e2683c" position={[-6, 2, 0]} scale={3} />
        </Environment>
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={0.5}
        maxPolarAngle={1.2}
        autoRotate
        autoRotateSpeed={0.5}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}

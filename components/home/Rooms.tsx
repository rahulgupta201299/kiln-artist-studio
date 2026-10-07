"use client";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";
import { spaces } from "@/lib/data";
import GenArt from "@/components/GenArt";
import { SplitWords } from "@/components/Reveal";

/** Room list with a floating preview that follows the cursor. */
export default function Rooms() {
  const [hover, setHover] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 24 });
  const sy = useSpring(y, { stiffness: 220, damping: 24 });
  return (
    <section className="section" onPointerMove={(e) => { x.set(e.clientX); y.set(e.clientY); }}>
      <div className="wrap">
        <span className="kicker">The studio</span>
        <SplitWords className="h1" text="Five rooms, zero compromises." italicWords={["zero"]} />
        <div style={{ marginTop: 56, borderTop: "1px solid var(--line)" }}>
          {spaces.map((s, i) => (
            <Link
              key={s.id}
              href={`/studio#${s.id}`}
              data-cursor="Explore"
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr auto",
                gap: 20,
                alignItems: "center",
                padding: "28px 0",
                borderBottom: "1px solid var(--line)",
                transition: "opacity .4s, padding .5s var(--ease)",
                opacity: hover === null || hover === i ? 1 : 0.35,
                paddingLeft: hover === i ? 16 : 0,
              }}
            >
              <span className="serif accent" style={{ fontSize: 18 }}>0{i + 1}</span>
              <span className="h2" style={{ fontSize: "clamp(30px,4.4vw,64px)" }}>{s.name}</span>
              <span className="muted" style={{ textAlign: "right", fontSize: 14 }}>
                {s.size}
                <br />
                {s.rate}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: sx,
          y: sy,
          width: 300,
          height: 220,
          marginLeft: -150,
          marginTop: -110,
          borderRadius: 16,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 40,
        }}
        animate={{ scale: hover === null ? 0 : 1, rotate: hover === null ? -8 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {hover !== null && <GenArt seed={300 + hover * 17} palette={[spaces[hover].color, "#f2ebe3", "#1c1512"]} ratio="300 / 220" />}
      </motion.div>
    </section>
  );
}

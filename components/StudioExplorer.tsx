"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { spaces } from "@/lib/data";
import { StudioScene, WhenVisible } from "@/components/three/Lazy";
import Arrow from "./Arrow";

export default function StudioExplorer() {
  const [active, setActive] = useState(spaces[0].id);
  useEffect(() => {
    const h = window.location.hash.replace("#", "");
    if (spaces.some((s) => s.id === h)) {
      setActive(h);
      setTimeout(() => {
        const el = document.getElementById("explorer");
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.scrollY - 90;
        const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number) => void } }).__lenis;
        if (lenis) lenis.scrollTo(y);
        else window.scrollTo({ top: y, behavior: "smooth" });
      }, 900);
    }
  }, []);
  const s = spaces.find((x) => x.id === active)!;
  return (
    <div className="explorer" id="explorer">
      <div className="explorer-canvas" data-cursor="Drag">
        <div className="room-tabs">
          {spaces.map((x) => (
            <button key={x.id} className={`chip ${x.id === active ? "on" : ""}`} onClick={() => setActive(x.id)}>
              {x.name}
            </button>
          ))}
        </div>
        <WhenVisible style={{ position: "absolute", inset: 0 }}>
          <StudioScene active={active} onSelect={setActive} />
        </WhenVisible>
        <div className="explorer-hint">
          <span style={{ width: 22, height: 22, borderRadius: "50%", border: "1px solid var(--line-2)", display: "grid", placeItems: "center" }}>↻</span>
          Drag to orbit · click a room to step inside
        </div>
      </div>
      <div className="panel">
        <AnimatePresence mode="wait">
          <motion.div
            key={s.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <span className="kicker">Room {spaces.findIndex((x) => x.id === s.id) + 1} of {spaces.length}</span>
            <h3 className="h2" style={{ marginTop: 18 }}>{s.name}</h3>
            <p className="muted" style={{ marginTop: 16 }}>{s.blurb}</p>
            <div className="spec">
              <div><small>Size</small>{s.size}</div>
              <div><small>Capacity</small>{s.capacity}</div>
              <div><small>Hourly</small>{s.rate}</div>
              <div><small>Day rate</small>{s.day}</div>
            </div>
            <ul className="gear">{s.gear.map((g) => <li key={g}>{g}</li>)}</ul>
            <div style={{ marginTop: "auto", display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href={`/contact?door=space&room=${s.id}`} className="btn btn-primary">Check availability <Arrow /></Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

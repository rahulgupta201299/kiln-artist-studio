"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { artists, disciplines } from "@/lib/data";
import ArtistCard from "./ArtistCard";

export default function ArtistGrid() {
  const [f, setF] = useState("All");
  const [q, setQ] = useState("");
  const list = useMemo(
    () =>
      artists.filter(
        (a) =>
          (f === "All" || a.discipline === f) &&
          (q === "" || (a.name + a.city + a.tags.join(" ") + a.discipline).toLowerCase().includes(q.toLowerCase()))
      ),
    [f, q]
  );
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div className="filters" role="tablist">
          {disciplines.map((d) => (
            <button key={d} role="tab" aria-selected={f === d} className={`chip ${f === d ? "on" : ""}`} onClick={() => setF(d)}>
              {d}
              <span style={{ opacity: 0.55, marginLeft: 6 }}>{d === "All" ? artists.length : artists.filter((a) => a.discipline === d).length}</span>
            </button>
          ))}
        </div>
        <div className="newsletter" style={{ marginTop: 0, minWidth: 240 }}>
          <input placeholder="Search name, city, style…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search artists" />
          <span className="muted">⌕</span>
        </div>
      </div>
      <motion.div layout className="grid-artists">
        <AnimatePresence mode="popLayout">
          {list.map((a, i) => (
            <motion.div
              layout
              key={a.slug}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 6) * 0.04 }}
            >
              <ArtistCard a={a} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && (
        <p className="lead" style={{ marginTop: 48 }}>
          No one matches that yet — but we have 100+ more artists off-site. <a className="link-u accent" href="/contact?door=hire">Tell us what you need.</a>
        </p>
      )}
    </>
  );
}

"use client";
import Link from "next/link";
import { useRef } from "react";
import { artists } from "@/lib/data";
import ArtistCard from "@/components/ArtistCard";
import { SplitWords } from "@/components/Reveal";
import Arrow from "@/components/Arrow";

export default function Roster() {
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  return (
    <section className="section" style={{ paddingBottom: 60 }}>
      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", marginBottom: 48 }}>
        <div>
          <span className="kicker">The roster</span>
          <SplitWords className="h1" text="Hands we trust." italicWords={["trust."]} />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost" aria-label="Previous" onClick={() => rail.current?.scrollBy({ left: -400, behavior: "smooth" })}>←</button>
          <button className="btn btn-ghost" aria-label="Next" onClick={() => rail.current?.scrollBy({ left: 400, behavior: "smooth" })}>→</button>
          <Link href="/artists" className="btn btn-primary">All 120+ artists <Arrow /></Link>
        </div>
      </div>
      <div
        ref={rail}
        className="rail"
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") return;
          drag.current = { down: true, x: e.clientX, left: rail.current!.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          if (!drag.current.down) return;
          const dx = e.clientX - drag.current.x;
          if (Math.abs(dx) > 5) {
            drag.current.moved = true;
            rail.current!.classList.add("dragging");
          }
          rail.current!.scrollLeft = drag.current.left - dx;
        }}
        onPointerUp={() => {
          drag.current.down = false;
          rail.current!.classList.remove("dragging");
        }}
        onPointerLeave={() => {
          drag.current.down = false;
          rail.current?.classList.remove("dragging");
        }}
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
      >
        {artists.map((a) => (
          <div className="rail-card" key={a.slug}>
            <ArtistCard a={a} />
          </div>
        ))}
      </div>
    </section>
  );
}

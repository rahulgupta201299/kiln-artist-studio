"use client";
import Link from "next/link";
import { useRef } from "react";
import type { Artist } from "@/lib/data";
import GenArt from "./GenArt";

export default function ArtistCard({ a }: { a: Artist }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Link
      href={`/artists/${a.slug}`}
      className="a-card"
      data-cursor="View"
      draggable={false}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ref.current.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      <div className="frame" ref={ref}>
        <GenArt seed={a.seed} palette={a.palette} />
        <span className="tag">{a.discipline}</span>
        <span className="view" aria-hidden>↗</span>
      </div>
      <div className="meta">
        <h3>{a.name}</h3>
        <span>{a.city}</span>
      </div>
    </Link>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";

/** Blend-mode cursor that grows over [data-cursor] elements and shows their label. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x = -100, y = -100, cx = -100, cy = -100, id = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(t ? t.dataset.cursor || "" : null);
    };
    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      id = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    id = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(id);
    };
  }, []);
  return (
    <div ref={ref} className={`cursor ${label !== null ? "big" : ""}`} aria-hidden>
      {label}
    </div>
  );
}

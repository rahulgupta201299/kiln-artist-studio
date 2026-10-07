"use client";
import dynamic from "next/dynamic";
import { ReactNode, useEffect, useRef, useState } from "react";

export const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });
export const StudioScene = dynamic(() => import("./StudioScene"), { ssr: false });
export const VesselScene = dynamic(() => import("./VesselScene"), { ssr: false });

/** Mounts a WebGL scene only while it is near the viewport — keeps the GPU calm. */
export function WhenVisible({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShow(e.isIntersecting), { rootMargin: "200px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={style}>
      {show && children}
    </div>
  );
}

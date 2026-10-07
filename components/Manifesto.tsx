"use client";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const start = i / n;
  const o = useTransform(p, [start, start + 1 / n], [0.14, 1]);
  const accent = w.startsWith("*");
  return (
    <motion.span style={{ opacity: o, color: accent ? "var(--accent)" : undefined, fontStyle: accent ? "italic" : undefined }}>
      {accent ? w.slice(1) : w}
    </motion.span>
  );
}

/** Words light up one by one as you scroll. Prefix a word with * to accent it. */
export default function Manifesto({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="manifesto">
      {words.map((w, i) => (
        <Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />
      ))}
    </p>
  );
}

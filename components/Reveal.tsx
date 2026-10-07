"use client";
import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades + lifts children in when they enter the viewport. */
export function FadeUp({ children, delay = 0, className, y = 40 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Splits a line into words that rise out of a mask, one after another. */
export function SplitWords({
  text,
  className,
  as = "h2",
  delay = 0,
  stagger = 0.06,
  italicWords = [],
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  stagger?: number;
  italicWords?: string[];
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const Tag = as as "h2";
  const words = text.split(" ");
  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.08em", marginBottom: "-0.08em" }}>
          <motion.span
            style={{ display: "inline-block", fontStyle: italicWords.includes(w) ? "italic" : undefined, color: italicWords.includes(w) ? "var(--accent)" : undefined }}
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 1.05, ease, delay: delay + i * stagger }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

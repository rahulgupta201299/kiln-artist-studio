"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setI((i + 1) % testimonials.length), 7000);
    return () => clearTimeout(t);
  }, [i]);
  const q = testimonials[i];
  return (
    <section className="section">
      <div className="wrap quote-wrap">
        <div>
          <span className="kicker">Said about us</span>
          <div className="q-ctrl">
            {testimonials.map((_, k) => (
              <button key={k} className="q-dot" onClick={() => setI(k)} aria-label={`Testimonial ${k + 1}`}>
                {k === i && <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 7, ease: "linear" }} />}
                {k < i && <i />}
              </button>
            ))}
          </div>
        </div>
        <div>
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              <p className="quote">“{q.quote}”</p>
              <p style={{ marginTop: 28 }}>
                {q.name} <span className="muted">— {q.role}</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

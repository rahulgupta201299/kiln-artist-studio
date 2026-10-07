"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroScene } from "@/components/three/Lazy";
import { SplitWords } from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import Arrow from "@/components/Arrow";
import { brand } from "@/lib/data";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-canvas">
        <HeroScene />
      </div>
      <div className="hero-meta">
        <span className="live-dot" />
        3 rooms free this weekend
        <br />
        {brand.city} · Est. 2017
      </div>
      <div className="wrap hero-content">
        <motion.span className="kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
          {brand.tagline}
        </motion.span>
        <SplitWords as="h1" className="display" text="Where art gets made," delay={1.5} stagger={0.08} />
        <SplitWords as="h1" className="display" text="and made to work." delay={1.75} stagger={0.08} italicWords={["work."]} />
        <div className="hero-bottom">
          <motion.p className="lead" style={{ margin: 0 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 0.9 }}>
            A 6,000 sq ft studio you can book by the hour, and a collective of 120+ artists you can commission by the brief. One team holds both — so your shoot, launch or campaign
            just happens.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.35, duration: 0.9 }}>
            <Magnetic>
              <Link href="/contact?door=space" className="btn btn-primary">
                Book the space <Arrow />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/artists" className="btn btn-ghost">
                Find an artist <Arrow />
              </Link>
            </Magnetic>
          </motion.div>
        </div>
        <div className="scroll-hint" style={{ marginTop: 36 }}>
          <i /> Drag the artworks · scroll to enter
        </div>
      </div>
    </section>
  );
}

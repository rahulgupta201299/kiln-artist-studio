"use client";
import Link from "next/link";
import { VesselScene, WhenVisible } from "@/components/three/Lazy";
import { SplitWords } from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import Arrow from "@/components/Arrow";

export default function CTA({ title = "Tell us the brief once. We’ll hold the rest.", italic = ["once."] }: { title?: string; italic?: string[] }) {
  return (
    <section className="section" style={{ paddingBottom: 0 }}>
      <div className="wrap">
        <div className="cta-block">
          <WhenVisible className="canvas">
            <VesselScene variant="cta" />
          </WhenVisible>
          <div className="inner">
            <div style={{ maxWidth: 760 }}>
              <span className="kicker">Reply within 24 hours</span>
              <SplitWords className="h1" text={title} italicWords={italic} />
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Magnetic>
                <Link href="/contact" className="btn btn-primary">Start a project <Arrow /></Link>
              </Magnetic>
              <Magnetic>
                <Link href="/contact?door=space" className="btn btn-ghost">Book a studio tour <Arrow /></Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

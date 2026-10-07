import type { Metadata } from "next";
import Link from "next/link";
import Manifesto from "@/components/Manifesto";
import GenArt from "@/components/GenArt";
import CTA from "@/components/home/CTA";
import { FadeUp, SplitWords } from "@/components/Reveal";
import { VesselScene, WhenVisible } from "@/components/three/Lazy";
import Arrow from "@/components/Arrow";

export const metadata: Metadata = { title: "The Collective" };

const values = [
  { big: "70%", t: "Artists keep the majority", d: "Our commission is 30% — we publish it, because transparency is the point." },
  { big: "48h", t: "Shortlists, not silence", d: "Every brief gets a real answer and named artists within two working days." },
  { big: "1:1", t: "One manager, one artist", d: "Each artist has a dedicated manager who knows their work, rates and limits." },
];

const team = [
  { n: "Ananya Rao", r: "Co-founder · Studio", seed: 401 },
  { n: "Farhan Ali", r: "Co-founder · Talent", seed: 419 },
  { n: "Leela Joshi", r: "Head of Production", seed: 433 },
  { n: "Omar Siddiqui", r: "Artist Manager", seed: 449 },
];

const timeline = [
  { y: "2017", t: "Four friends, one leaky floor", d: "Painters and a sound engineer split rent on a mill unit in Lower Parel." },
  { y: "2019", t: "The first brand calls", d: "A sneaker launch needs a mural, a DJ and a room. We do all three. The model is born." },
  { y: "2021", t: "We take the whole floor", d: "6,000 sq ft, five rooms, a kiln that actually works. Membership opens." },
  { y: "2024", t: "100 artists managed", d: "Talent management becomes a full team. 300th brand project delivered." },
  { y: "Now", t: "Building the next room", d: "A residency program for artists from smaller cities. Applications open soon." },
];

export default function CollectivePage() {
  return (
    <>
      <section className="page-head" style={{ minHeight: "92vh", display: "flex", alignItems: "flex-end" }}>
        <WhenVisible style={{ position: "absolute", inset: 0, opacity: 0.9 }}>
          <VesselScene variant="about" />
        </WhenVisible>
        <div className="wrap" style={{ position: "relative", pointerEvents: "none" }}>
          <span className="kicker">The Collective</span>
          <SplitWords as="h1" className="display" text="Run by artists." delay={0.3} />
          <SplitWords as="h1" className="display" text="Built for them." delay={0.5} italicWords={["them."]} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <span className="kicker" style={{ marginBottom: 32 }}>Our manifesto</span>
          <Manifesto text="We started KILN because good artists were spending more time chasing invoices than making work. So we built a *room to make things in, and a *team to handle everything else — contracts, clients, crews, the lot. Brands get artists who are *ready. Artists get to stay *artists." />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SplitWords className="h1" text="What we promise." italicWords={["promise."]} />
          <div className="values">
            {values.map((v, i) => (
              <FadeUp key={v.t} delay={i * 0.1}>
                <div className="value" style={{ height: "100%" }}>
                  <div className="big">{v.big}</div>
                  <div>
                    <h3 className="h3">{v.t}</h3>
                    <p className="muted" style={{ marginBottom: 0 }}>{v.d}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="kicker">The people who pick up the phone</span>
          <div className="team">
            {team.map((p, i) => (
              <FadeUp key={p.n} delay={i * 0.08}>
                <div className="ph"><GenArt seed={p.seed} palette={["#e2683c", "#f2ebe3", "#1c1512"]} ratio="1" /></div>
                <strong style={{ fontWeight: 500 }}>{p.n}</strong>
                <div className="muted" style={{ fontSize: 14 }}>{p.r}</div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SplitWords className="h1" text="Nine years, one floor." italicWords={["one", "floor."]} />
          <div className="timeline">
            {timeline.map((r) => (
              <div className="tl-row" key={r.y}>
                <span className="yr">{r.y}</span>
                <span className="h3">{r.t}</span>
                <span className="muted">{r.d}</span>
              </div>
            ))}
          </div>
          <FadeUp>
            <div style={{ marginTop: 56, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
              <p className="lead" style={{ margin: 0 }}>Are you an artist? We review portfolios on the first Monday of every month.</p>
              <Link href="/contact?door=join" className="btn btn-primary">Send us your work <Arrow /></Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <CTA />
    </>
  );
}

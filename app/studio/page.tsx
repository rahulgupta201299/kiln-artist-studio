import type { Metadata } from "next";
import StudioExplorer from "@/components/StudioExplorer";
import CTA from "@/components/home/CTA";
import { FadeUp, SplitWords } from "@/components/Reveal";
import Arrow from "@/components/Arrow";
import Link from "next/link";
import { brand, plans } from "@/lib/data";

export const metadata: Metadata = { title: "The Studio" };

const amenities = [
  { ic: "☀", t: "North light", d: "Floor-to-ceiling mill windows on two sides." },
  { ic: "⚡", t: "Power backup", d: "Full-load generator. Shoots never stop." },
  { ic: "⇅", t: "Loading bay", d: "Ground-floor access for trucks and sets." },
  { ic: "☕", t: "Café & bar", d: "Espresso by day, a licensed bar by night." },
  { ic: "◐", t: "Blackout", d: "Every room goes fully dark in seconds." },
  { ic: "♿", t: "Step-free", d: "Lift and ramps to every floor." },
  { ic: "P", t: "Parking", d: "12 bays plus valet for events." },
  { ic: "✦", t: "Crew on call", d: "Gaffers, engineers and runners we trust." },
];

export default function StudioPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <span className="kicker">The Studio · {brand.address.split(",").slice(-2).join(",")}</span>
          <SplitWords as="h1" className="display" text="6,000 sq ft" delay={0.3} />
          <SplitWords as="h1" className="display" text="of possible." delay={0.45} italicWords={["possible."]} />
          <div className="row">
            <FadeUp delay={0.6}>
              <p className="lead">
                An old textile mill, rebuilt by the artists who use it. Five rooms that flex from a quiet painting residency to a 180-person launch — explore them in 3D below.
              </p>
            </FadeUp>
            <FadeUp delay={0.7}>
              <Link href="/contact?door=space" className="btn btn-primary">Book a walkthrough <Arrow /></Link>
            </FadeUp>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 40 }}>
        <div className="wrap">
          <StudioExplorer />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="split">
            <div>
              <span className="kicker">Pricing</span>
              <SplitWords className="h1" text="Simple, honest rates." italicWords={["honest"]} />
            </div>
            <FadeUp>
              <p className="lead">All prices exclude GST. Non-profits, students and first-time exhibitors get 25% off — just ask.</p>
            </FadeUp>
          </div>
          <div className="plans">
            {plans.map((p, i) => (
              <FadeUp key={p.name} delay={i * 0.1}>
                <div className={`plan ${p.highlight ? "hl" : ""}`} style={{ height: "100%" }}>
                  {p.highlight && <span className="badge">Most booked</span>}
                  <span className="kicker">{p.name}</span>
                  <div>
                    <div className="price">{p.price}</div>
                    <div className="muted" style={{ fontSize: 14 }}>{p.unit}</div>
                  </div>
                  <p className="muted" style={{ margin: 0 }}>{p.note}</p>
                  <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
                  <Link href={`/contact?door=space&plan=${encodeURIComponent(p.name)}`} className={`btn ${p.highlight ? "btn-primary" : "btn-ghost"}`} style={{ justifyContent: "center" }}>
                    Choose {p.name.toLowerCase()} <Arrow />
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="kicker">Included with every booking</span>
          <SplitWords className="h2" text="The small things, already handled." italicWords={["already"]} />
          <div className="amen">
            {amenities.map((a) => (
              <div key={a.t}>
                <span className="ic">{a.ic}</span>
                <div>
                  <strong style={{ fontWeight: 500 }}>{a.t}</strong>
                  <p className="muted" style={{ margin: "6px 0 0", fontSize: 14 }}>{a.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA title="Come see the light for yourself." italic={["light"]} />
    </>
  );
}

import Hero from "@/components/home/Hero";
import Doors from "@/components/home/Doors";
import Roster from "@/components/home/Roster";
import Rooms from "@/components/home/Rooms";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import Marquee from "@/components/Marquee";
import Counter from "@/components/Counter";
import { FadeUp, SplitWords } from "@/components/Reveal";
import { brands, process, stats } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={["Painting", "Illustration", "Live music", "Photography", "3D & motion", "Performance", "Ceramics", "Murals"]} />
      <Doors />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="stats">
            {stats.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.08} className="stat">
                <div className="num">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="lbl">{s.label}</div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Roster />
      <Rooms />

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <span className="kicker">How it works</span>
          <SplitWords className="h1" text="From brief to opening night." italicWords={["opening", "night."]} />
          <div className="process">
            {process.map((p, i) => (
              <FadeUp key={p.n} delay={i * 0.1} className="step">
                <span className="n">{p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <div style={{ padding: "20px 0" }}>
        <p className="wrap kicker" style={{ marginBottom: 18 }}>Brands that have made things here</p>
        <Marquee items={brands} reverse />
      </div>

      <Testimonials />
      <CTA />
    </>
  );
}

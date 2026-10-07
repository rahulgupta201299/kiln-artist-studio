"use client";
import Link from "next/link";
import { doors } from "@/lib/data";
import { FadeUp, SplitWords } from "@/components/Reveal";
import Arrow from "@/components/Arrow";

export default function Doors() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="split">
          <SplitWords className="h1" text="Two doors. One studio that holds everything." italicWords={["holds", "everything."]} />
          <FadeUp>
            <p className="lead">
              Most brands juggle a venue, a production house and a talent agency. We are all three, under one roof, run by artists who still make work here every week.
            </p>
          </FadeUp>
        </div>
        <div className="doors">
          {doors.map((d, i) => (
            <FadeUp key={d.key} delay={i * 0.12}>
              <Link href={d.cta.href} className="door" data-cursor="Enter">
                <span className="glow" style={{ background: i === 0 ? "var(--accent)" : "#7e8cff" }} />
                <div>
                  <span className="kicker">{d.kicker}</span>
                  <h3 className="h2" style={{ marginTop: 22 }}>{d.title}</h3>
                </div>
                <div>
                  <p className="lead" style={{ fontSize: 17 }}>{d.body}</p>
                  <ul>{d.points.map((p) => <li key={p}>{p}</li>)}</ul>
                  <span className="btn btn-ghost" style={{ marginTop: 34 }}>
                    {d.cta.label} <Arrow />
                  </span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

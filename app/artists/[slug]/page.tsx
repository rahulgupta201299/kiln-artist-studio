import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artists } from "@/lib/data";
import GenArt from "@/components/GenArt";
import ArtistCard from "@/components/ArtistCard";
import CTA from "@/components/home/CTA";
import { FadeUp, SplitWords } from "@/components/Reveal";
import Arrow from "@/components/Arrow";

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = artists.find((x) => x.slug === slug);
  return { title: a ? `${a.name} — ${a.discipline}` : "Artist" };
}

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = artists.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const a = artists[idx];
  const next = artists[(idx + 1) % artists.length];
  const related = artists.filter((x) => x.slug !== a.slug && (x.discipline === a.discipline || x.city === a.city)).slice(0, 3);
  const more = related.length ? related : artists.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <Link href="/artists" className="muted link-u" style={{ fontSize: 14 }}>← All artists</Link>
          <div className="a-hero" style={{ marginTop: 32 }}>
            <div>
              <span className="kicker">{a.discipline} · {a.city}</span>
              <SplitWords as="h1" className="h1" text={a.name} delay={0.3} />
              <FadeUp delay={0.5}>
                <p className="lead" style={{ marginTop: 28 }}>{a.bio}</p>
                <div className="pill-row" style={{ marginTop: 24 }}>
                  {a.tags.map((t) => <span key={t} className="pill">{t}</span>)}
                </div>
                <div style={{ marginTop: 36, borderTop: "1px solid var(--line)", paddingTop: 20 }}>
                  <span className="kicker">Has worked with</span>
                  <p className="h3" style={{ marginTop: 12 }}>{a.clients.join(" · ")}</p>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 36, flexWrap: "wrap" }}>
                  <Link href={`/contact?door=hire&artist=${a.slug}`} className="btn btn-primary">Commission {a.name.split(" ")[0]} <Arrow /></Link>
                  <Link href={`/artists/${next.slug}`} className="btn btn-ghost">Next: {next.name} <Arrow /></Link>
                </div>
              </FadeUp>
            </div>
            <FadeUp delay={0.2}>
              <div className="art">
                <GenArt seed={a.seed} palette={a.palette} />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <span className="kicker">Selected work</span>
          <div className="works">
            {[1, 2, 3, 4, 5, 6].map((k, i) => (
              <FadeUp key={k} delay={(i % 3) * 0.08}>
                <div style={{ aspectRatio: i % 4 === 0 ? "4/5" : "1" }}>
                  <GenArt seed={a.seed * 7 + k * 13} palette={a.palette} ratio={i % 4 === 0 ? "4 / 5" : "1"} />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SplitWords className="h2" text="You might also like" italicWords={["like"]} />
          <div className="grid-artists">
            {more.map((x) => <ArtistCard key={x.slug} a={x} />)}
          </div>
        </div>
      </section>
      <CTA title={`Have a brief for ${a.name.split(" ")[0]}?`} italic={[`${a.name.split(" ")[0]}?`]} />
    </>
  );
}

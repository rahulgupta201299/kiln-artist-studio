import type { Metadata } from "next";
import ArtistGrid from "@/components/ArtistGrid";
import CTA from "@/components/home/CTA";
import { FadeUp, SplitWords } from "@/components/Reveal";

export const metadata: Metadata = { title: "Artists" };

export default function ArtistsPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <span className="kicker">The roster · 120+ managed artists</span>
          <SplitWords as="h1" className="display" text="Meet the" delay={0.3} />
          <SplitWords as="h1" className="display" text="makers." delay={0.42} italicWords={["makers."]} />
          <div className="row">
            <FadeUp delay={0.6}>
              <p className="lead">
                Painters, illustrators, musicians, photographers, 3D artists and performers — managed, insured and ready for brand work. A selection is below; ask us for the full book.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>
      <section style={{ paddingBottom: 80 }}>
        <div className="wrap">
          <ArtistGrid />
        </div>
      </section>
      <CTA title="Not sure who fits? We’ll shortlist for you." italic={["shortlist"]} />
    </>
  );
}

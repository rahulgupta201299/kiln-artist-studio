import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import { SplitWords } from "@/components/Reveal";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <section className="page-head" style={{ paddingBottom: 56 }}>
        <div className="wrap">
          <span className="kicker">Reply within 24 hours</span>
          <SplitWords as="h1" className="display" text="Describe it once." delay={0.3} />
          <SplitWords as="h1" className="display" text="We’ll hold the rest." delay={0.45} italicWords={["rest."]} />
        </div>
      </section>
      <section style={{ paddingBottom: 60 }}>
        <div className="wrap">
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}

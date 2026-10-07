import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-head wrap" style={{ minHeight: "70vh" }}>
      <span className="kicker">404</span>
      <h1 className="h1" style={{ marginTop: 24 }}>
        This room is <span className="italic accent">still drying.</span>
      </h1>
      <div style={{ marginTop: 40 }}>
        <Link href="/" className="btn btn-primary">Back to the studio →</Link>
      </div>
    </section>
  );
}

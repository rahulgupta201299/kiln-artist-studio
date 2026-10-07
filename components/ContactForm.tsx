"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { artists, brand, disciplines, spaces } from "@/lib/data";
import Arrow from "./Arrow";

type Door = "space" | "hire" | "join";
const DOORS: { key: Door; title: string; sub: string }[] = [
  { key: "space", title: "Book the space", sub: "Shoots, sessions, launches, workshops" },
  { key: "hire", title: "Hire an artist", sub: "Commissions, live art, campaigns" },
  { key: "join", title: "Join the roster", sub: "For artists who want representation" },
];

function Chips({ options, value, onChange, multi = false }: { options: string[]; value: string[]; onChange: (v: string[]) => void; multi?: boolean }) {
  return (
    <div className="opt-grid">
      {options.map((o) => {
        const on = value.includes(o);
        return (
          <button
            type="button"
            key={o}
            className={`chip ${on ? "on" : ""}`}
            onClick={() => onChange(multi ? (on ? value.filter((x) => x !== o) : [...value, o]) : [o])}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

export default function ContactForm() {
  const sp = useSearchParams();
  const [door, setDoor] = useState<Door>("space");
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const [d, setD] = useState<Record<string, string[] | string>>({});
  const set = (k: string, v: string[] | string) => setD((p) => ({ ...p, [k]: v }));
  const arr = (k: string) => (Array.isArray(d[k]) ? (d[k] as string[]) : []);
  const str = (k: string) => (typeof d[k] === "string" ? (d[k] as string) : "");

  useEffect(() => {
    const q = sp.get("door") as Door | null;
    if (q && DOORS.some((x) => x.key === q)) setDoor(q);
    const room = spaces.find((s) => s.id === sp.get("room"));
    const art = artists.find((a) => a.slug === sp.get("artist"));
    const plan = sp.get("plan");
    setD((p) => ({
      ...p,
      ...(room ? { rooms: [room.name] } : {}),
      ...(plan ? { plan: [plan] } : {}),
      ...(art ? { artist: art.name, disc: [art.discipline] } : {}),
    }));
  }, [sp]);

  const next = () => {
    setErr("");
    if (step === 0) {
      if (door === "space" && arr("rooms").length === 0) return setErr("Pick at least one room — you can change it later.");
      if (door === "hire" && arr("disc").length === 0) return setErr("Pick the kind of artist you need.");
      if (door === "join" && (!arr("disc").length || !str("portfolio"))) return setErr("Add your discipline and a portfolio link.");
      setStep(1);
    } else {
      if (!str("name") || !/^\S+@\S+\.\S+$/.test(str("email"))) return setErr("We need your name and a valid email to reply.");
      setDone(true);
    }
  };

  const progress = done ? 100 : step === 0 ? 40 : 75;

  return (
    <div className="contact-grid">
      <div>
        <span className="kicker">Choose your door</span>
        <div className="door-picker" style={{ marginTop: 20 }}>
          {DOORS.map((x) => (
            <button
              key={x.key}
              type="button"
              className={`door-opt ${door === x.key ? "on" : ""}`}
              onClick={() => {
                setDoor(x.key);
                setStep(0);
                setDone(false);
                setErr("");
              }}
            >
              <span>
                <strong>{x.title}</strong>
                <small>{x.sub}</small>
              </span>
              <span className="radio" />
            </button>
          ))}
        </div>
        <div style={{ marginTop: 40, display: "grid", gap: 18 }} className="muted">
          <div>
            <span className="kicker">Prefer to talk?</span>
            <p className="h3" style={{ color: "var(--ink)", marginTop: 10 }}>
              <a className="link-u" href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
            </p>
            <p style={{ margin: "4px 0 0" }}><a className="link-u" href={`mailto:${brand.email}`}>{brand.email}</a></p>
          </div>
          <div>
            <span className="kicker">Visit</span>
            <p style={{ margin: "10px 0 0" }}>{brand.address}<br />{brand.hours}</p>
          </div>
        </div>
      </div>

      <div className="form">
        <div className="progress"><i style={{ width: `${progress}%` }} /></div>
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} style={{ textAlign: "center", padding: "40px 0" }}>
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                style={{ width: 96, height: 96, borderRadius: "50%", background: "var(--accent)", color: "var(--on-accent)", display: "grid", placeItems: "center", fontSize: 40, margin: "0 auto 28px" }}
              >
                ✓
              </motion.div>
              <h3 className="h2">Thank you, {str("name").split(" ")[0] || "friend"}.</h3>
              <p className="lead" style={{ margin: "18px auto 0" }}>
                {door === "join"
                  ? "We review portfolios on the first Monday of the month. You’ll hear from a real person either way."
                  : "A studio manager will reply within 24 hours — usually much sooner — with availability and a shortlist."}
              </p>
              <div style={{ marginTop: 32, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/artists" className="btn btn-ghost">Browse the roster <Arrow /></Link>
                <Link href="/studio" className="btn btn-ghost">Explore the studio <Arrow /></Link>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key={door + step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={(e) => {
                e.preventDefault();
                next();
              }}
            >
              <span className="kicker">Step {step + 1} of 2</span>
              <h3 className="h2" style={{ margin: "14px 0 32px" }}>
                {step === 1 ? "How do we reach you?" : door === "space" ? "Which rooms, and when?" : door === "hire" ? "Tell us about the work." : "Show us what you make."}
              </h3>

              {step === 0 && door === "space" && (
                <>
                  <div className="field"><label>Rooms</label><Chips multi options={spaces.map((s) => s.name)} value={arr("rooms")} onChange={(v) => set("rooms", v)} /></div>
                  <div className="field"><label>Booking type</label><Chips options={["By the hour", "Day pass", "Membership"]} value={arr("plan")} onChange={(v) => set("plan", v)} /></div>
                  <div className="field-row">
                    <div className="field"><label htmlFor="date">Preferred date</label><input id="date" type="date" value={str("date")} onChange={(e) => set("date", e.target.value)} /></div>
                    <div className="field"><label htmlFor="ppl">Headcount</label><input id="ppl" inputMode="numeric" placeholder="e.g. 25" value={str("ppl")} onChange={(e) => set("ppl", e.target.value)} /></div>
                  </div>
                </>
              )}

              {step === 0 && door === "hire" && (
                <>
                  <div className="field"><label>Discipline</label><Chips multi options={disciplines.slice(1)} value={arr("disc")} onChange={(v) => set("disc", v)} /></div>
                  <div className="field"><label htmlFor="artist">A specific artist? (optional)</label><input id="artist" placeholder="Name from our roster" value={str("artist")} onChange={(e) => set("artist", e.target.value)} /></div>
                  <div className="field"><label>Budget</label><Chips options={["Under ₹50k", "₹50k – 2L", "₹2L – 5L", "₹5L+"]} value={arr("budget")} onChange={(v) => set("budget", v)} /></div>
                  <div className="field"><label>Timeline</label><Chips options={["This month", "1–3 months", "Just exploring"]} value={arr("when")} onChange={(v) => set("when", v)} /></div>
                </>
              )}

              {step === 0 && door === "join" && (
                <>
                  <div className="field"><label>Your discipline</label><Chips multi options={disciplines.slice(1)} value={arr("disc")} onChange={(v) => set("disc", v)} /></div>
                  <div className="field-row">
                    <div className="field"><label htmlFor="pf">Portfolio link</label><input id="pf" placeholder="instagram.com/… or your site" value={str("portfolio")} onChange={(e) => set("portfolio", e.target.value)} /></div>
                    <div className="field"><label htmlFor="city">City</label><input id="city" placeholder="Where you're based" value={str("city")} onChange={(e) => set("city", e.target.value)} /></div>
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <div className="field-row">
                    <div className="field"><label htmlFor="name">Name</label><input id="name" autoComplete="name" value={str("name")} onChange={(e) => set("name", e.target.value)} /></div>
                    <div className="field"><label htmlFor="email">Email</label><input id="email" type="email" autoComplete="email" value={str("email")} onChange={(e) => set("email", e.target.value)} /></div>
                  </div>
                  <div className="field-row">
                    <div className="field"><label htmlFor="phone">Phone (optional)</label><input id="phone" type="tel" autoComplete="tel" value={str("phone")} onChange={(e) => set("phone", e.target.value)} /></div>
                    <div className="field"><label htmlFor="co">Company (optional)</label><input id="co" value={str("co")} onChange={(e) => set("co", e.target.value)} /></div>
                  </div>
                  <div className="field"><label htmlFor="msg">Anything else?</label><textarea id="msg" placeholder="Describe the night, the shoot, the idea…" value={str("msg")} onChange={(e) => set("msg", e.target.value)} /></div>
                </>
              )}

              {err && <p className="err" role="alert">{err}</p>}
              <div className="form-nav">
                {step === 1 ? (
                  <button type="button" className="btn btn-ghost" onClick={() => { setStep(0); setErr(""); }}>← Back</button>
                ) : (
                  <span className="muted" style={{ fontSize: 13 }}>Takes about 60 seconds</span>
                )}
                <button type="submit" className="btn btn-primary">
                  {step === 1 ? "Send it over" : "Continue"} <Arrow />
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

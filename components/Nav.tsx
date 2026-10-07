"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { brand, nav } from "@/lib/data";
import Arrow from "./Arrow";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = 0;
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 400 && y > last);
      last = y;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? "scrolled" : ""} ${hidden && !open ? "hidden" : ""}`}>
        <div className="wrap nav-inner">
          <Link href="/" className="logo" aria-label={`${brand.full} home`}>
            <span className="logo-mark" />
            {brand.name}
          </Link>
          <nav className="nav-links" aria-label="Primary">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="link-u" aria-current={pathname.startsWith(n.href) ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="nav-cta">
            <span className="hide-sm muted" style={{ fontSize: 13 }}>
              <span className="live-dot" />
              Studio open today
            </span>
            <ThemeToggle />
            <Magnetic>
              <Link href="/contact?door=space" className="btn btn-primary hide-xs">
                Book a visit <Arrow />
              </Link>
            </Magnetic>
            <button className={`burger ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div>
              {[{ href: "/", label: "Home" }, ...nav].map((n, i) => (
                <motion.div key={n.href} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.06, duration: 0.7 }}>
                  <Link href={n.href} className="big">{n.label}</Link>
                </motion.div>
              ))}
            </div>
            <div className="muted" style={{ fontSize: 14 }}>
              {brand.email}
              <br />
              {brand.address}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

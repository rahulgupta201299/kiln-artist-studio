"use client";
import Link from "next/link";
import { useState } from "react";
import { brand } from "@/lib/data";

export default function Footer() {
  const [sent, setSent] = useState(false);
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <h4>The Pulse — monthly letter</h4>
            <p className="h3" style={{ maxWidth: 520 }}>
              Open calls, studio nights and who's making what. <span className="italic accent">Once a month.</span>
            </p>
            {sent ? (
              <p className="accent" style={{ marginTop: 28 }}>You're on the list. See you in the studio.</p>
            ) : (
              <form className="newsletter" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <input type="email" required placeholder="your@email.com" aria-label="Email" />
                <button type="submit">Sit on the list →</button>
              </form>
            )}
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link className="link-u" href="/studio">The Studio</Link></li>
              <li><Link className="link-u" href="/artists">Artist roster</Link></li>
              <li><Link className="link-u" href="/collective">The Collective</Link></li>
              <li><Link className="link-u" href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Two doors</h4>
            <ul>
              <li><Link className="link-u" href="/contact?door=space">Book the space</Link></li>
              <li><Link className="link-u" href="/contact?door=hire">Hire an artist</Link></li>
              <li><Link className="link-u" href="/contact?door=join">Join the roster</Link></li>
            </ul>
          </div>
          <div>
            <h4>Visit</h4>
            <ul>
              <li>{brand.address}</li>
              <li>{brand.hours}</li>
              <li><a className="link-u" href={`mailto:${brand.email}`}>{brand.email}</a></li>
              <li>{brand.instagram}</li>
            </ul>
          </div>
        </div>
        <div className="footer-word" aria-hidden>{brand.name.toLowerCase()}</div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} {brand.full}. Made by hand in {brand.city}.</span>
          <span>Prototype — placeholder brand & content</span>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import { brand } from "@/lib/data";
import { themeScript } from "@/lib/theme";

// Self-hosted fonts (no network needed at build time)
const serif = localFont({
  src: [
    { path: "./fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
});
const sans = localFont({ src: "./fonts/inter-tight-latin-wght-normal.woff2", weight: "100 900", variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: { default: `${brand.full} — Studio space & artist collective, ${brand.city}`, template: `%s · ${brand.full}` },
  description: "A working studio space and an artist collective in one. Book rooms for shoots, sessions and launches, or commission artists from our 120+ roster.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e0b0a" },
    { media: "(prefers-color-scheme: light)", color: "#f4efe8" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Preloader />
        <SmoothScroll />
        <Cursor />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

"use client";
import { useTheme } from "@/lib/theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useTheme();
  const light = theme === "light";
  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(light ? "dark" : "light")}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      title={light ? "Dark mode" : "Light mode"}
    >
      {/* sun */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
        style={{ position: "absolute", transform: light ? "rotate(90deg) scale(0.4)" : "none", opacity: light ? 0 : 1 }} aria-hidden>
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2v2.2M12 19.8V22M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2 12h2.2M19.8 12H22M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
      </svg>
      {/* moon */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        style={{ position: "absolute", transform: light ? "none" : "rotate(-90deg) scale(0.4)", opacity: light ? 1 : 0 }} aria-hidden>
        <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.8 6.8 0 0 0 10.7 10.7z" />
      </svg>
    </button>
  );
}

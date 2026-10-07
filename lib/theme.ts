"use client";
import { useEffect, useState } from "react";

export type Theme = "light" | "dark";
export const THEME_KEY = "kiln-theme";

/** Runs before paint (inlined in <head>) so there is never a flash of the wrong theme. */
export const themeScript = `(function(){try{var t=localStorage.getItem('${THEME_KEY}');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();`;

function read(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

/** Current theme, kept in sync with the <html data-theme> attribute. */
export function useTheme(): [Theme, (t: Theme) => void] {
  const [theme, setThemeState] = useState<Theme>("dark");
  useEffect(() => {
    setThemeState(read());
    const mo = new MutationObserver(() => setThemeState(read()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    // follow the OS setting live until the visitor picks a theme themselves
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onOs = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(THEME_KEY);
      } catch {}
      if (saved !== "light" && saved !== "dark") document.documentElement.setAttribute("data-theme", mq.matches ? "light" : "dark");
    };
    mq.addEventListener("change", onOs);
    return () => {
      mo.disconnect();
      mq.removeEventListener("change", onOs);
    };
  }, []);
  const setTheme = (t: Theme) => {
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem(THEME_KEY, t);
    } catch {}
  };
  return [theme, setTheme];
}

/** Colours the 3D scenes need, per theme. */
export const sceneColors = {
  dark: { bg: "#0e0b0a", slab: "#1a1512", floor: "#2a211c", edge: "#5a4d44", grid1: "#3a2f28", grid2: "#241d19", prop: "#1c1512", label: "rgba(14,11,10,.78)", labelInk: "#f2ebe3", sparkle: "#f0a35e" },
  light: { bg: "#f4efe8", slab: "#e4dccf", floor: "#d6cbbb", edge: "#a8998a", grid1: "#cbbfae", grid2: "#ddd3c5", prop: "#3d332d", label: "rgba(244,239,232,.9)", labelInk: "#1a1411", sparkle: "#c2501f" },
};

# KILN Collective — 3D studio & artist-collective website (prototype)

A Next.js 16 + React Three Fiber prototype for a studio space run by an art collective that also manages artists.
**KILN** is a placeholder brand. To rebrand it, edit `lib/data.ts`. Every name, price, room, artist and line of copy lives in that file.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

To build for production: `npm run build && npm start`.
To deploy, push the folder to GitHub and import it on Vercel. It needs no configuration.

## Pages

| Route | What's on it |
|---|---|
| `/` | A 3D hero: a glowing "kiln" sculpture with orbiting artworks you can click. Below it: the two-door split (space or artists), animated stats, a draggable roster rail, a room list with a preview that follows the cursor, the process, a brand marquee, testimonials, and a 3D ceramics CTA |
| `/studio` | An interactive 3D floor plan you can orbit. Click a room to see its specs, gear and rates. Also pricing plans and amenities |
| `/artists` | The roster, with discipline filters, search, animated layout and tilt cards |
| `/artists/[slug]` | Artist profile with bio, clients, selected work, related artists and a "Commission" CTA |
| `/collective` | 3D ceramics hero, a manifesto whose words light up as you scroll, promises, team and timeline |
| `/contact` | Two-door conversion form (book space / hire artist / join roster). Two steps, a progress bar, and a success state. Links from the rest of the site fill it in ahead of time, e.g. `?door=hire&artist=…` |

## Light & dark themes

- The site follows the visitor's system setting on the first visit. The sun/moon button in the nav switches themes, and the choice is remembered.
- A small inline script in `app/layout.tsx` sets the theme before the first paint, so the page never flashes the wrong colours.
- Colour tokens live at the top of `app/globals.css`. Dark is `:root`, light is `:root[data-theme="light"]`. Body text in both themes meets WCAG AA contrast. In light mode the accent is a deeper terracotta (#b8481c) so orange text stays readable.
- The 3D scenes switch their background, fog, floor, grid and label colours with the theme (`sceneColors` in `lib/theme.ts`).
- Until the visitor picks a theme, the site follows the OS setting, including live changes.
- **Contrast:** every page passes the axe-core `color-contrast` check in both themes. Borders that mark a button, chip or input use a `--control` token that is at least 3:1 against the page (WCAG 1.4.11). Keyboard users get a visible focus ring.
- **High-contrast mode:** visitors who turn on "Increase contrast" in their OS (`prefers-contrast: more`) get a crisper version of whichever theme they are using: stronger text, borders and accent, and no grain.

## UX details

- A preloader runs once per session. Page changes use a curtain transition. Scrolling is smoothed with Lenis.
- The cursor uses a blend mode and grows with labels like "View", "Enter" and "Drag". Buttons are magnetic.
- Every page has a clear CTA, and the nav has a "Book a visit" button that is always visible.
- Each WebGL scene loads lazily and only mounts when it is close to the viewport. Pixel ratio is capped, and phones get fewer objects.
- Respects `prefers-reduced-motion`. The layout is responsive down to 360px.

## Swap-in checklist before going live

1. Brand name, copy, rooms, prices and artists → `lib/data.ts`
2. Generated artworks → real photos. Swap `<GenArt>` for `next/image` in `components/ArtistCard.tsx` and `app/artists/[slug]/page.tsx`
3. Forms → connect `components/ContactForm.tsx` and the footer newsletter to a backend (Formspree, Resend, HubSpot, etc.). They are client-side only right now
4. Fonts are self-hosted in `app/fonts` (Instrument Serif + Inter Tight)

## Stack

next 16 · react 19 · three · @react-three/fiber · @react-three/drei · framer-motion · lenis · TypeScript

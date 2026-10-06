# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Marketing site for **OKAY Bari Social Food Club** (smash burger / "cucina internazionale veloce",
Via F. M. Brancaccio 18, Bari). Next.js 16 App Router, React 19, TypeScript strict, CSS Modules.
Runtime deps are only `next`, `react`, `react-dom` — no CSS framework, no animation library.
User-facing copy is Italian. Research, brand rationale, design system and open questions for the
owner live in `docs/RESEARCH.md`; setup/deploy in `README.md`.

## Commands

```bash
npm run dev            # dev server (Turbopack)
npm run build          # production build — every route is statically prerendered
npm run lint           # eslint (flat config, next core-web-vitals + typescript); `next lint` no longer exists
npm run typecheck      # tsc --noEmit
npm run format         # prettier --write . (printWidth 100)
npm run check          # lint + typecheck + format:check + build — run before committing
```

There is no test suite. Verification is the `check` script plus running the built site
(`npm run build && npm run start`) and looking at it.

Env vars (see `.env.example`, must be set before `build`): `NEXT_PUBLIC_SITE_URL` (canonical/sitemap/
OG/schema base; default is a placeholder domain) and `NEXT_PUBLIC_DRAFT_MARKERS` (default on).

## Architecture

**Content is data.** All venue facts and copy that may change live in `src/data/*` and are typed by
`src/types/index.ts`; components only read them. Add a menu item, event, gallery photo, etc. by
editing data, not JSX.

**Verification model — don't invent facts.** Research could only partially confirm the venue's
details, so uncertain values are wrapped as `Verifiable<T>` (`{ value, verified, source }`) or carry
`verified` on menu items. This flag drives two things:

- `lib/schema.ts` only emits verified data into JSON-LD (telephone, opening hours, priceRange,
  reservations, menu prices appear automatically once `verified: true`).
- `components/ui/DraftMark.tsx` renders a yellow dot next to unverified values while
  `siteConfig.draftMarkers` is true; `PhotoSlot` likewise shows the photo brief.
  Keep this contract when adding data: never mark something verified without a confirmed source.

**Conditional features from data.** `data/events.ts` is empty on purpose (no public events found).
`lib/events.getUpcomingEvents()` gates the `Events` home section, the "Serate" nav entry
(`data/navigation.ts`) and `Event` JSON-LD — all appear when an upcoming event is added. Past events
drop out at build time.

**Photos.** No real images are bundled (copyright / not yet supplied). `data/gallery.ts` entries are
art-directed placeholders; setting `src: "/photos/…"` (file in `public/photos/`) switches
`PhotoSlot` to `next/image`.

**Rendering & motion.**

- Server Components by default; client components are only Header (mobile menu with focus trap),
  `motion/Reveal` and `app/info/HoursTable` (marks today's row via `hooks/useToday`, Europe/Rome, browser-only so the
  prerendered HTML has no "today").
- Entry animations only apply under the `.js` class set on `<html>` by an inline script in
  `app/layout.tsx`, so content is visible without JS.
- Every animation must degrade under `prefers-reduced-motion` (global override in `styles/base.css`
  plus explicit static states in components).

**Styling.** The look follows the OKAY design system (Claude design system artifact "OKAY", from the
venue's Instagram): white paper + ink black for 90% of every block, display titles in Archivo 900 at
115% width, uppercase, plus ONE word in Permanent Marker red (`.marker`, never a sentence). Borders
are always 2px ink, corners square (pills only for labels), no soft shadows: only solid offset
shadows (`--shadow*`). One accent per block: okay-red, club-blue (event dates), veggie-green,
cheddar (only on ink/night), bun (warm ground). Tokens are in `src/styles/tokens.css`; `base.css`
holds reset and the shared primitives (`.container`, `.caption`, `.marker`, `.pill`, `.signature`,
`.checker`, `.sr-only`). Each component has a co-located `*.module.css`.

**Fonts.** Self-hosted via `next/font/local` in `lib/fonts.ts` (Archivo variable woff2 with wdth/wght,
roman + italic; Permanent Marker). `app/opengraph-image.tsx` uses separate static `.woff` files in
`src/assets/og/` because `ImageResponse` cannot read woff2 or variable fonts.

**SEO.** Per-page metadata via `lib/metadata.pageMetadata()` (keeps canonical/OG/Twitter in sync);
`metadataBase` and absolute URLs come from `lib/site.ts`. File conventions in `src/app`: `sitemap.ts`,
`robots.ts`, `manifest.ts`, `icon.svg`, `apple-icon.tsx`, `opengraph-image.tsx`. JSON-LD is rendered
with `components/seo/JsonLd.tsx` (escapes `<`).

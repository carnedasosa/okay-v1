# OKAY Bari Social Food Club — sito ufficiale (proposta)

Sito per **OKAY Bari Social Food Club**, Via Francesco Maria Brancaccio 18, Bari (Picone).
Smash burger e cucina internazionale veloce, in sala, da asporto e a domicilio con l'app OkayBari.

> Ricerca, brand analysis, direzione creativa, design system, fonti e domande per il
> proprietario: **[docs/RESEARCH.md](docs/RESEARCH.md)**.

## Stack

| Scelta                                   | Perché                                                                                                                                                                                                           |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Next.js 16 (App Router) + React 19**   | Pagine generate staticamente (SSG): HTML pronto, ottimo per SEO locale e Core Web Vitals; metadata, sitemap, robots, OG image e icone come file convention; deploy a costo zero su Vercel o qualsiasi host Node. |
| **TypeScript strict**                    | Contenuti tipizzati: un dato mancante o sbagliato in `src/data` è un errore di build, non un bug in produzione.                                                                                                  |
| **CSS Modules + design token CSS**       | Nessun framework CSS: stile scoped per componente, token globali in `src/styles/tokens.css`. Zero runtime.                                                                                                       |
| **Motion con CSS + browser API**         | IntersectionObserver, scroll progress su custom property, animazioni CSS. Nessuna libreria di animazione (−40/60 KB di JS).                                                                                      |
| **Font self-hosted** (`next/font/local`) | Archivo variabile + Permanent Marker (design system OKAY), licenze OFL/Apache: niente richieste a Google.                                                                                                        |

Dipendenze runtime: solo `next`, `react`, `react-dom`.

## Avvio

Requisiti: Node.js ≥ 20.9.

```bash
npm install
cp .env.example .env.local   # opzionale, vedi "Configurazione"
npm run dev                  # http://localhost:3000
```

| Script                            | Cosa fa                                           |
| --------------------------------- | ------------------------------------------------- |
| `npm run dev`                     | Server di sviluppo                                |
| `npm run build`                   | Build di produzione (tutte le pagine statiche)    |
| `npm run start`                   | Serve la build di produzione                      |
| `npm run lint`                    | ESLint (config Next core-web-vitals + TypeScript) |
| `npm run typecheck`               | `tsc --noEmit`                                    |
| `npm run format` / `format:check` | Prettier                                          |
| `npm run check`                   | lint + typecheck + format:check + build           |

## Configurazione

| Variabile                   | Default                   | Descrizione                                                                                                                                                              |
| --------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`      | `https://www.okaybari.it` | URL pubblico: canonical, sitemap, OpenGraph, schema.org. **Il dominio è un segnaposto**, da sostituire.                                                                  |
| `NEXT_PUBLIC_DRAFT_MARKERS` | `true`                    | Mostra i pallini gialli accanto ai dati non ancora confermati (telefono, orari, prezzi) e le note sui segnaposto foto. Impostare `false` dopo la verifica con il locale. |

## Aggiornare i contenuti

Tutti i contenuti stanno in `src/data/`: la UI li legge, non serve toccare i componenti.

| File              | Contenuto                                                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `venue.ts`        | Nome, indirizzo, telefono, orari, social, app, mappe. Ogni dato incerto ha `verified: false` e la sua `source`.             |
| `menu.ts`         | Sezioni e piatti (nome, descrizione, prezzo opzionale, tag).                                                                |
| `destinations.ts` | I "visti" del passaporto (piatto → città d'origine).                                                                        |
| `club.ts`         | Il regolamento del club e le parole del marquee.                                                                            |
| `reviews.ts`      | Citazioni verbatim e temi ricorrenti delle recensioni.                                                                      |
| `gallery.ts`      | Il rullino: segnaposto con brief fotografico, `src` quando arriva la foto.                                                  |
| `events.ts`       | Serate. Vuoto = sezione, voce di menu e schema `Event` nascosti. Gli eventi passati spariscono da soli al build successivo. |

**Quando un dato è confermato** basta mettere `verified: true`: il pallino scompare e il dato
entra nello schema.org (telefono, orari, fascia di prezzo, prenotazioni, prezzi del menu).

**Foto:** mettere il file in `public/photos/` (es. `smash-double.jpg`, lato lungo ≥ 2000px) e
aggiungere `src: "/photos/smash-double.jpg"` alla voce in `gallery.ts`. `next/image` genera
AVIF/WebP responsive e lazy-loading.

**Logo:** il wordmark attuale è tipografico (`src/components/ui/Wordmark.tsx`); sostituirlo
con l'SVG ufficiale mantenendo l'`aria-label`. Aggiornare anche `src/app/icon.svg`.

## Architettura

```
src/
├── app/                      # Routing (App Router) e file convention
│   ├── layout.tsx            # HTML shell, metadata globali, header/footer, JSON-LD Restaurant
│   ├── page.tsx              # Home: compone le sezioni
│   ├── menu/                 # /menu  (+ JSON-LD Menu, Breadcrumb)
│   ├── info/                 # /info  dove & quando, orari, FAQ
│   ├── not-found.tsx         # 404 "Not okay."
│   ├── sitemap.ts · robots.ts · manifest.ts
│   ├── opengraph-image.tsx   # immagine social generata (1200×630)
│   ├── icon.svg · apple-icon.tsx
│   └── globals.css           # importa token + base
├── components/
│   ├── layout/               # Header (+ menu mobile), Footer, ActionBar (CTA mobile fissa)
│   ├── sections/             # Sezioni della home (Hero, Highlights, SmashAnatomy, Club, …)
│   ├── ui/                   # Primitive: Button, Icon, Stamp, PhotoSlot, SectionHead, Wordmark, DraftMark
│   ├── motion/               # Reveal, PunctuationCycle
│   └── seo/                  # JsonLd
├── data/                     # Contenuti (single source of truth)
├── hooks/                    # useInView, useScrollProgress, useMediaQuery, usePrefersReducedMotion
├── lib/                      # site config, formattazione, schema.org, metadata, font
├── styles/                   # tokens.css (design system), base.css (reset, utility)
├── types/                    # Tipi di dominio
└── assets/                   # Font (woff2 per il sito, woff per l'OG image)
```

Principi:

- **Server Components di default.** Sono client solo i componenti con interazione o motion
  (Header, Reveal, HoursTable).
- **Progressive enhancement:** senza JavaScript tutto il contenuto è visibile; le animazioni
  di ingresso si attivano solo con la classe `.js` sull'`<html>`.
- **Motion senza re-render:** lo scroll scrive custom property CSS (`--p`) via
  `requestAnimationFrame`; il CSS calcola trasformazioni e opacità.
- **`prefers-reduced-motion`:** marquee, timbri, scroll orizzontale e burger esploso si
  fermano o passano allo stato finale statico.

## SEO

- Metadata per pagina (title template, description, canonical, OpenGraph, Twitter card).
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, favicon SVG, apple-touch-icon.
- OpenGraph image generata con i font del brand.
- JSON-LD: `Restaurant` (indirizzo, geo, cucina, menu, sameAs, OrderAction delivery/asporto),
  `Menu` con `MenuSection`/`MenuItem`, `BreadcrumbList`, `Event` (quando ci sono eventi).
  **Solo dati verificati**: telefono, orari, prezzi e fascia di prezzo vengono aggiunti
  automaticamente quando `verified: true`.
- Keyword locali coerenti con l'attività: smash burger Bari, burger Bari, Picone, delivery Bari,
  cucina internazionale Bari. Nessuna keyword "cocktail bar" o "eventi": il locale non lo è
  (o non risulta).

## Qualità — risultati dei controlli

Eseguiti sulla build di produzione:

- `npm run lint` ✅ 0 errori · `npm run typecheck` ✅ · `npm run build` ✅ (11 route statiche)
- **axe-core** (WCAG 2.1 A/AA + best practice) su `/`, `/menu`, `/info`, 404 a 390px e 1440px:
  ✅ 0 violazioni
- **Lighthouse** (localhost): desktop 100/100/100/100 su home e menu; mobile home
  Performance 92–96, Accessibility 100, Best Practices 100, SEO 100; menu mobile 97/100/100/100
- Nessun overflow orizzontale a 320, 375, 390, 430, 768, 1024, 1440, 1920px
- Console pulita sulla build di produzione (0 errori, 0 warning) e nessun errore di hydration
  in `next dev` (resta solo un warning di preload CSS interno a Turbopack in dev)
- Menu mobile chiudibile con Esc, focus trap e ritorno del focus al pulsante; skip link

## Deploy

### Vercel (consigliato)

1. Push del repository su GitHub.
2. Su [vercel.com](https://vercel.com) → _Add New Project_ → importa il repo (framework
   rilevato automaticamente, nessuna configurazione).
3. _Environment Variables_: `NEXT_PUBLIC_SITE_URL=https://dominio-scelto.it` e, dopo la
   verifica dei dati, `NEXT_PUBLIC_DRAFT_MARKERS=false`.
4. _Domains_: collegare il dominio (record A/CNAME indicati da Vercel).
5. Verificare il sito su Google Search Console e inviare `https://dominio/sitemap.xml`;
   collegare il sito al profilo Google Business del locale.

### Altro hosting Node

```bash
npm ci && npm run build && npm run start   # porta 3000 (PORT=xxxx per cambiarla)
```

Dietro un reverse proxy (Nginx/Caddy) con HTTPS. Le variabili `NEXT_PUBLIC_*` vanno impostate
**prima** del build.

## Checklist prima del lancio

- [ ] Confermare telefono, orari, menu e prezzi → `verified: true` in `src/data`
- [ ] `NEXT_PUBLIC_DRAFT_MARKERS=false`
- [ ] Logo SVG ufficiale e colori del brand
- [ ] Foto reali nel rullino (con permesso d'uso)
- [ ] Dominio definitivo in `NEXT_PUBLIC_SITE_URL`
- [ ] Footer legale: ragione sociale, P.IVA; privacy/cookie policy se si aggiungono analytics
- [ ] Rich Results Test di Google sulle pagine principali

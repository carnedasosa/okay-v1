import type { MenuSection } from "@/types";

/**
 * Menu as found on public third-party listings (carta.menu / piatti.menu,
 * TripAdvisor reviews, aggregators). Names are kept as published.
 *
 * Prices are shown only where a public listing reported them and they are
 * flagged as not verified: the owner must confirm the current menu before
 * launch. To update: edit this file, the UI reads it as-is.
 */
export const menuUpdatedAt = "2026-10";

export const menu: MenuSection[] = [
  {
    id: "smash",
    title: "Smash",
    tagline: "Schiacciati sulla piastra",
    note: "Carne schiacciata sulla piastra rovente: bordo croccante, cuore succoso. Bun morbido.",
    items: [
      {
        id: "okay-single",
        name: "Okay Single",
        price: 9,
        tags: ["firma"],
        verified: false,
      },
      {
        id: "okay-double",
        name: "Okay Double",
        price: 12,
        tags: ["firma"],
        verified: false,
      },
      {
        id: "bacon-single",
        name: "Bacon Burger Single",
        price: 10,
        verified: false,
      },
      {
        id: "bacon-double",
        name: "Bacon Burger Double",
        description: "Doppia carne smash, cheddar, bacon, pickles, cipolla, salsa baconnaise.",
        price: 13,
        tags: ["firma"],
        verified: false,
      },
      {
        id: "truffle-single",
        name: "Truffle Smash Single",
        description: "Spinaci, brie, bacon, pera e maionese al tartufo.",
        price: 10,
        verified: false,
      },
      {
        id: "truffle-double",
        name: "Truffle Smash Double",
        description: "Come il single, con doppia carne.",
        price: 13,
        verified: false,
      },
      {
        id: "big-smash",
        name: "Big Smash",
        verified: false,
      },
    ],
  },
  {
    id: "bun-toast",
    title: "Bun & Toast",
    tagline: "Deli, ma veloce",
    items: [
      {
        id: "pastrami-bun",
        name: "Pastrami Bun",
        description: "Pastrami tagliato alto nel bun.",
        price: 12,
        tags: ["firma"],
        verified: false,
      },
      {
        id: "pastrami-toast",
        name: "Pastrami Toast",
        verified: false,
      },
      {
        id: "avo-salmon",
        name: "Avo & Salmon Bun",
        description: "Avocado e salmone.",
        price: 13,
        verified: false,
      },
      {
        id: "cotoletta",
        name: "Cotoletta di maiale",
        description: "Con salsa tartara.",
        verified: false,
      },
    ],
  },
  {
    id: "starters",
    // The line break puts "TO" above "SHARE" in the big section title; one line elsewhere.
    title: "To\nshare",
    tagline: "Oppure no",
    items: [
      {
        id: "fries-caciocavallo",
        name: "Patatine caciocavallo & tartufo",
        description: "Patatine fritte, caciocavallo e salsa al tartufo.",
        tags: ["firma", "da condividere"],
        verified: false,
      },
      {
        id: "smashed-potatoes",
        name: "Smashed potatoes",
        description: "Patate schiacciate e croccanti.",
        tags: ["da condividere"],
        verified: false,
      },
      {
        id: "gyoza-veg",
        name: "Gyoza di verdure",
        description: "Ravioli alla piastra con verdure grigliate.",
        tags: ["veg", "da condividere"],
        verified: false,
      },
      {
        id: "nachos",
        name: "Nachos Guacamole",
        price: 6,
        tags: ["veg", "da condividere"],
        verified: false,
      },
      {
        id: "fries",
        name: "Patate fritte",
        tags: ["veg"],
        verified: false,
      },
      {
        id: "caesar",
        name: "Caesar salad con pollo",
        verified: false,
      },
    ],
  },
  {
    id: "dolci",
    title: "Dolci",
    tagline: "Il finale",
    items: [
      {
        id: "ny-cheesecake",
        name: "NY Cheesecake",
        price: 6,
        verified: false,
      },
      {
        id: "okay-cheesecake",
        name: "Okay Cheesecake",
        price: 5,
        tags: ["firma"],
        verified: false,
      },
    ],
  },
  {
    id: "bere",
    title: "Da bere",
    tagline: "Birre, vino, bibite",
    note: "Selezione di birre, vino e soft drink. Chiedi in sala cosa c'è alla spina stasera.",
    items: [
      { id: "birre", name: "Birre", verified: false },
      { id: "vino", name: "Vino", verified: false },
      { id: "soft", name: "Soft drink e acqua", verified: false },
    ],
  },
];

/** Add-ons reported on the public menu. */
export const extras = [{ id: "baconnaise", name: "Salsa baconnaise", price: 1 }];

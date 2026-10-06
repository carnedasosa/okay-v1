import type { ClubRule } from "@/types";

/** "Social food club": the house rules. Brand copy, editable freely. */
export const clubRules: ClubRule[] = [
  {
    id: "fame",
    title: "Si entra con fame.",
    body: "L'unico requisito d'iscrizione. Nessuna tessera, nessuna lista.",
  },
  {
    id: "doppio",
    title: "Il doppio non è un'esagerazione.",
    body: "È una scelta consapevole. Lo staff non giudica, al massimo approva.",
  },
  {
    id: "condividere",
    title: "Le patatine si condividono.",
    body: "Anche quelle al caciocavallo. Soprattutto quelle al caciocavallo.",
  },
  {
    id: "giro",
    title: "Un piatto, un Paese.",
    body: "Stati Uniti, Giappone, Messico, Puglia. Si viaggia veloci, si torna sempre qui.",
  },
  {
    id: "tavolo",
    title: "Il tavolo è social. Il telefono pure.",
    body: "Foto concesse, anzi incoraggiate. Tagga @okay.bari, poi però mangia finché è caldo.",
  },
  {
    id: "risposta",
    title: "«Dove mangiamo stasera?»",
    body: "Ci sono tante risposte possibili. Una sola è quella giusta.",
  },
];

/** Words used by the hero marquee and the member card. */
export const marqueeWords = [
  "Smash",
  "Pastrami",
  "Gyoza",
  "Nachos",
  "Caciocavallo & tartufo",
  "Cheesecake",
  "Birre",
  "Asporto",
  "Delivery",
];

/**
 * Graphic posts that alternate with the photos in "Il rullino", like the
 * Instagram feed: white ground, a shouting title, the signature.
 */
export const feedPosts = [
  { id: "fame", title: "Ho sempre fame" },
  { id: "male", title: "Quando va tutto male", answer: "→ Okay Double" },
  { id: "cani", title: "Siamo tutti cani" },
];

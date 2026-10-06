import type { GalleryShot } from "@/types";

/**
 * "Il rullino": the photos of the venue, in feed order (the home shows the
 * first five, alternated with graphic posts).
 *
 * Files live in /public/photos. An entry without `src` renders as an
 * art-directed placeholder with its brief; add the file and set `src` to
 * replace it.
 */
export const gallery: GalleryShot[] = [
  {
    id: "brunch",
    src: "/photos/brunch-affollato.jpg",
    alt: "Tavolo pieno da OKAY visto dall'alto: piatti da brunch con uova, salsicce e bacon, birre e mani degli amici",
    brief: "Brunch · tavolo pieno · dall'alto",
    ratio: "4/5",
    tone: "night",
  },
  {
    id: "staff",
    src: "/photos/staff-pass.jpg",
    alt: "Lo staff di OKAY dietro al bancone che ride, uno parla in un megafono",
    brief: "Staff al pass · ritratto mosso · t-shirt OKAY",
    ratio: "4/5",
    tone: "night",
  },
  {
    id: "pastrami",
    src: "/photos/pastrami.jpg",
    alt: "Pastrami toast tagliato a metà e impilato, con insalata e salsa",
    brief: "Pastrami toast · taglio a metà",
    ratio: "4/5",
    tone: "warm",
  },
  {
    id: "locale",
    src: "/photos/locale.jpg",
    alt: "L'angolo OKAY Press nella sala: colonna con riviste e insegna luminosa",
    brief: "Sala · OKAY Press · luce calda",
    ratio: "4/5",
    tone: "ink",
  },
  {
    id: "gyoza",
    src: "/photos/gyoza.jpg",
    alt: "Gyoza alla piastra con salsa e anelli di cipolla, visti dall'alto sulla tovaglietta OKAY",
    brief: "Gyoza · dall'alto",
    ratio: "4/5",
    tone: "night",
  },
  {
    id: "smash-macro",
    src: "/photos/double-smash-bacon.jpg",
    alt: "Smash burger doppio con cheddar fuso nella carta OKAY",
    brief: "Smash doppio · da vicino",
    ratio: "4/5",
    tone: "night",
  },
  {
    id: "patatine",
    src: "/photos/patatine-caciocavallo.jpg",
    alt: "Patatine fritte coperte di formaggio fuso nella carta OKAY",
    brief: "Patatine caciocavallo · da vicino",
    ratio: "4/5",
    tone: "bun",
  },
  {
    id: "cheesecake",
    alt: "Fetta di cheesecake con forchetta",
    brief: "Cheesecake · fetta singola · sfondo pieno",
    ratio: "4/5",
    tone: "warm",
  },
];

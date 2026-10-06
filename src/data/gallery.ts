import type { GalleryShot } from "@/types";

/**
 * "Il rullino": photo slots with an art-direction brief.
 *
 * No photo is bundled: the official pictures live on @okay.bari and need the
 * owner's files and permission. Drop a file in /public/photos and set `src`
 * to replace the placeholder (e.g. src: "/photos/smash-double.jpg").
 */
export const gallery: GalleryShot[] = [
  {
    id: "smash-macro",
    alt: "Smash burger doppio con bacon visto di lato, cheddar fuso sul bordo",
    brief: "Smash doppio bacon · macro di lato · flash diretto",
    ratio: "4/5",
    tone: "night",
  },
  {
    id: "sala",
    alt: "La sala di OKAY la sera, tavoli pieni",
    brief: "Sala la sera · grandangolo · luce calda del locale",
    ratio: "3/2",
    tone: "ink",
  },
  {
    id: "pastrami",
    alt: "Pastrami toast tagliato a metà",
    brief: "Pastrami toast · taglio a metà · dall'alto",
    ratio: "1/1",
    tone: "warm",
  },
  {
    id: "mani",
    alt: "Mani di amici che prendono patatine dal centro del tavolo",
    brief: "Patatine caciocavallo · mani che si incrociano",
    ratio: "3/4",
    tone: "bun",
  },
  {
    id: "staff",
    alt: "Lo staff di OKAY dietro al bancone",
    brief: "Staff al pass · ritratto mosso · t-shirt OKAY",
    ratio: "4/5",
    tone: "night",
  },
  {
    id: "insegna",
    alt: "L'ingresso di OKAY in Via Brancaccio di sera",
    brief: "Ingresso su Via Brancaccio · ora blu · insegna accesa",
    ratio: "9/16",
    tone: "ink",
  },
  {
    id: "gyoza",
    alt: "Gyoza di verdure appena tolti dalla piastra",
    brief: "Gyoza · vapore · controluce",
    ratio: "1/1",
    tone: "night",
  },
  {
    id: "cheesecake",
    alt: "Fetta di cheesecake con forchetta",
    brief: "Cheesecake · fetta singola · sfondo pieno",
    ratio: "4/5",
    tone: "warm",
  },
];

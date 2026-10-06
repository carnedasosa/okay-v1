import type { Destination } from "@/types";

/**
 * "Un piatto, un Paese": the signature dishes shown on the home, each with
 * the place it comes from. Dishes come from the public menu; prices are read
 * from data/menu.ts through `menuItemId`, so they stay in one place.
 */
export const destinations: Destination[] = [
  {
    id: "smash",
    dish: "Okay Double",
    origin: "Stati Uniti",
    line: "Doppio smash schiacciato sulla piastra rovente: bordo croccante, cuore succoso, bun morbido.",
    menuItemId: "okay-double",
    photo: {
      alt: "Okay Double visto da vicino, cheddar fuso sul bordo",
      brief: "Okay Double · da vicino · luce calda, fondo legno",
    },
  },
  {
    id: "pastrami",
    dish: "Pastrami Bun",
    origin: "New York",
    line: "Pastrami tagliato alto nel bun. Deli, ma veloce.",
    menuItemId: "pastrami-bun",
    photo: {
      alt: "Pastrami bun tagliato a metà",
      brief: "Pastrami bun · taglio a metà · dall'alto",
    },
  },
  {
    id: "gyoza",
    dish: "Gyoza di verdure",
    origin: "Giappone",
    line: "Ravioli alla piastra con verdure grigliate. Da condividere, oppure no.",
    menuItemId: "gyoza-veg",
    photo: {
      alt: "Gyoza di verdure appena tolti dalla piastra",
      brief: "Gyoza · vapore · controluce",
    },
  },
  {
    id: "caciocavallo",
    dish: "Patatine caciocavallo & tartufo",
    origin: "Puglia",
    line: "Patatine fritte, caciocavallo e salsa al tartufo. Le patatine si condividono.",
    menuItemId: "fries-caciocavallo",
    photo: {
      alt: "Patatine con caciocavallo e salsa al tartufo viste dall'alto",
      brief: "Patatine caciocavallo · dall'alto · mani che si allungano",
    },
  },
];

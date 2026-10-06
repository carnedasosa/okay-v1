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
      src: "/photos/double-smash-bacon.jpg",
      alt: "Smash burger doppio con cheddar fuso nella carta OKAY",
      brief: "Okay Double · da vicino · luce calda, fondo legno",
    },
  },
  {
    id: "pastrami",
    dish: "Pastrami Toast",
    origin: "New York",
    line: "Il pastrami del deli newyorkese, nel toast croccante. Deli, ma veloce.",
    menuItemId: "pastrami-toast",
    photo: {
      src: "/photos/pastrami.jpg",
      alt: "Pastrami toast tagliato a metà e impilato, con insalata e salsa",
      brief: "Pastrami toast · taglio a metà",
    },
  },
  {
    id: "gyoza",
    dish: "Gyoza di verdure",
    origin: "Giappone",
    line: "Ravioli alla piastra con verdure grigliate. Da condividere, oppure no.",
    menuItemId: "gyoza-veg",
    photo: {
      src: "/photos/gyoza.jpg",
      alt: "Gyoza alla piastra con salsa, visti dall'alto",
      brief: "Gyoza · dall'alto",
    },
  },
  {
    id: "caciocavallo",
    dish: "Patatine caciocavallo & tartufo",
    origin: "Puglia",
    line: "Patatine fritte, caciocavallo e salsa al tartufo. Le patatine si condividono.",
    menuItemId: "fries-caciocavallo",
    photo: {
      src: "/photos/patatine-caciocavallo.jpg",
      alt: "Patatine fritte coperte di caciocavallo fuso",
      brief: "Patatine caciocavallo · da vicino",
    },
  },
];

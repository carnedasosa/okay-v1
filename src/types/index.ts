/**
 * Domain types for the OKAY website.
 *
 * Every piece of content that comes from public research carries a
 * `verified` flag. `false` means the information was found on third-party
 * sources but is inconsistent or not confirmed by the venue: the UI can mark
 * it in draft mode and structured data (schema.org) excludes it.
 */

export type Verifiable<T> = {
  value: T;
  verified: boolean;
  /** Where the data comes from: kept for the owner review, never rendered. */
  source?: string;
};

export type Weekday =
  "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export type OpeningSlot = {
  days: Weekday[];
  /** 24h "HH:MM". `closes` may be "24:00" / "00:00" for midnight. */
  opens: string;
  closes: string;
};

export type ExternalLink = {
  label: string;
  href: string;
};

export type Venue = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  category: string;
  cuisine: string[];
  priceRange: Verifiable<string>;
  address: {
    street: string;
    postalCode: string;
    city: string;
    region: string;
    country: string;
    neighbourhood: string;
  };
  geo: { lat: number; lng: number };
  phone: Verifiable<string>;
  phoneAlt?: Verifiable<string>;
  email: Verifiable<string | null>;
  whatsapp: Verifiable<string | null>;
  hours: Verifiable<OpeningSlot[]>;
  social: {
    instagram: { handle: string; url: string };
    linktree: string;
    tiktok: string | null;
    facebook: string | null;
  };
  ordering: {
    appName: string;
    ios: string;
    android: string;
    web: Verifiable<string | null>;
  };
  maps: { google: string; apple: string };
  reservations: Verifiable<"phone" | "app" | "phone-and-app">;
};

export type DishTag = "firma" | "veg" | "piccante" | "da condividere";

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  /** Euro. Optional: shown only when known. */
  price?: number;
  tags?: DishTag[];
  verified: boolean;
};

export type MenuSection = {
  id: string;
  title: string;
  /** Short line printed under the section title. */
  tagline: string;
  note?: string;
  items: MenuItem[];
};

/** A dish told as a travel destination: "cucina internazionale veloce". */
export type Destination = {
  id: string;
  dish: string;
  origin: string;
  line: string;
  /** Menu item whose price is shown on the card (see data/menu.ts). */
  menuItemId?: string;
  /** Art direction for the photo slot of the card. */
  photo: Pick<GalleryShot, "alt" | "brief" | "src">;
};

export type GalleryShot = {
  id: string;
  /** Path under /public when the real photo is available. */
  src?: string;
  alt: string;
  /** Art direction for the photo that should replace the placeholder. */
  brief: string;
  ratio: "1/1" | "4/5" | "3/4" | "4/3" | "16/9" | "9/16" | "3/2";
  tone: "night" | "ink" | "bun" | "warm";
};

export type ClubRule = {
  id: string;
  title: string;
  body: string;
};

export type Review = {
  id: string;
  quote: string;
  source: string;
  url?: string;
  /** true when the quote is verbatim from the source. */
  verbatim: boolean;
};

export type VenueEvent = {
  id: string;
  title: string;
  /** ISO 8601 date-time. */
  startDate: string;
  endDate?: string;
  description: string;
  image?: string;
  ticketUrl?: string;
  free?: boolean;
};

export type NavItem = {
  label: string;
  href: string;
};

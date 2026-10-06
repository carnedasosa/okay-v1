import localFont from "next/font/local";

/**
 * Self-hosted fonts (no runtime request to Google), from the OKAY design
 * system. Licences in src/assets/fonts/LICENSE-*.
 *
 * Archivo — variable (wght 100–900, wdth 62–125): 900 at 115% width for the
 *   display titles, 400–600 for body copy and captions, 800 italic for the
 *   "OKAY® Social Food Club Company" signature.
 * Permanent Marker — the scribbled red word next to a title. One word, never
 *   a sentence.
 */
export const archivo = localFont({
  src: [
    { path: "../assets/fonts/Archivo-Variable.woff2", style: "normal" },
    { path: "../assets/fonts/Archivo-Variable-Italic.woff2", style: "italic" },
  ],
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  preload: true,
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  fallback: ["Arial Black", "system-ui", "sans-serif"],
});

export const marker = localFont({
  src: "../assets/fonts/PermanentMarker-Regular.woff2",
  variable: "--font-permanent-marker",
  weight: "400",
  display: "swap",
  preload: false,
  fallback: ["cursive"],
});

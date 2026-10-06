import type { MetadataRoute } from "next";
import { venue } from "@/data/venue";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: venue.name,
    short_name: venue.shortName,
    description: venue.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0E0E0E",
    theme_color: "#0E0E0E",
    lang: "it",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}

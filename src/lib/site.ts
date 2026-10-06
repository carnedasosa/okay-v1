/**
 * Site-wide configuration. Values that depend on the deploy live in env vars
 * (see .env.example) so the same build works for preview and production.
 */
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.okaybari.it";

export const siteConfig = {
  url: rawUrl.replace(/\/$/, ""),
  locale: "it_IT",
  lang: "it",
  /**
   * Draft markers highlight data that still needs the owner's confirmation.
   * On by default; set NEXT_PUBLIC_DRAFT_MARKERS=false once verified.
   */
  draftMarkers: process.env.NEXT_PUBLIC_DRAFT_MARKERS !== "false",
  themeColor: "#0E0E0E",
} as const;

export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

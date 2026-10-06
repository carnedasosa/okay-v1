import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { venue } from "@/data/venue";

export const alt =
  "OKAY Bari Social Food Club · Cucina internazionale veloce, Via Brancaccio 18, Bari";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0E0E0E";
const PAPER = "#FFFFFF";
const RED = "#E1251B";

export default async function OpenGraphImage() {
  const [display, text, marker] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/og/archivo-latin-900-normal.woff")),
    readFile(join(process.cwd(), "src/assets/og/archivo-latin-600-normal.woff")),
    readFile(join(process.cwd(), "src/assets/og/permanent-marker-latin-400-normal.woff")),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "56px 64px",
        background: PAPER,
        color: INK,
        fontFamily: "Text",
        border: `12px solid ${INK}`,
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 2 }}
      >
        <span>SOCIAL FOOD CLUB · BARI</span>
        <span>VIA BRANCACCIO 18</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 36 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Display",
            fontSize: 112,
            lineHeight: 0.9,
            letterSpacing: -2,
          }}
        >
          <span>DOVE MANGIAMO</span>
          <span>STASERA?</span>
        </div>
        <span
          style={{
            fontFamily: "Marker",
            fontSize: 96,
            color: RED,
            transform: "rotate(-3deg)",
            marginBottom: 6,
          }}
        >
          OKAY.
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px 0",
          borderTop: `3px solid ${INK}`,
          borderBottom: `3px solid ${INK}`,
          fontFamily: "Display",
          fontSize: 22,
          letterSpacing: 1,
        }}
      >
        OKAY® SOCIAL FOOD CLUB COMPANY · {venue.tagline.toUpperCase()}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Display", data: display, weight: 900, style: "normal" },
        { name: "Text", data: text, weight: 600, style: "normal" },
        { name: "Marker", data: marker, weight: 400, style: "normal" },
      ],
    },
  );
}

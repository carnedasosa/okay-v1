import { ImageResponse } from "next/og";
import { logoFull, logoTransform, logoViewBox } from "@/components/ui/logoPaths";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FFFFFF",
      }}
    >
      <svg viewBox={logoViewBox} width={150} height={66}>
        <g transform={logoTransform} fill="#0E0E0E">
          {logoFull.map((d) => (
            <path key={d.slice(0, 24)} d={d} />
          ))}
        </g>
      </svg>
    </div>,
    size,
  );
}

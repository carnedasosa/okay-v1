import { ImageResponse } from "next/og";

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
        color: "#0E0E0E",
        fontSize: 96,
        fontWeight: 800,
        letterSpacing: -4,
        textShadow: "5px 5px 0 #E1251B",
      }}
    >
      OK
    </div>,
    size,
  );
}

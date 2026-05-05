import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "South Asian & Muslim Wedding Photographer NY — Visual Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0a0a0a",
          padding: "80px",
        }}
      >
        <div style={{ width: "60px", height: "4px", backgroundColor: "#DD9454", marginBottom: "48px" }} />
        <div
          style={{
            fontSize: "68px",
            fontWeight: "900",
            color: "white",
            lineHeight: 1.05,
            marginBottom: "28px",
            maxWidth: "920px",
          }}
        >
          South Asian &amp; Muslim Wedding Photographer NY
        </div>
        <div style={{ fontSize: "28px", color: "rgba(255,255,255,0.55)", maxWidth: "740px", lineHeight: 1.4 }}>
          Bengali, Pakistani, Indian &amp; Muslim weddings — Brooklyn, NY. Female crew available.
        </div>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ fontSize: "26px", fontWeight: "bold", color: "#DD9454" }}>Visual Studio</div>
          <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "26px" }}>·</div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "22px" }}>visualstudioslens.com</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

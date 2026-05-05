import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Wedding Photography FAQ — Pricing, Female Crew & Booking Guide — Visual Studios & Events NY";
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
            fontSize: "76px",
            fontWeight: "900",
            color: "white",
            lineHeight: 1.05,
            marginBottom: "28px",
            maxWidth: "860px",
          }}
        >
          FAQ & Booking Guide
        </div>
        <div style={{ fontSize: "30px", color: "rgba(255,255,255,0.55)", maxWidth: "720px", lineHeight: 1.4 }}>
          Pricing, female crew, coverage areas & delivery timelines — answered
        </div>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ fontSize: "26px", fontWeight: "bold", color: "#DD9454" }}>Visual Studios & Events</div>
          <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "26px" }}>·</div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "22px" }}>visualstudioslens.com</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

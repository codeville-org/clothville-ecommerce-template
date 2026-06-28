import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated default OpenGraph/Twitter image (license-clean, no bundled art). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8f6f1",
          color: "#1b1815",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 16, textTransform: "uppercase", color: "#9a7b4f" }}>
          Est. 2026
        </div>
        <div style={{ fontSize: 128, letterSpacing: 28, marginTop: 16 }}>{siteConfig.logo.text}</div>
        <div style={{ fontSize: 34, marginTop: 28, color: "#6b645b" }}>{siteConfig.tagline}</div>
      </div>
    ),
    size,
  );
}

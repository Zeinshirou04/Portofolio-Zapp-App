// app/opengraph-image.tsx
// Default OG image for portfolio.zapp.web.id
// Rendered via Next.js Satori — no external fonts needed at build time.

import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

// Load fonts
let fontBold: ArrayBuffer | null = null;
let fontRegular: ArrayBuffer | null = null;

function readFont(filename: string): ArrayBuffer {
  const buf = readFileSync(join(process.cwd(), 'public/fonts', filename))
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer
}

async function getFonts() {
  if (!fontBold || !fontRegular) {
    fontRegular = readFont('Inter-Regular.ttf')
    fontBold = readFont('Inter-Bold.ttf')
  }
  return { fontBold: fontBold!, fontRegular: fontRegular! }
}

// export const runtime = 'edge'
export const alt = "Farras Adhani Zayn — Full Stack Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const { fontBold, fontRegular } = await getFonts();

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "1200px",
        height: "630px",
        backgroundColor: "#1C1B20",
        padding: "72px 80px",
        fontFamily: "Inter",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial glow — top-left */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "-120px",
          left: "-120px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(98,70,234,0.18) 0%, rgba(98,70,234,0) 70%)",
        }}
      />

      {/* Volt accent line — top */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "0",
          left: "80px",
          right: "80px",
          height: "3px",
          backgroundColor: "#6246EA",
          borderRadius: "0 0 2px 2px",
        }}
      />

      {/* Logo / wordmark */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "auto",
        }}
      >
        <span
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.5px",
          }}
        >
          Zapp
        </span>
        <span style={{ fontSize: "22px", fontWeight: 700, color: "#6246EA" }}>
          .
        </span>
        <span
          style={{
            fontSize: "13px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.35)",
            marginLeft: "10px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          portfolio.zapp.web.id
        </span>
      </div>

      {/* Main content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
        {/* Eyebrow */}
        <span
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "#a89fec",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          Full Stack Web Developer · Indonesia
        </span>

        {/* Name */}
        <h1
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.0,
            letterSpacing: "-2px",
            margin: "0 0 20px 0",
          }}
        >
          Farras Adhani
          <br />
          <span style={{ color: "#6246EA" }}>Zayn</span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: "22px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.5,
            margin: "0",
            maxWidth: "640px",
          }}
        >
          Building elegant web apps with Laravel & Next.js — for businesses that
          deserve better software.
        </p>
      </div>

      {/* Bottom row — stack tags */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "44px",
        }}
      >
        {["Laravel", "Next.js", "Tailwind CSS", "REST API", "MySQL"].map(
          (tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "6px 14px",
                borderRadius: "6px",
                border: "1px solid rgba(98,70,234,0.35)",
                backgroundColor: "rgba(98,70,234,0.1)",
                fontSize: "13px",
                fontWeight: 600,
                color: "#a89fec",
                letterSpacing: "0.03em",
              }}
            >
              {tag}
            </div>
          ),
        )}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Inter", data: fontRegular, weight: 400 },
        { name: "Inter", data: fontBold, weight: 700 },
      ],
    },
  );
}

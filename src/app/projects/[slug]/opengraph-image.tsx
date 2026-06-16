// app/projects/[slug]/opengraph-image.tsx
// Dynamic OG image per project — fetches title + brief from Laravel API.
// Satori renders it server-side at request time (or statically if generateStaticParams is used).

import { ImageResponse } from "next/og";

// export const runtime = 'edge'
export const alt = "Project — Zapp Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface ProjectData {
  title: string;
  brief: string;
  type: string;
  stack: string[];
}

async function getProject(slug: string): Promise<ProjectData | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/projects/${slug}`, {
      headers: {
        Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        Accept: "application/json",
      },
      next: { revalidate: 3600 }, // cache 1 hour
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as ProjectData;
  } catch {
    return null;
  }
}

// Map project.type string → readable label
function typeLabel(type: string): string {
  const map: Record<string, string> = {
    web: "Web Application",
    api: "REST API",
    saas: "SaaS Product",
    dashboard: "Admin Dashboard",
    mobile: "Mobile App",
  };
  return map[type] ?? type;
}

// Load fonts
let fontBold: ArrayBuffer | null = null;
let fontRegular: ArrayBuffer | null = null;

async function getFonts() {
  if (!fontBold || !fontRegular) {
    [fontBold, fontRegular] = await Promise.all([
      fetch("https://...bold.woff").then((r) => r.arrayBuffer()),
      fetch("https://...regular.woff").then((r) => r.arrayBuffer()),
    ]);
  }
  return { fontBold: fontBold!, fontRegular: fontRegular! };
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { fontBold, fontRegular } = await getFonts();
  const { slug } = await params;
  const project = await getProject(slug);

  const title = project?.title ?? "Project";
  const brief = project?.brief
    ? project.brief.length > 120
      ? project.brief.slice(0, 117) + "..."
      : project.brief
    : "A project by Zapp Freelance.";
  const label = project ? typeLabel(project.type) : "Portfolio";
  // Show up to 4 stack items
  const stack: string[] = project?.stack?.slice(0, 4) ?? [];

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "1200px",
        height: "630px",
        backgroundColor: "#1C1B20",
        padding: "72px 80px",
        fontFamily: "Montserrat",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow — top-right for variety */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(98,70,234,0.15) 0%, rgba(98,70,234,0) 70%)",
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

      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "auto",
        }}
      >
        <span style={{ fontSize: "22px", fontWeight: 700, color: "#ffffff" }}>
          Zapp
        </span>
        <span style={{ fontSize: "22px", fontWeight: 700, color: "#6246EA" }}>
          .
        </span>
        <span
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.35)",
            marginLeft: "10px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Portfolio
        </span>
      </div>

      {/* Main content */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Project type eyebrow */}
        <span
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "#a89fec",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          {label}
        </span>

        {/* Project title */}
        <h1
          style={{
            fontSize: title.length > 30 ? "54px" : "68px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.05,
            letterSpacing: "-1.5px",
            margin: "0 0 20px 0",
            maxWidth: "900px",
          }}
        >
          {title}
        </h1>

        {/* Brief */}
        <p
          style={{
            fontSize: "20px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.5,
            margin: "0",
            maxWidth: "760px",
          }}
        >
          {brief}
        </p>
      </div>

      {/* Bottom row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "44px",
        }}
      >
        {/* Stack tags */}
        <div style={{ display: "flex", gap: "10px" }}>
          {stack.map((tech) => (
            <div
              key={tech}
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
              {tech}
            </div>
          ))}
        </div>

        {/* Author attribution */}
        <span
          style={{
            fontSize: "14px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.30)",
          }}
        >
          by Farras Adhani Zayn
        </span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Montserrat", data: fontRegular, weight: 400 },
        { name: "Montserrat", data: fontBold, weight: 700 },
      ],
    },
  );
}

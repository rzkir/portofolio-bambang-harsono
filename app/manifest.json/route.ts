import { NextResponse } from "next/server";

export async function GET() {
  const manifest = {
    short_name: "Bambang Harsono",
    name: "Bambang Harsono",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "/favicon.ico",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    start_url: "/",
    display: "standalone",
    theme_color: "#f5f5f5",
    background_color: "#ffffff",
    prefer_related_applications: false,
    categories: [
      "portfolio",
      "web development",
      "full stack",
      "freelancer",
      "developer",
      "programming",
      "software development",
    ],
    screenshots: [
      {
        src: "/dekstop.png",
        sizes: "1280x720",
        type: "image/png",
      },
    ],
    description:
      "Full Stack Developer dan Freelancer profesional dari Ps. Kemis, Kabupaten Tangerang, Banten",
  };

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json",
    },
  });
}

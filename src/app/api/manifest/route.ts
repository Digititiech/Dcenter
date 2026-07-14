import { NextResponse } from "next/server";

export async function GET() {
  const manifest = {
    name: "Decision Center Strategic Interface",
    short_name: "DCenter",
    description:
      "Decision Center Sovereign Financial & Economic Advisory Portal",
    start_url: "/",
    display: "standalone",
    background_color: "#070707",
    theme_color: "#c5a059",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };

  return new NextResponse(JSON.stringify(manifest), {
    status: 200,
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

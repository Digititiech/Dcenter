export async function GET() {
  const robots = `
User-agent: *
Allow: /
Disallow: /admin

# AI Crawler Rules
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Disallow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Google-Extended
Disallow: /

Sitemap: https://www.dcenterfe.com/sitemap.xml
Content-Signal: ai-train=no, search=yes, ai-input=no
`.trim();

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

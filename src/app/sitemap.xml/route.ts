export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <!-- English Pages -->
  <url>
    <loc>https://www.dcenterfe.com/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.dcenterfe.com/"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://www.dcenterfe.com/ar"/>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.dcenterfe.com/about</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.dcenterfe.com/about"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://www.dcenterfe.com/ar/about"/>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.dcenterfe.com/services</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.dcenterfe.com/services"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://www.dcenterfe.com/ar/services"/>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.dcenterfe.com/methodology</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.dcenterfe.com/methodology"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://www.dcenterfe.com/ar/methodology"/>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.dcenterfe.com/contact</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.dcenterfe.com/contact"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://www.dcenterfe.com/ar/contact"/>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://www.dcenterfe.com/ai-assistant</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.dcenterfe.com/ai-assistant"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://www.dcenterfe.com/ar/ai-assistant"/>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Arabic Pages -->
  <url>
    <loc>https://www.dcenterfe.com/ar</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.dcenterfe.com/"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://www.dcenterfe.com/ar"/>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.dcenterfe.com/ar/about</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.dcenterfe.com/about"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://www.dcenterfe.com/ar/about"/>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.dcenterfe.com/ar/services</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.dcenterfe.com/services"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://www.dcenterfe.com/ar/services"/>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.dcenterfe.com/ar/methodology</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.dcenterfe.com/methodology"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://www.dcenterfe.com/ar/methodology"/>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.dcenterfe.com/ar/contact</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.dcenterfe.com/contact"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://www.dcenterfe.com/ar/contact"/>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://www.dcenterfe.com/ar/ai-assistant</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.dcenterfe.com/ai-assistant"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://www.dcenterfe.com/ar/ai-assistant"/>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`.trim();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

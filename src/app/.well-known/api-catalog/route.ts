export async function GET() {
  const catalog = {
    "linkset": [
      {
        "anchor": "https://www.dcenterfe.com/api/chat",
        "service-desc": [
          {
            "href": "https://www.dcenterfe.com/openapi.json",
            "type": "application/json"
          }
        ],
        "service-doc": [
          {
            "href": "https://www.dcenterfe.com/docs/api",
            "type": "text/html"
          }
        ],
        "status": [
          {
            "href": "https://www.dcenterfe.com/api/health",
            "type": "application/json"
          }
        ]
      }
    ]
  };

  return new Response(JSON.stringify(catalog), {
    headers: {
      "Content-Type": "application/linkset+json; charset=utf-8",
    },
  });
}

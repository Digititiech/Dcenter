import { NextResponse } from "next/server";

export async function GET() {
  const card = {
    "name": "Decision Center Agent",
    "version": "1.0.0",
    "description": "AI Agent representing Decision Center for Financial & Economic Consulting. Capable of discussing Omani project finance, restructurings, and feasibility studies.",
    "supportedInterfaces": [
      {
        "type": "a2a",
        "url": "https://www.dcenterfe.com/api/a2a",
        "protocol": "HTTP"
      }
    ],
    "capabilities": {
      "chat": true
    },
    "skills": [
      {
        "id": "financial-consulting",
        "name": "Financial Consulting",
        "description": "Advises on asset restructuring and project finance in Oman."
      }
    ]
  };

  return NextResponse.json(card);
}

import { NextResponse } from "next/server";

export async function GET() {
  const card = {
    "serverInfo": {
      "name": "Decision Center AI Advisor",
      "version": "1.0.0"
    },
    "transport": {
      "type": "sse",
      "url": "https://www.dcenterfe.com/api/mcp/sse"
    },
    "capabilities": {
      "tools": {
        "get_company_services": {
          "description": "Get detailed information about Decision Center's financial and economic consulting services, restructurings, and feasibility studies.",
          "inputSchema": {
            "type": "object",
            "properties": {
              "category": {
                "type": "string",
                "description": "Optional category to filter services by",
                "enum": ["restructuring", "feasibility", "banking", "sovereign"]
              }
            }
          }
        }
      }
    }
  };

  return NextResponse.json(card);
}

import { NextResponse } from "next/server";

export async function GET() {
  const config = {
    "resource": "https://www.dcenterfe.com",
    "authorization_servers": [
      "https://www.dcenterfe.com/.well-known/oauth-authorization-server"
    ],
    "scopes_supported": ["chat", "read:profile"]
  };

  return NextResponse.json(config);
}

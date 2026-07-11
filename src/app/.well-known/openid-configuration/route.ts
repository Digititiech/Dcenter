import { NextResponse } from "next/server";

export async function GET() {
  const config = {
    "issuer": "https://www.dcenterfe.com",
    "authorization_endpoint": "https://www.dcenterfe.com/oauth/authorize",
    "token_endpoint": "https://www.dcenterfe.com/api/oauth/token",
    "jwks_uri": "https://www.dcenterfe.com/.well-known/jwks.json",
    "response_types_supported": ["code", "token"],
    "subject_types_supported": ["public"],
    "id_token_signing_alg_values_supported": ["RS256"]
  };

  return NextResponse.json(config);
}

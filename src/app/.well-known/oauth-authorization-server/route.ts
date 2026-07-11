import { NextResponse } from "next/server";

export async function GET() {
  const config = {
    "issuer": "https://www.dcenterfe.com",
    "authorization_endpoint": "https://www.dcenterfe.com/oauth/authorize",
    "token_endpoint": "https://www.dcenterfe.com/api/oauth/token",
    "jwks_uri": "https://www.dcenterfe.com/.well-known/jwks.json",
    "response_types_supported": ["code", "token"],
    "token_endpoint_auth_methods_supported": ["client_secret_post", "client_secret_basic"],
    "grant_types_supported": ["authorization_code", "client_credentials"],
    "agent_auth": {
      "register_uri": "https://www.dcenterfe.com/auth.md",
      "supported_identity_types": ["organization", "individual"],
      "credential_types": ["api_key"]
    }
  };

  return NextResponse.json(config);
}

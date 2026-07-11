import { NextResponse } from "next/server";

export async function GET() {
  const index = {
    "$schema": "https://agentskills.io/v0.2.0/schema.json",
    "skills": [
      {
        "name": "financial-advisory",
        "type": "skill-md",
        "description": "Provide professional project finance and feasibility study advising",
        "url": "https://www.dcenterfe.com/skills/financial-advisory.md",
        "sha256": "8f48480b05b50db12f6a736a66a7b7a1e05d0db1b8495a8f4c2e6396e95c1c0a"
      }
    ]
  };

  return NextResponse.json(index);
}

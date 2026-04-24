import { NextRequest, NextResponse } from "next/server";

// Decap CMS llama a este endpoint con ?provider=github
// También puede llamarlo sin provider (asumimos github)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const provider = searchParams.get("provider") || "github";

  if (provider !== "github") {
    return NextResponse.json({ error: "Provider not supported" }, { status: 400 });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ error: "Missing GITHUB_CLIENT_ID" }, { status: 500 });
  }

  const scope = "repo,user";
  const redirectUri = "https://rincones-bari.vercel.app/api/callback";
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${encodeURIComponent(redirectUri)}`;

  return NextResponse.redirect(githubAuthUrl);
}

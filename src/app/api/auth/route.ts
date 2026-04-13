import { NextRequest, NextResponse } from "next/server";

// GitHub OAuth — redirige al login de GitHub
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  // Note: request.url is sync, only Next.js page params are async
  const provider = searchParams.get("provider");

  if (provider !== "github") {
    return NextResponse.json({ error: "Provider not supported" }, { status: 400 });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ error: "Missing GITHUB_CLIENT_ID" }, { status: 500 });
  }

  const scope = "repo,user";
  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/callback`;
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${encodeURIComponent(redirectUri)}`;

  return NextResponse.redirect(githubAuthUrl);
}

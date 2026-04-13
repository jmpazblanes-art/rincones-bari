import { NextRequest, NextResponse } from "next/server";

// GitHub OAuth callback — intercambia el code por un token y lo devuelve al CMS
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: "Missing OAuth credentials" }, { status: 500 });
  }

  try {
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return NextResponse.json({ error: tokenData.error_description }, { status: 400 });
    }

    const token = tokenData.access_token;
    const provider = "github";

    // Decap CMS espera este formato exacto en el postMessage
    const script = `
      <script>
        (function() {
          function receiveMessage(e) {
            console.log("receiveMessage %o", e);
            window.opener.postMessage(
              'authorization:${provider}:success:${JSON.stringify({ token, provider })}',
              e.origin
            );
          }
          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage("authorizing:${provider}", "*");
        })()
      </script>
    `;

    return new NextResponse(script, {
      headers: { "Content-Type": "text/html" },
    });
  } catch {
    return NextResponse.json({ error: "OAuth exchange failed" }, { status: 500 });
  }
}

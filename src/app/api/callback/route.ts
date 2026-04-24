import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return htmlResponse("error", "Missing code");
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return htmlResponse("error", "Missing OAuth credentials");
  }

  try {
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error || !tokenData.access_token) {
      return htmlResponse("error", tokenData.error_description || "OAuth failed");
    }

    return htmlResponse("success", tokenData.access_token);
  } catch {
    return htmlResponse("error", "OAuth exchange failed");
  }
}

function htmlResponse(status: "success" | "error", content: string) {
  const payload =
    status === "success"
      ? JSON.stringify({ token: content, provider: "github" })
      : JSON.stringify({ error: content });

  const message = `authorization:github:${status}:${payload}`;

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Autenticando...</title></head>
<body>
<script>
(function() {
  var message = ${JSON.stringify(message)};
  function receiveMessage(e) {
    if (!e.data || typeof e.data !== 'string') return;
    if (e.data.indexOf('authorizing:github') !== 0) return;
    if (!window.opener) return;
    window.opener.postMessage(message, e.origin);
  }
  window.addEventListener("message", receiveMessage, false);
  if (window.opener) {
    window.opener.postMessage("authorizing:github", "*");
  }
})();
</script>
<p style="font-family: sans-serif; text-align: center; margin-top: 40px;">Autenticando... puedes cerrar esta ventana si no se cierra sola.</p>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

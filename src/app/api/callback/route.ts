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
  const message =
    status === "success"
      ? `authorization:github:success:${JSON.stringify({ token: content, provider: "github" })}`
      : `authorization:github:error:${content}`;

  const html = `<!DOCTYPE html>
<html>
<body>
<script>
(function() {
  var message = ${JSON.stringify(message)};
  function sendMessage() {
    if (window.opener) {
      window.opener.postMessage(message, "*");
      setTimeout(function() { window.close(); }, 500);
    }
  }
  if (document.readyState === "complete") {
    sendMessage();
  } else {
    window.addEventListener("load", sendMessage);
  }
})();
</script>
<p>Autenticando... puedes cerrar esta ventana.</p>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}

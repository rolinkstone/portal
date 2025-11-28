import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const issuer = process.env.KEYCLOAK_ISSUER;
  const clientId = process.env.KEYCLOAK_CLIENT_ID;
  const redirectUri = process.env.NEXTAUTH_URL;

  if (!issuer || !clientId || !redirectUri) {
    console.error("Missing Keycloak ENV!", {
      issuer,
      clientId,
      redirectUri,
    });

    return res.status(500).json({ error: "Server misconfiguration" });
  }

  const logoutUrl = `${issuer}/protocol/openid-connect/logout`;

  const params = new URLSearchParams({
    client_id: clientId,
    post_logout_redirect_uri: redirectUri, // kembali ke login page Next.js
  });

  const redirect = `${logoutUrl}?${params.toString()}`;

  return res.redirect(302, redirect);
}

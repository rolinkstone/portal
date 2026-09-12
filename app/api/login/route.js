import { createHash, timingSafeEqual } from "node:crypto";

// Hash dulu supaya panjang buffer selalu sama (syarat timingSafeEqual)
const digest = (value) => createHash("sha256").update(value, "utf8").digest();

export async function POST(req) {
  const { username, password } = await req.json();

  const expectedUser = process.env.LOGIN_USER;
  const expectedPass = process.env.LOGIN_PASS;

  // Fail-closed: kalau env belum di-set, `undefined === undefined` bisa lolos.
  if (!expectedUser || !expectedPass) {
    console.error("❌ LOGIN_USER / LOGIN_PASS belum di-set — login ditolak.");
    return Response.json({ success: false, error: "Server misconfiguration" }, { status: 500 });
  }

  if (typeof username !== "string" || typeof password !== "string") {
    return Response.json({ success: false }, { status: 401 });
  }

  // Perbandingan waktu-konstan agar tidak bocor lewat timing attack
  const userOk = timingSafeEqual(digest(username), digest(expectedUser));
  const passOk = timingSafeEqual(digest(password), digest(expectedPass));

  if (userOk && passOk) {
    return Response.json({ success: true });
  }

  return Response.json({ success: false }, { status: 401 });
}

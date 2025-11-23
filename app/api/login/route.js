export async function POST(req) {
  const { username, password } = await req.json();

  if (username === process.env.LOGIN_USER && password === process.env.LOGIN_PASS) {
    return Response.json({ success: true });
  }

  return Response.json({ success: false }, { status: 401 });
}

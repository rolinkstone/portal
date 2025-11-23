import mysql from "mysql2/promise";

export async function POST(req) {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "landing",
    });

    // Dapatkan IP visitor
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("host") ||
      "unknown";

    // Waktu sekarang
    const now = new Date();
    const tanggal = now.toISOString().slice(0, 10); // YYYY-MM-DD untuk field tanggal
    const online = Math.floor(now.getTime() / 1000); // UNIX timestamp detik

    // Cek apakah IP sudah tercatat hari ini
    const [rows] = await connection.execute(
      "SELECT * FROM statistik WHERE ip = ? AND tanggal = ?",
      [ip, tanggal]
    );

    if (rows.length > 0) {
      // Update hits & online
      await connection.execute(
        "UPDATE statistik SET hits = hits + 1, online = ? WHERE ip = ? AND tanggal = ?",
        [online, ip, tanggal]
      );
    } else {
      // Insert visitor baru
      await connection.execute(
        "INSERT INTO statistik (ip, tanggal, hits, online) VALUES (?, ?, 1, ?)",
        [ip, tanggal, online]
      );
    }

    await connection.end();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Visitor API Error:", err);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}

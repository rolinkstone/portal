import pool from "@/lib/db";

export async function POST(request) {
  try {
    const { ip, userAgent, referer } = await request.json();
    
    const connection = await pool.getConnection();
    const now = new Date();
    const today = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const timestamp = Math.floor(Date.now() / 1000);

    // Cek apakah IP sudah ada hari ini
    const [existing] = await connection.execute(
      "SELECT hits FROM statistik WHERE ip = ? AND tanggal = ?",
      [ip, today]
    );

    if (existing.length > 0) {
      // Update hits dan timestamp online
      await connection.execute(
        "UPDATE statistik SET hits = hits + 1, online = ? WHERE ip = ? AND tanggal = ?",
        [timestamp, ip, today]
      );
    } else {
      // Insert baru
      await connection.execute(
        "INSERT INTO statistik (ip, tanggal, hits, online) VALUES (?, ?, 1, ?)",
        [ip, today, timestamp]
      );
    }

    connection.release();

    return Response.json({ success: true, message: "Statistik tercatat" });
  } catch (err) {
    console.error("Error recording hit:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Juga tambahkan GET untuk testing
export async function GET() {
  return Response.json({ message: "Use POST to record a visit" });
}
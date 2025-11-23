import pool from "@/lib/db";

export async function GET() {
  try {
    const connection = await pool.getConnection();

    const now = new Date();
    const tanggalYmd = now.toISOString().slice(0, 10).replace(/-/g, "");
    const bulanNow = String(now.getMonth() + 1).padStart(2, "0");
    const tahunNow = now.getFullYear();
    const todaySQL = now.toISOString().slice(0, 10);
    const batasWaktu = Math.floor(Date.now() / 1000) - 300;

    // Query
    const [pengunjungHariIniResult] = await connection.execute(
      "SELECT ip FROM statistik WHERE tanggal = ? GROUP BY ip",
      [tanggalYmd]
    );

    const [totalHitsQuery] = await connection.execute(
      "SELECT SUM(hits) AS total FROM statistik"
    );

    const [totalPengunjungQuery] = await connection.execute(
      "SELECT COUNT(hits) AS total FROM statistik"
    );

    const [pengunjungBulanQuery] = await connection.execute(
      "SELECT COUNT(hits) AS total FROM statistik WHERE MONTH(tanggal) = ?",
      [bulanNow]
    );

    const [pengunjungTahunIniQuery] = await connection.execute(
      "SELECT COUNT(ip) AS total FROM statistik WHERE YEAR(tanggal) = ?",
      [tahunNow]
    );

    const [pengunjungTahunLaluQuery] = await connection.execute(
      "SELECT COUNT(ip) AS total FROM statistik WHERE YEAR(tanggal) = ?",
      [tahunNow - 1]
    );

    const [onlineQuery] = await connection.execute(
      "SELECT COUNT(*) AS total FROM statistik WHERE online > ?",
      [batasWaktu]
    );

    connection.release();

    return Response.json({
      pengunjungHariIni: pengunjungHariIniResult.length,
      totalHits: totalHitsQuery[0]?.total ?? 0,
      totalPengunjung: totalPengunjungQuery[0]?.total ?? 0,
      pengunjungBulanIni: pengunjungBulanQuery[0]?.total ?? 0,
      pengunjungTahunIni: pengunjungTahunIniQuery[0]?.total ?? 0,
      pengunjungTahunLalu: pengunjungTahunLaluQuery[0]?.total ?? 0,
      pengunjungOnline: onlineQuery[0]?.total ?? 0,
    });
  } catch (err) {
    console.error("API statistik error:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

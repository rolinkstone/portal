import pool from "@/lib/db";

export async function GET() {
  try {
    const connection = await pool.getConnection();

    const now = new Date();
    const todaySQL = now.toISOString().slice(0, 10); // Format YYYY-MM-DD
    const bulanNow = String(now.getMonth() + 1).padStart(2, "0");
    const tahunNow = now.getFullYear();
    const batasWaktu = Math.floor(Date.now() / 1000) - 300; // 5 menit yang lalu

    console.log(`Query untuk tanggal: ${todaySQL}, bulan: ${bulanNow}, tahun: ${tahunNow}`);

    // Query 1: Pengunjung Hari Ini
    const [pengunjungHariIniResult] = await connection.execute(
      "SELECT COUNT(DISTINCT ip) as total FROM statistik WHERE tanggal = ?",
      [todaySQL]
    );

    console.log("Hasil query hari ini:", pengunjungHariIniResult);

    // Query 2: Total Hits
    const [totalHitsQuery] = await connection.execute(
      "SELECT SUM(hits) AS total FROM statistik"
    );

    // Query 3: Total Pengunjung (unik berdasarkan IP)
    const [totalPengunjungQuery] = await connection.execute(
      "SELECT COUNT(DISTINCT ip) AS total FROM statistik"
    );

    // Query 4: Pengunjung Bulan Ini
    const [pengunjungBulanQuery] = await connection.execute(
      "SELECT COUNT(DISTINCT ip) AS total FROM statistik WHERE DATE_FORMAT(tanggal, '%Y-%m') = ?",
      [`${tahunNow}-${bulanNow}`]
    );

    console.log("Hasil query bulan ini:", pengunjungBulanQuery);

    // Query 5: Pengunjung Tahun Ini
    const [pengunjungTahunIniQuery] = await connection.execute(
      "SELECT COUNT(DISTINCT ip) AS total FROM statistik WHERE YEAR(tanggal) = ?",
      [tahunNow]
    );

    // Query 6: Pengunjung Tahun Lalu
    const [pengunjungTahunLaluQuery] = await connection.execute(
      "SELECT COUNT(DISTINCT ip) AS total FROM statistik WHERE YEAR(tanggal) = ?",
      [tahunNow - 1]
    );

    // Query 7: Pengunjung Online (dalam 5 menit terakhir)
    const [onlineQuery] = await connection.execute(
      "SELECT COUNT(DISTINCT ip) AS total FROM statistik WHERE online > ?",
      [batasWaktu]
    );

    console.log(`Batas waktu online: ${batasWaktu} (${new Date(batasWaktu * 1000).toLocaleString()})`);
    console.log("Hasil query online:", onlineQuery);

    connection.release();

    const responseData = {
      pengunjungHariIni: Number(pengunjungHariIniResult[0]?.total) || 0,
      totalHits: Number(totalHitsQuery[0]?.total) || 0,
      totalPengunjung: Number(totalPengunjungQuery[0]?.total) || 0,
      pengunjungBulanIni: Number(pengunjungBulanQuery[0]?.total) || 0,
      pengunjungTahunIni: Number(pengunjungTahunIniQuery[0]?.total) || 0,
      pengunjungTahunLalu: Number(pengunjungTahunLaluQuery[0]?.total) || 0,
      pengunjungOnline: Number(onlineQuery[0]?.total) || 0,
    };

    console.log("Response data:", responseData);

    return Response.json(responseData);
  } catch (err) {
    console.error("API statistik error:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
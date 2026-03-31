// app/api/statistik/route.js
import pool from "@/lib/db";

export async function GET() {
  let connection;
  
  try {
    connection = await pool.getConnection();
    
    const now = new Date();
    const todaySQL = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' });
    const tahunNow = now.getFullYear();
    const bulanNow = String(now.getMonth() + 1).padStart(2, "0");
    const tanggalHariIni = String(now.getDate()).padStart(2, "0");
    
    const startOfYear = `${tahunNow}-01-01`;
    const endOfToday = todaySQL;
    const tahunLalu = tahunNow - 1;
    const startOfLastYear = `${tahunLalu}-01-01`;
    const endOfLastYearSameDay = `${tahunLalu}-${bulanNow}-${tanggalHariIni}`;
    
    const batasWaktu = Math.floor(Date.now() / 1000) - 300; // 5 menit

    // 🔥 HITUNG ONLINE BERDASARKAN UNIQUE ID (SEMUA BARIS)
    const [onlineQuery] = await connection.execute(`
      SELECT COUNT(*) as total 
      FROM statistik 
      WHERE online > ? AND tanggal = ?
    `, [batasWaktu, todaySQL]);

    // Pengunjung hari ini (unique)
    const [pengunjungHariIniResult] = await connection.execute(`
      SELECT COUNT(*) as total 
      FROM statistik 
      WHERE tanggal = ?
    `, [todaySQL]);

    // Total hits
    const [totalHitsQuery] = await connection.execute(
      "SELECT COALESCE(SUM(hits), 0) AS total FROM statistik"
    );

    // Total pengunjung unique sepanjang masa
    const [totalPengunjungQuery] = await connection.execute(
      "SELECT COUNT(*) AS total FROM statistik"
    );

    // Bulan ini
    const [pengunjungBulanQuery] = await connection.execute(
      "SELECT COUNT(*) AS total FROM statistik WHERE DATE_FORMAT(tanggal, '%Y-%m') = ?", 
      [`${tahunNow}-${bulanNow}`]
    );

    // Tahun ini
    const [pengunjungTahunIniQuery] = await connection.execute(
      "SELECT COUNT(*) AS total FROM statistik WHERE tanggal BETWEEN ? AND ?", 
      [startOfYear, endOfToday]
    );

    // Tahun lalu (full year data)
    const [pengunjungTahunLaluFullQuery] = await connection.execute(
      "SELECT COUNT(*) AS total FROM statistik WHERE YEAR(tanggal) = ?", 
      [tahunLalu]
    );

    // Tahun lalu (periode sama dengan tahun ini)
    const [pengunjungTahunLaluPeriodeQuery] = await connection.execute(
      "SELECT COUNT(*) AS total FROM statistik WHERE tanggal BETWEEN ? AND ?", 
      [startOfLastYear, endOfLastYearSameDay]
    );

    // Data per bulan untuk tahun lalu (opsional)
    const [pengunjungPerBulanTahunLalu] = await connection.execute(`
      SELECT 
        MONTH(tanggal) as bulan,
        COUNT(*) as total
      FROM statistik 
      WHERE YEAR(tanggal) = ?
      GROUP BY MONTH(tanggal)
      ORDER BY bulan ASC
    `, [tahunLalu]);

    const tahunIni = Number(pengunjungTahunIniQuery[0]?.total) || 0;
    const tahunLaluPeriode = Number(pengunjungTahunLaluPeriodeQuery[0]?.total) || 0;
    const tahunLaluFull = Number(pengunjungTahunLaluFullQuery[0]?.total) || 0;
    
    let pertumbuhanYoY = 0;
    if (tahunLaluPeriode > 0) {
      pertumbuhanYoY = ((tahunIni - tahunLaluPeriode) / tahunLaluPeriode * 100);
    }

    // Hitung rata-rata per bulan tahun lalu
    const rataRataBulananTahunLalu = tahunLaluFull > 0 ? tahunLaluFull / 12 : 0;

    const data = {
      pengunjungHariIni: Number(pengunjungHariIniResult[0]?.total) || 0,
      totalHits: Number(totalHitsQuery[0]?.total) || 0,
      totalPengunjung: Number(totalPengunjungQuery[0]?.total) || 0,
      pengunjungBulanIni: Number(pengunjungBulanQuery[0]?.total) || 0,
      pengunjungTahunIni: tahunIni,
      pengunjungTahunLalu: tahunLaluFull,
      pengunjungTahunLaluPeriode: tahunLaluPeriode,
      pertumbuhanYoY: pertumbuhanYoY,
      pengunjungOnline: Number(onlineQuery[0]?.total) || 0,
      rataRataBulananTahunLalu: rataRataBulananTahunLalu,
      dataPerBulanTahunLalu: pengunjungPerBulanTahunLalu,
      tahunLalu: tahunLalu,
      tahunIni: tahunNow,
    };

    console.log("📊 Data statistik:", data);
    return Response.json(data);
    
  } catch (err) {
    console.error("❌ API statistik error:", err);
    return Response.json({
      totalPengunjung: 0,
      pengunjungHariIni: 0,
      pengunjungOnline: 0,
      totalHits: 0,
      pengunjungBulanIni: 0,
      pengunjungTahunIni: 0,
      pengunjungTahunLalu: 0,
      pengunjungTahunLaluPeriode: 0,
      pertumbuhanYoY: 0,
      rataRataBulananTahunLalu: 0,
      dataPerBulanTahunLalu: [],
      tahunLalu: tahunNow - 1,
      tahunIni: tahunNow,
    }, { status: 500 });
    
  } finally {
    if (connection) connection.release();
  }
}
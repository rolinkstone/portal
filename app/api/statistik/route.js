// app/api/statistik/route.js
import pool from "@/lib/db";

export async function GET() {
  let connection;
  
  try {
    connection = await pool.getConnection();
    
    // 🔥 GANTI: Gunakan UTC untuk semua operasi database
    const now = new Date();
    const utcYear = now.getUTCFullYear();
    const utcMonth = String(now.getUTCMonth() + 1).padStart(2, '0');
    const utcDay = String(now.getUTCDate()).padStart(2, '0');
    const utcDate = `${utcYear}-${utcMonth}-${utcDay}`;
    
    // Untuk tampilan di frontend, baru konversi ke WIB
    const wibDate = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' });
    const wibYear = parseInt(wibDate.split('-')[0]);
    const wibMonth = wibDate.split('-')[1];
    
    console.log('📅 Debug Timezone:');
    console.log('UTC Date:', utcDate);
    console.log('WIB Date:', wibDate);
    
    const startOfYear = `${utcYear}-01-01`;
    const endOfToday = utcDate;
    const startOfMonth = `${utcYear}-${utcMonth}-01`;
    const tahunLalu = utcYear - 1;
    const startOfLastYear = `${tahunLalu}-01-01`;
    const endOfLastYearSameDay = `${tahunLalu}-${utcMonth}-${utcDay}`;
    
    const batasWaktu = Math.floor(Date.now() / 1000) - 300;

    // 🔥 ONLINE COUNT
    const [onlineQuery] = await connection.execute(`
      SELECT COUNT(*) as total 
      FROM statistik 
      WHERE online > ? AND tanggal = ?
    `, [batasWaktu, utcDate]);

    // Pengunjung hari ini (UTC)
    const [pengunjungHariIniResult] = await connection.execute(`
      SELECT COUNT(*) as total 
      FROM statistik 
      WHERE tanggal = ?
    `, [utcDate]);

    // Total hits
    const [totalHitsQuery] = await connection.execute(
      "SELECT COALESCE(SUM(hits), 0) AS total FROM statistik"
    );

    // Total pengunjung unique
    const [totalPengunjungQuery] = await connection.execute(
      "SELECT COUNT(*) AS total FROM statistik"
    );

    // Bulan ini (UTC)
    const [pengunjungBulanQuery] = await connection.execute(
      "SELECT COUNT(*) AS total FROM statistik WHERE tanggal BETWEEN ? AND ?", 
      [startOfMonth, endOfToday]
    );

    // Tahun ini (UTC)
    const [pengunjungTahunIniQuery] = await connection.execute(
      "SELECT COUNT(*) AS total FROM statistik WHERE tanggal BETWEEN ? AND ?", 
      [startOfYear, endOfToday]
    );

    // Tahun lalu full (UTC)
    const [pengunjungTahunLaluFullQuery] = await connection.execute(
      "SELECT COUNT(*) AS total FROM statistik WHERE YEAR(tanggal) = ?", 
      [tahunLalu]
    );

    // Tahun lalu periode sama (UTC)
    const [pengunjungTahunLaluPeriodeQuery] = await connection.execute(
      "SELECT COUNT(*) AS total FROM statistik WHERE tanggal BETWEEN ? AND ?", 
      [startOfLastYear, endOfLastYearSameDay]
    );

    // Data per bulan tahun lalu (UTC)
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

    const rataRataBulananTahunLalu = tahunLaluFull > 0 ? tahunLaluFull / 12 : 0;

    console.log('📊 Query Results:');
    console.log('Start of month:', startOfMonth);
    console.log('End of today:', endOfToday);
    console.log('Pengunjung bulan ini:', pengunjungBulanQuery[0]?.total);
    console.log('Pengunjung hari ini:', pengunjungHariIniResult[0]?.total);
    console.log('Total pengunjung:', totalPengunjungQuery[0]?.total);

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
      tahunIni: utcYear,
      // Tambahkan info timezone untuk debugging
      serverDate: utcDate,
      wibDate: wibDate,
    };

    console.log("📊 Final data:", data);
    return Response.json(data);
    
  } catch (err) {
    console.error("❌ API statistik error:", err);
    return Response.json({
      pengunjungHariIni: 0,
      totalHits: 0,
      totalPengunjung: 0,
      pengunjungBulanIni: 0,
      pengunjungTahunIni: 0,
      pengunjungTahunLalu: 0,
      pengunjungTahunLaluPeriode: 0,
      pertumbuhanYoY: 0,
      pengunjungOnline: 0,
      rataRataBulananTahunLalu: 0,
      dataPerBulanTahunLalu: [],
      tahunLalu: new Date().getUTCFullYear() - 1,
      tahunIni: new Date().getUTCFullYear(),
    }, { status: 500 });
    
  } finally {
    if (connection) connection.release();
  }
}
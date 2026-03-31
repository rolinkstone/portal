// app/api/statistik/route.js
import pool from "@/lib/db";

export async function GET() {
  let connection;
  
  try {
    connection = await pool.getConnection();
    
    // Gunakan Intl.DateTimeFormat untuk konsistensi timezone
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    
    const formattedDate = formatter.format(now).split('-');
    const tahunNow = parseInt(formattedDate[0]);
    const bulanNow = formattedDate[1];
    const tanggalHariIni = formattedDate[2];
    const todaySQL = `${tahunNow}-${bulanNow}-${tanggalHariIni}`;
    
    const startOfYear = `${tahunNow}-01-01`;
    const endOfToday = todaySQL;
    const startOfMonth = `${tahunNow}-${bulanNow}-01`;
    const tahunLalu = tahunNow - 1;
    const startOfLastYear = `${tahunLalu}-01-01`;
    const endOfLastYearSameDay = `${tahunLalu}-${bulanNow}-${tanggalHariIni}`;
    
    const batasWaktu = Math.floor(Date.now() / 1000) - 300;

    console.log('📅 Debug Info:');
    console.log('Tanggal sekarang:', todaySQL);
    console.log('Start of month:', startOfMonth);
    console.log('End of today:', endOfToday);

    // 🔥 ONLINE COUNT
    const [onlineQuery] = await connection.execute(`
      SELECT COUNT(*) as total 
      FROM statistik 
      WHERE online > ? AND tanggal = ?
    `, [batasWaktu, todaySQL]);

    // Pengunjung hari ini
    const [pengunjungHariIniResult] = await connection.execute(`
      SELECT COUNT(*) as total 
      FROM statistik 
      WHERE tanggal = ?
    `, [todaySQL]);

    // Total hits
    const [totalHitsQuery] = await connection.execute(
      "SELECT COALESCE(SUM(hits), 0) AS total FROM statistik"
    );

    // Total pengunjung unique
    const [totalPengunjungQuery] = await connection.execute(
      "SELECT COUNT(*) AS total FROM statistik"
    );

    // 🔥 PERBAIKI: Bulan ini dengan range tanggal
    const [pengunjungBulanQuery] = await connection.execute(
      "SELECT COUNT(*) AS total FROM statistik WHERE tanggal BETWEEN ? AND ?", 
      [startOfMonth, endOfToday]
    );

    // Tahun ini
    const [pengunjungTahunIniQuery] = await connection.execute(
      "SELECT COUNT(*) AS total FROM statistik WHERE tanggal BETWEEN ? AND ?", 
      [startOfYear, endOfToday]
    );

    // Tahun lalu full
    const [pengunjungTahunLaluFullQuery] = await connection.execute(
      "SELECT COUNT(*) AS total FROM statistik WHERE YEAR(tanggal) = ?", 
      [tahunLalu]
    );

    // Tahun lalu periode sama
    const [pengunjungTahunLaluPeriodeQuery] = await connection.execute(
      "SELECT COUNT(*) AS total FROM statistik WHERE tanggal BETWEEN ? AND ?", 
      [startOfLastYear, endOfLastYearSameDay]
    );

    // Data per bulan tahun lalu
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
      tahunIni: tahunNow,
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
      tahunLalu: new Date().getFullYear() - 1,
      tahunIni: new Date().getFullYear(),
    }, { status: 500 });
    
  } finally {
    if (connection) connection.release();
  }
}
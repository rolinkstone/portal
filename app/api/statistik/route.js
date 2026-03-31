// app/api/statistik/route.js
import pool from "@/lib/db";

// Set timeout untuk query database
const QUERY_TIMEOUT = 10000; // 10 detik

export async function GET() {
  let connection;
  const startTime = Date.now();
  
  try {
    console.log('🚀 API statistik dipanggil:', new Date().toISOString());
    
    // Set timeout untuk koneksi database
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Database query timeout after 10 seconds')), QUERY_TIMEOUT);
    });
    
    connection = await pool.getConnection();
    console.log('✅ Koneksi database berhasil');
    
    const now = new Date();
    const utcYear = now.getUTCFullYear();
    const utcMonth = String(now.getUTCMonth() + 1).padStart(2, '0');
    const utcDay = String(now.getUTCDate()).padStart(2, '0');
    const utcDate = `${utcYear}-${utcMonth}-${utcDay}`;
    
    const startOfYear = `${utcYear}-01-01`;
    const endOfToday = utcDate;
    const startOfMonth = `${utcYear}-${utcMonth}-01`;
    const tahunLalu = utcYear - 1;
    const startOfLastYear = `${tahunLalu}-01-01`;
    const endOfLastYearSameDay = `${tahunLalu}-${utcMonth}-${utcDay}`;
    
    const batasWaktu = Math.floor(Date.now() / 1000) - 300;

    console.log('📅 Query dengan tanggal UTC:', utcDate);
    console.log('Start of month:', startOfMonth);
    console.log('End of today:', endOfToday);

    // Gunakan Promise.race untuk timeout
    const queryPromise = (async () => {
      // Jalankan semua query secara paralel
      const [
        [onlineQuery],
        [pengunjungHariIniResult],
        [totalHitsQuery],
        [totalPengunjungQuery],
        [pengunjungBulanQuery],
        [pengunjungTahunIniQuery],
        [pengunjungTahunLaluFullQuery],
        [pengunjungTahunLaluPeriodeQuery],
        pengunjungPerBulanTahunLalu
      ] = await Promise.all([
        connection.execute(`
          SELECT COUNT(*) as total 
          FROM statistik 
          WHERE online > ? AND tanggal = ?
        `, [batasWaktu, utcDate]),
        
        connection.execute(`
          SELECT COUNT(*) as total 
          FROM statistik 
          WHERE tanggal = ?
        `, [utcDate]),
        
        connection.execute(
          "SELECT COALESCE(SUM(hits), 0) AS total FROM statistik"
        ),
        
        connection.execute(
          "SELECT COUNT(*) AS total FROM statistik"
        ),
        
        connection.execute(
          "SELECT COUNT(*) AS total FROM statistik WHERE tanggal BETWEEN ? AND ?", 
          [startOfMonth, endOfToday]
        ),
        
        connection.execute(
          "SELECT COUNT(*) AS total FROM statistik WHERE tanggal BETWEEN ? AND ?", 
          [startOfYear, endOfToday]
        ),
        
        connection.execute(
          "SELECT COUNT(*) AS total FROM statistik WHERE YEAR(tanggal) = ?", 
          [tahunLalu]
        ),
        
        connection.execute(
          "SELECT COUNT(*) AS total FROM statistik WHERE tanggal BETWEEN ? AND ?", 
          [startOfLastYear, endOfLastYearSameDay]
        ),
        
        connection.execute(`
          SELECT 
            MONTH(tanggal) as bulan,
            COUNT(*) as total
          FROM statistik 
          WHERE YEAR(tanggal) = ?
          GROUP BY MONTH(tanggal)
          ORDER BY bulan ASC
        `, [tahunLalu])
      ]);

      const tahunIni = Number(pengunjungTahunIniQuery[0]?.total) || 0;
      const tahunLaluPeriode = Number(pengunjungTahunLaluPeriodeQuery[0]?.total) || 0;
      const tahunLaluFull = Number(pengunjungTahunLaluFullQuery[0]?.total) || 0;
      
      let pertumbuhanYoY = 0;
      if (tahunLaluPeriode > 0) {
        pertumbuhanYoY = ((tahunIni - tahunLaluPeriode) / tahunLaluPeriode * 100);
      }

      const rataRataBulananTahunLalu = tahunLaluFull > 0 ? tahunLaluFull / 12 : 0;

      return {
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
        serverTimestamp: new Date().toISOString(),
      };
    })();

    // Race antara query dan timeout
    const data = await Promise.race([queryPromise, timeoutPromise]);
    
    const endTime = Date.now();
    console.log(`✅ API selesai dalam ${endTime - startTime}ms`);
    console.log("📊 Data statistik:", data);
    
    return Response.json(data);
    
  } catch (err) {
    const endTime = Date.now();
    console.error(`❌ API statistik error after ${endTime - startTime}ms:`, err);
    
    // Return fallback data
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
      error: true,
      errorMessage: err.message,
    }, { 
      status: 500,
      headers: {
        'Cache-Control': 'no-store',
      }
    });
    
  } finally {
    if (connection) {
      connection.release();
      console.log('🔌 Koneksi database dilepaskan');
    }
  }
}
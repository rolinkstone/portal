// app/api/statistik/route.js
import pool from "@/lib/db";

// Set timeout untuk query database
const QUERY_TIMEOUT = 20000; // 20 detik

/**
 * Helper: run a single query with individual error handling so one failure
 * doesn't crash the entire batch. Returns { rows, error }.
 */
async function safeQuery(connection, sql, params = []) {
  try {
    const [rows] = await connection.execute(sql, params);
    return { rows, error: null };
  } catch (err) {
    console.error(`❌ Query error: ${sql.slice(0, 80)}...`, err.message);
    return { rows: [], error: err.message };
  }
}

export async function GET() {
  let connection;
  let timeoutId;
  const startTime = Date.now();
  
  try {
    console.log('🚀 API statistik dipanggil:', new Date().toISOString());
    
    connection = await pool.getConnection();
    console.log('✅ Koneksi database berhasil');
    
    const now = new Date();
    const jakartaDate = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' });
    const [jakartaYear, jakartaMonth, jakartaDay] = jakartaDate.split('-');
    
    const startOfYear = `${jakartaYear}-01-01`;
    const startOfMonth = `${jakartaYear}-${jakartaMonth}-01`;
    const tahunLalu = Number(jakartaYear) - 1;
    const startOfLastYear = `${tahunLalu}-01-01`;
    const endOfLastYearSameDay = `${tahunLalu}-${jakartaMonth}-${jakartaDay}`;
    
    const batasWaktu = Math.floor(Date.now() / 1000) - 300;

    console.log('📅 Query dengan tanggal Asia/Jakarta:', jakartaDate);

    // Timeout dengan cleanup — START setelah koneksi didapat
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(
        () => reject(new Error('Database query timeout')),
        QUERY_TIMEOUT
      );
    });

    // Jalankan semua query secara paralel — masing-masing punya error handling sendiri
    const [
      onlineRes,
      hariIniRes,
      totalHitsRes,
      totalPengunjungRes,
      bulanIniRes,
      tahunIniRes,
      tahunLaluFullRes,
      tahunLaluPeriodeRes,
      perBulanRes
    ] = await Promise.all([
      safeQuery(connection,
        `SELECT COUNT(*) as total FROM statistik WHERE online > ? AND tanggal = ?`,
        [batasWaktu, jakartaDate]
      ),
      safeQuery(connection,
        `SELECT COUNT(*) as total FROM statistik WHERE tanggal = ?`,
        [jakartaDate]
      ),
      safeQuery(connection,
        `SELECT COALESCE(SUM(hits), 0) AS total FROM statistik`
      ),
      safeQuery(connection,
        `SELECT COUNT(*) AS total FROM statistik`
      ),
      safeQuery(connection,
        `SELECT COUNT(*) AS total FROM statistik WHERE tanggal BETWEEN ? AND ?`,
        [startOfMonth, jakartaDate]
      ),
      safeQuery(connection,
        `SELECT COUNT(*) AS total FROM statistik WHERE tanggal BETWEEN ? AND ?`,
        [startOfYear, jakartaDate]
      ),
      safeQuery(connection,
        `SELECT COUNT(*) AS total FROM statistik WHERE YEAR(tanggal) = ?`,
        [tahunLalu]
      ),
      safeQuery(connection,
        `SELECT COUNT(*) AS total FROM statistik WHERE tanggal BETWEEN ? AND ?`,
        [startOfLastYear, endOfLastYearSameDay]
      ),
      safeQuery(connection,
        `SELECT MONTH(tanggal) as bulan, COUNT(*) as total
         FROM statistik WHERE YEAR(tanggal) = ?
         GROUP BY MONTH(tanggal) ORDER BY bulan ASC`,
        [tahunLalu]
      )
    ]);

    // Clear timeout — cegah unhandled rejection yang bisa crash Node.js
    clearTimeout(timeoutId);

    const tahunIni = Number(tahunIniRes.rows[0]?.total) || 0;
    const tahunLaluPeriode = Number(tahunLaluPeriodeRes.rows[0]?.total) || 0;
    const tahunLaluFull = Number(tahunLaluFullRes.rows[0]?.total) || 0;

    let pertumbuhanYoY = 0;
    if (tahunLaluPeriode > 0) {
      pertumbuhanYoY = ((tahunIni - tahunLaluPeriode) / tahunLaluPeriode * 100);
    }

    const rataRataBulananTahunLalu = tahunLaluFull > 0 ? tahunLaluFull / 12 : 0;

    const data = {
      pengunjungHariIni: Number(hariIniRes.rows[0]?.total) || 0,
      totalHits: Number(totalHitsRes.rows[0]?.total) || 0,
      totalPengunjung: Number(totalPengunjungRes.rows[0]?.total) || 0,
      pengunjungBulanIni: Number(bulanIniRes.rows[0]?.total) || 0,
      pengunjungTahunIni: tahunIni,
      pengunjungTahunLalu: tahunLaluFull,
      pengunjungTahunLaluPeriode: tahunLaluPeriode,
      pertumbuhanYoY: pertumbuhanYoY,
      pengunjungOnline: Number(onlineRes.rows[0]?.total) || 0,
      rataRataBulananTahunLalu: rataRataBulananTahunLalu,
      dataPerBulanTahunLalu: perBulanRes.rows,
      tahunLalu: tahunLalu,
      tahunIni: Number(jakartaYear),
      serverTimestamp: new Date().toISOString(),
    };
    
    const endTime = Date.now();
    console.log(`✅ API selesai dalam ${endTime - startTime}ms`);
    
    return Response.json(data);
    
  } catch (err) {
    const endTime = Date.now();
    console.error(`❌ API statistik error after ${endTime - startTime}ms:`, err);
    
    // Pastikan timeout dibersihkan walau error
    if (timeoutId) clearTimeout(timeoutId);
    
    const now = new Date();
    const jakartaDate = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' });
    const tahunLalu = Number(jakartaDate.split('-')[0]) - 1;
    
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
      tahunLalu: tahunLalu,
      tahunIni: Number(jakartaDate.split('-')[0]),
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
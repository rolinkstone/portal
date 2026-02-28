// app/api/statistik/check/route.js
import pool from "@/lib/db";

export async function GET() {
  let connection;
  try {
    connection = await pool.getConnection();
    
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    
    // Cek total data
    const [total] = await connection.execute("SELECT COUNT(*) as total FROM statistik");
    
    // Cek data hari ini
    const [todayData] = await connection.execute(
      "SELECT COUNT(*) as total, SUM(hits) as totalHits FROM statistik WHERE tanggal = ?",
      [today]
    );
    
    // Cek 5 data terbaru
    const [recent] = await connection.execute(
      "SELECT ip, tanggal, hits, online FROM statistik ORDER BY tanggal DESC, online DESC LIMIT 5"
    );

    // Cek koneksi database
    const [dbName] = await connection.execute("SELECT DATABASE() as db");

    return Response.json({
      success: true,
      database: dbName[0].db,
      totalRows: total[0].total,
      today: {
        tanggal: today,
        total: todayData[0].total || 0,
        totalHits: todayData[0].totalHits || 0
      },
      recent: recent
    });
    
  } catch (error) {
    console.error("Check error:", error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}
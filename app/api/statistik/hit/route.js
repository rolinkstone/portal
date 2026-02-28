// app/api/statistik/hit/route.js
import pool from "@/lib/db";

export async function POST(request) {
  let connection;
  try {
    const body = await request.json();
    const { ip, userAgent, referer, sessionId } = body;
    
    console.log('📝 Hit request:', { ip, sessionId });

    if (!ip || ip === 'unknown' || !sessionId) {
      return Response.json({ 
        success: false, 
        message: "Data tidak lengkap" 
      });
    }

    connection = await pool.getConnection();
    
    const now = new Date();
    const today = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' });
    const timestamp = Math.floor(Date.now() / 1000);

    // Cek apakah kombinasi IP + session sudah ada hari ini
    const [existing] = await connection.execute(
      "SELECT * FROM statistik WHERE ip = ? AND session_id = ? AND tanggal = ?",
      [ip, sessionId, today]
    );

    let isNewVisitor = false;

    if (existing.length === 0) {
      // BELUM PERNAH KUNJUNG HARI INI
      isNewVisitor = true;
      
      await connection.execute(`
        INSERT INTO statistik (ip, session_id, tanggal, hits, online) 
        VALUES (?, ?, ?, 1, ?)
      `, [ip, sessionId, today, timestamp]);
      
      console.log('✅ Pengunjung BARU:', { ip, sessionId });
      
    } else {
      // SUDAH PERNAH KUNJUNG - update hits
      await connection.execute(`
        UPDATE statistik 
        SET hits = hits + 1, online = ? 
        WHERE ip = ? AND session_id = ? AND tanggal = ?
      `, [timestamp, ip, sessionId, today]);
      
      console.log('🔄 Kunjungan ulang:', { ip, sessionId });
    }

    return Response.json({ 
      success: true, 
      isNewVisitor,
      message: isNewVisitor ? "Pengunjung baru tercatat" : "Kunjungan tercatat"
    });
    
  } catch (err) {
    console.error("❌ Error:", err);
    return Response.json({ 
      success: false, 
      error: err.message 
    }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}

export async function GET() {
  return Response.json({ message: "Gunakan POST" });
}
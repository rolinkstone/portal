// app/api/statistik/sessions/route.js
import pool from "@/lib/db";

export async function GET() {
  let connection;
  try {
    connection = await pool.getConnection();
    
    const batasWaktu = Math.floor(Date.now() / 1000) - 300; // 5 menit
    
    // Cek apakah tabel online_sessions ada
    const [tables] = await connection.execute(
      "SHOW TABLES LIKE 'online_sessions'"
    );
    
    if (tables.length > 0) {
      const [sessions] = await connection.execute(
        "SELECT session_id, ip, last_seen, user_agent FROM online_sessions WHERE last_seen > ? ORDER BY last_seen DESC",
        [batasWaktu]
      );
      
      return Response.json({
        success: true,
        count: sessions.length,
        sessions: sessions
      });
    } else {
      // Fallback ke statistik
      const [sessions] = await connection.execute(
        "SELECT ip, online as last_seen FROM statistik WHERE online > ? GROUP BY ip",
        [batasWaktu]
      );
      
      return Response.json({
        success: true,
        count: sessions.length,
        sessions: sessions.map(s => ({
          session_id: s.ip,
          ip: s.ip,
          last_seen: s.last_seen
        }))
      });
    }
    
  } catch (error) {
    console.error("Sessions error:", error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}
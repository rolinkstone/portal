// app/stats/page.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import pool from "@/lib/db";
import { redirect } from 'next/navigation';

async function getStats() {
  let connection;
  try {
    connection = await pool.getConnection();
    
    // Statistik hari ini
    const [today] = await connection.execute(`
      SELECT COUNT(DISTINCT ip) as unique_visitors, 
             SUM(hits) as total_hits 
      FROM statistik 
      WHERE tanggal = CURDATE()
    `);
    
    // Top IP hari ini
    const [topIPs] = await connection.execute(`
      SELECT ip, hits, online 
      FROM statistik 
      WHERE tanggal = CURDATE() 
      ORDER BY hits DESC 
      LIMIT 10
    `);
    
    // Total keseluruhan
    const [total] = await connection.execute(`
      SELECT COUNT(DISTINCT ip) as total_unique,
             SUM(hits) as total_hits 
      FROM statistik
    `);
    
    return {
      today: today[0],
      topIPs,
      total: total[0]
    };
    
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    if (connection) connection.release();
  }
}

export default async function StatsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/api/auth/signin");
  }

  const stats = await getStats();
  
  if (!stats) {
    return <div className="p-8">Error loading stats</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Statistik Real-time</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-gray-400 text-sm">Pengunjung Hari Ini</h2>
          <p className="text-3xl font-bold">{stats.today.unique_visitors || 0}</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-gray-400 text-sm">Total Hits Hari Ini</h2>
          <p className="text-3xl font-bold">{stats.today.total_hits || 0}</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-gray-400 text-sm">Total Pengunjung Unik</h2>
          <p className="text-3xl font-bold">{stats.total.total_unique || 0}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Top Pengunjung Hari Ini</h2>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3 text-left">IP</th>
              <th className="p-3 text-left">Hits</th>
              <th className="p-3 text-left">Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {stats.topIPs.map((row, i) => (
              <tr key={i} className="border-t border-gray-700">
                <td className="p-3">{row.ip}</td>
                <td className="p-3">{row.hits}</td>
                <td className="p-3">
                  {new Date(row.online * 1000).toLocaleString('id-ID')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
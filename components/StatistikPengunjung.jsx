import mysql from "mysql2/promise";
import { UserIcon, CalendarIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { BoltIcon } from "@heroicons/react/24/solid";

export default async function StatistikPengunjung() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "landing",
  });

  // Format tanggal seperti PHP: Ymd
  const now = new Date();
  const tanggalYmd = now.toISOString().slice(0, 10).replace(/-/g, ""); // format PHP "Ymd"
  const bulanNow = String(now.getMonth() + 1).padStart(2, "0");
  const tahunNow = now.getFullYear();
  const todaySQL = now.toISOString().slice(0, 10); // "YYYY-MM-DD"

  // ==========================
  // 1. Pengunjung hari ini (distinct IP)
  // ==========================
  const [pengunjungHariIniResult] = await connection.execute(
    "SELECT ip FROM statistik WHERE tanggal = ? GROUP BY ip",
    [tanggalYmd]
  );
  const pengunjungHariIni = pengunjungHariIniResult.length;

  // ==========================
  // 2. Total hits (SUM)
  // ==========================
  const [totalHitsQuery] = await connection.execute(
    "SELECT SUM(hits) AS total FROM statistik"
  );
  const totalHits = totalHitsQuery[0]?.total ?? 0;

  // ==========================
  // 3. Hits hari ini
  // ==========================
  const [hitsHariIniQuery] = await connection.execute(
    "SELECT SUM(hits) AS jumlah FROM statistik WHERE tanggal = ? GROUP BY tanggal",
    [tanggalYmd]
  );
  const hitsHariIni = hitsHariIniQuery[0]?.jumlah ?? 0;

  // ==========================
  // 4. Total pengunjung (COUNT hits seperti PHP)
  // ==========================
  const [totalPengunjungQuery] = await connection.execute(
    "SELECT COUNT(hits) AS total FROM statistik"
  );
  const totalPengunjung = totalPengunjungQuery[0]?.total ?? 0;

  // ==========================
  // 5. Pengunjung bulan ini
  // ==========================
  const [pengunjungBulanQuery] = await connection.execute(
    "SELECT COUNT(hits) AS total FROM statistik WHERE MONTH(tanggal) = ? GROUP BY YEAR(tanggal)",
    [bulanNow]
  );
  const pengunjungBulanIni = pengunjungBulanQuery[0]?.total ?? 0;

  // ==========================
  // 6. Pengunjung tahun ini
  // ==========================
  const [pengunjungTahunIniQuery] = await connection.execute(
    `
      SELECT COUNT(ip) AS total
      FROM statistik
      WHERE YEAR(tanggal) = ?
      AND tanggal <= ?
    `,
    [tahunNow, todaySQL.replace(/-/g, "")]
  );
  const pengunjungTahunIni = pengunjungTahunIniQuery[0]?.total ?? 0;

  // ==========================
  // 7. Pengunjung tahun lalu
  // ==========================
  const [pengunjungTahunLaluQuery] = await connection.execute(
    `
      SELECT COUNT(ip) AS total
      FROM statistik
      WHERE YEAR(tanggal) = ?
      AND tanggal <= DATE_SUB(?, INTERVAL 1 YEAR)
    `,
    [tahunNow - 1, todaySQL]
  );
  const pengunjungTahunLalu = pengunjungTahunLaluQuery[0]?.total ?? 0;

  // ==========================
  // 8. Online (5 menit terakhir)
  // ==========================
  const batasWaktu = Math.floor(Date.now() / 1000) - 300;

  const [onlineQuery] = await connection.execute(
    "SELECT COUNT(*) AS total FROM statistik WHERE online > ?",
    [batasWaktu]
  );
  const pengunjungOnline = onlineQuery[0]?.total ?? 0;

  await connection.end();

  // ==========================
  // UI
  // ==========================

  return (
    <section className="w-full py-12 bg-gradient-to-b from-[#00000] via-[#0000] to-[#14385F]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Visitor Statistik
        </h2>

        {/* Baris 1 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center mb-6">
          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-tr from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition">
            <UserIcon className="w-10 h-10 mx-auto text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold text-blue-900">Total Pengunjung</h3>
            <p className="text-4xl font-bold mt-2">{totalPengunjung}</p>
          </div>

          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-tr from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition">
            <CalendarIcon className="w-10 h-10 mx-auto text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-green-900">Pengunjung Hari Ini</h3>
            <p className="text-4xl font-bold mt-2">{pengunjungHariIni}</p>
          </div>

          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-tr from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 transition">
            <BoltIcon className="w-10 h-10 mx-auto text-yellow-500 mb-4" />
            <h3 className="text-lg font-semibold text-yellow-900">Online</h3>
            <p className="text-4xl font-bold mt-2">{pengunjungOnline}</p>
          </div>

          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-tr from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 transition">
            <ChartBarIcon className="w-10 h-10 mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-semibold text-red-900">Total Hits</h3>
            <p className="text-4xl font-bold mt-2">{totalHits}</p>
          </div>
        </div>

        {/* Baris 2 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-tr from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition">
            <UserIcon className="w-10 h-10 mx-auto text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold text-purple-900">Pengunjung Bulan Ini</h3>
            <p className="text-4xl font-bold mt-2">{pengunjungBulanIni}</p>
          </div>

          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-tr from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 transition">
            <CalendarIcon className="w-10 h-10 mx-auto text-indigo-500 mb-4" />
            <h3 className="text-lg font-semibold text-indigo-900">Pengunjung Tahun Ini</h3>
            <p className="text-4xl font-bold mt-2">{pengunjungTahunIni}</p>
          </div>

          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-tr from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 transition">
            <CalendarIcon className="w-10 h-10 mx-auto text-pink-500 mb-4" />
            <h3 className="text-lg font-semibold text-pink-900">Pengunjung Tahun Lalu</h3>
            <p className="text-4xl font-bold mt-2">{pengunjungTahunLalu}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { UserIcon, CalendarIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { BoltIcon } from "@heroicons/react/24/solid";

export default async function StatistikPengunjung() {
  let data = {};

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/statistik`, {
      cache: "no-store",
    });

    data = await res.json();
  } catch (error) {
    console.log("Gagal fetch:", error);
  }

  return (
    <section className="w-full py-12 bg-gradient-to-b from-[#00000] via-[#0F2A4A] to-[#14385F]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Visitor Statistik
        </h2>

        {/* BARIS 1 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center mb-6">

          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-tr from-blue-50 to-blue-100">
            <UserIcon className="w-10 h-10 mx-auto text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold text-blue-900">Total Pengunjung</h3>
            <p className="text-4xl font-bold mt-2">{data.totalPengunjung}</p>
          </div>

          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-tr from-green-50 to-green-100">
            <CalendarIcon className="w-10 h-10 mx-auto text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-green-900">Hari Ini</h3>
            <p className="text-4xl font-bold mt-2">{data.pengunjungHariIni}</p>
          </div>

          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-tr from-yellow-50 to-yellow-100">
            <BoltIcon className="w-10 h-10 mx-auto text-yellow-500 mb-4" />
            <h3 className="text-lg font-semibold text-yellow-900">Online</h3>
            <p className="text-4xl font-bold mt-2">{data.pengunjungOnline}</p>
          </div>

          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-tr from-red-50 to-red-100">
            <ChartBarIcon className="w-10 h-10 mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-semibold text-red-900">Total Hits</h3>
            <p className="text-4xl font-bold mt-2">{data.totalHits}</p>
          </div>

        </div>

        {/* BARIS 2 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">

          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-tr from-purple-50 to-purple-100">
            <UserIcon className="w-10 h-10 mx-auto text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold text-purple-900">Bulan Ini</h3>
            <p className="text-4xl font-bold mt-2">{data.pengunjungBulanIni}</p>
          </div>

          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-tr from-indigo-50 to-indigo-100">
            <CalendarIcon className="w-10 h-10 mx-auto text-indigo-500 mb-4" />
            <h3 className="text-lg font-semibold text-indigo-900">Tahun Ini</h3>
            <p className="text-4xl font-bold mt-2">{data.pengunjungTahunIni}</p>
          </div>

          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-tr from-pink-50 to-pink-100">
            <CalendarIcon className="w-10 h-10 mx-auto text-pink-500 mb-4" />
            <h3 className="text-lg font-semibold text-pink-900">Tahun Lalu</h3>
            <p className="text-4xl font-bold mt-2">{data.pengunjungTahunLalu}</p>
          </div>

        </div>
      </div>
    </section>
  );
}

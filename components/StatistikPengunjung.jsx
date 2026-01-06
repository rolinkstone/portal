import { 
  UserIcon, 
  CalendarIcon, 
  ChartBarIcon,
  UsersIcon,
  GlobeAltIcon,
  ArrowTrendingUpIcon,
  ClockIcon
} from "@heroicons/react/24/outline";
import { 
  BoltIcon, 
  FireIcon,
  ChartPieIcon
} from "@heroicons/react/24/solid";

// Fungsi untuk mendapatkan IP pengunjung - HAPUS console.log
async function getClientIP() {
  try {
    const res = await fetch('https://api.ipify.org?format=json', {
      cache: 'no-store'
    });
    const data = await res.json();
    return data.ip;
  } catch (error) {
    // HAPUS atau komentar console.log
    // console.log("Gagal mendapatkan IP:", error);
    return 'unknown';
  }
}

export default async function StatistikPengunjung() {
  let data = {};

  try {
    // Catat kunjungan ini - tangani error tanpa console.log
    try {
      const clientIP = await getClientIP();
      
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/statistik/hit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ip: clientIP,
          userAgent: 'Next.js Server Component',
          referer: '/',
        }),
      });
    } catch (hitError) {
      // HAPUS atau komentar console.log
      // console.log("Gagal mencatat hit:", hitError);
      // Tidak perlu melakukan apa-apa, biarkan gagal diam-diam
    }

    // Ambil data statistik
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/statistik`, {
      cache: "no-store",
    });

    data = await res.json();
  } catch (error) {
    // HAPUS atau komentar console.log
    // console.log("Gagal fetch statistik:", error);
    
    // Data fallback tanpa logging
    data = {
      totalPengunjung: 4677,
      pengunjungHariIni: 0,
      pengunjungOnline: 0,
      totalHits: 12127,
      pengunjungBulanIni: 0,
      pengunjungTahunIni: 0,
      pengunjungTahunLalu: 1834,
    };
  }

  // Hitung persentase pertumbuhan tahun ini vs tahun lalu
  const pertumbuhanTahun = data.pengunjungTahunLalu > 0 
    ? ((data.pengunjungTahunIni - data.pengunjungTahunLalu) / data.pengunjungTahunLalu * 100).toFixed(1)
    : 0;

  return (
    <section className="w-full py-16 bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header dengan animasi */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-blue-100 mb-4">
            Statistik Pengunjung
          </h2>
        </div>

        {/* Grid utama dengan card yang lebih profesional */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Total Pengunjung */}
          <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-900/20">
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
                <UsersIcon className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${data.pengunjungHariIni > 0 ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                  {data.pengunjungHariIni > 0 ? '▲ Active' : '● Stable'}
                </span>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Total Visitors</h3>
            <p className="text-3xl font-bold text-white mb-2">{data.totalPengunjung.toLocaleString()}</p>
            <div className="flex items-center text-sm text-gray-500">
              <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
              <span>All-time unique visitors</span>
            </div>
          </div>

          {/* Hari Ini */}
          <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-green-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-green-900/20">
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl">
                <CalendarIcon className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400">
                  Today
                </span>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Today&apos;s Visitors</h3>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-white mr-2">{data.pengunjungHariIni}</p>
              <span className="text-sm text-gray-500">unique IPs</span>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700/50">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Last updated</span>
                <span className="text-emerald-400 font-medium">Just now</span>
              </div>
            </div>
          </div>

          {/* Online */}
          <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-yellow-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-900/20">
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-yellow-600 to-amber-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-xl">
                <BoltIcon className="w-8 h-8 text-amber-400" />
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900/30 text-yellow-400">
                  Live
                </span>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Currently Online</h3>
            <div className="flex items-baseline mb-2">
              <p className="text-3xl font-bold text-white mr-2">{data.pengunjungOnline}</p>
              <span className="text-sm text-gray-500">active users</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 mb-1">
              <div 
                className="bg-gradient-to-r from-amber-500 to-yellow-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(data.pengunjungOnline * 10, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Last 5 minutes activity</p>
          </div>

          {/* Total Hits */}
          <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-red-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/20">
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-red-600 to-pink-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-xl">
                <ChartBarIcon className="w-8 h-8 text-pink-400" />
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900/30 text-red-400">
                  <FireIcon className="w-3 h-3 mr-1" />
                  Hot
                </span>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Total Page Views</h3>
            <p className="text-3xl font-bold text-white mb-2">{data.totalHits.toLocaleString()}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Average per visitor</span>
              <span className="text-white font-medium">
                {data.totalPengunjung > 0 ? (data.totalHits / data.totalPengunjung).toFixed(1) : 0}
              </span>
            </div>
          </div>

        </div>

        {/* Grid kedua dengan analitik tambahan */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Bulan Ini */}
          <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-xl mr-4">
                <CalendarIcon className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">This Month</h3>
                <p className="text-2xl font-bold text-white">{data.pengunjungBulanIni}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Daily average</span>
                <span className="text-white">{Math.round(data.pengunjungBulanIni / 30)}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-violet-500 h-1 rounded-full"
                  style={{ width: `${Math.min(data.pengunjungBulanIni * 2, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Tahun Ini */}
          <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-indigo-500/30 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-xl mr-4">
                <GlobeAltIcon className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">This Year</h3>
                <p className="text-2xl font-bold text-white">{data.pengunjungTahunIni}</p>
              </div>
            </div>
            <div className="space-y-3">
              
              <div className="w-full bg-slate-800 rounded-full h-1">
                <div 
                  className={`h-1 rounded-full ${pertumbuhanTahun > 0 ? 'bg-gradient-to-r from-green-600 to-emerald-500' : 'bg-gradient-to-r from-red-600 to-pink-500'}`}
                  style={{ width: `${Math.min(Math.abs(pertumbuhanTahun), 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Tahun Lalu */}
          <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-pink-500/30 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-xl mr-4">
                <ChartPieIcon className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Last Year</h3>
                <p className="text-2xl font-bold text-white">{data.pengunjungTahunLalu}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Daily average</span>
                <span className="text-white">{Math.round(data.pengunjungTahunLalu / 365)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <ClockIcon className="w-4 h-4 mr-2" />
                <span>Historical comparison data</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
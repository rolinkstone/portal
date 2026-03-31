// components/StatistikPengunjung.jsx
import { 
  UsersIcon, 
  CalendarIcon, 
  ChartBarIcon,
  BoltIcon, 
  FireIcon,
  ChartPieIcon,
  GlobeAltIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  ArrowPathIcon,
  CalendarDaysIcon
} from "@heroicons/react/24/outline";
import StatistikTracker from "@/components/StatistikTracker";

// Fungsi fetch dengan timeout
async function fetchWithTimeout(url, options = {}, timeout = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

// Fungsi getData dengan retry
async function getData(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                     (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
      
      console.log(`🔄 Fetching stats (attempt ${i + 1}/${retries})...`);
      
      const res = await fetchWithTimeout(`${baseUrl}/api/statistik`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      }, 15000); // 15 seconds timeout
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('✅ Stats fetched successfully:', data);
      return data;
      
    } catch (error) {
      console.error(`❌ Error fetching stats (attempt ${i + 1}/${retries}):`, error);
      
      if (i === retries - 1) {
        // Last attempt failed, return fallback data
        console.log('📊 Using fallback data');
        return {
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
        };
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

// Format angka
const formatNumber = (num) => {
  return new Intl.NumberFormat('id-ID').format(num || 0);
};

// Format angka dengan desimal
const formatDecimal = (num) => {
  return new Intl.NumberFormat('id-ID', { 
    minimumFractionDigits: 0,
    maximumFractionDigits: 1 
  }).format(num || 0);
};

// Fungsi untuk format tanggal dengan timezone yang konsisten
const formatDateWithTimezone = (date, timezone = 'Asia/Jakarta') => {
  return new Intl.DateTimeFormat('id-ID', {
    timeZone: timezone,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date);
};

export default async function StatistikPengunjung() {
  const data = await getData();

  // Jika data null atau error, tampilkan pesan dengan retry button
  if (!data || data.error) {
    return (
      <section className="w-full py-16 bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-400 mb-4">
              ⚠️ Gagal memuat data statistik
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </section>
    );
  }

  const pertumbuhanYoY = data.pertumbuhanYoY || 0;
  const pertumbuhanStyle = pertumbuhanYoY > 0 ? 'text-green-400' : pertumbuhanYoY < 0 ? 'text-red-400' : 'text-gray-400';
  const pertumbuhanIcon = pertumbuhanYoY > 0 ? '▲' : pertumbuhanYoY < 0 ? '▼' : '•';

  const sekarang = new Date();
  const tahunSekarang = sekarang.getFullYear();
  const tahunLalu = data.tahunLalu || (tahunSekarang - 1);
  
  // Gunakan fungsi format dengan timezone yang konsisten
  const tanggalFormat = formatDateWithTimezone(sekarang, 'Asia/Jakarta').split(' ')[0];
  const updateTimeFormatted = formatDateWithTimezone(sekarang, 'Asia/Jakarta');
  
  // Nama bulan dalam Bahasa Indonesia
  const namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                     'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  return (
    <>
      <StatistikTracker />
      
      <section className="w-full py-16 bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Statistik Pengunjung
            </h2>
            <p className="text-gray-400">
              Total {formatNumber(data.totalPengunjung)} pengunjung unik sepanjang masa
            </p>
          </div>

          {/* Grid Statistik */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Total Pengunjung */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <UsersIcon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Pengunjung</p>
                  <p className="text-2xl font-bold text-white">{formatNumber(data.totalPengunjung)}</p>
                  <p className="text-xs text-gray-500">sepanjang masa</p>
                </div>
              </div>
            </div>

            {/* Hari Ini */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <CalendarIcon className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Hari Ini</p>
                  <p className="text-2xl font-bold text-white">{formatNumber(data.pengunjungHariIni)}</p>
                  <p className="text-xs text-gray-500">{tanggalFormat}</p>
                </div>
              </div>
            </div>

            {/* Online */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <BoltIcon className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Online</p>
                  <p className="text-2xl font-bold text-white">{formatNumber(data.pengunjungOnline)}</p>
                  <p className="text-xs text-gray-500">sedang aktif</p>
                </div>
              </div>
            </div>

            {/* Total Hits */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <ChartBarIcon className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Tayangan</p>
                  <p className="text-2xl font-bold text-white">{formatNumber(data.totalHits)}</p>
                  <p className="text-xs text-gray-500">total page views</p>
                </div>
              </div>
            </div>

            {/* Bulan Ini */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <CalendarIcon className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Bulan Ini</p>
                  <p className="text-2xl font-bold text-white">{formatNumber(data.pengunjungBulanIni)}</p>
                  <p className="text-xs text-gray-500">{namaBulan[sekarang.getMonth()]} {tahunSekarang}</p>
                </div>
              </div>
            </div>

            {/* Tahun Ini */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-500/20 rounded-lg">
                  <GlobeAltIcon className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Tahun Ini</p>
                  <p className="text-2xl font-bold text-white">{formatNumber(data.pengunjungTahunIni)}</p>
                  <p className="text-xs text-gray-500">{tahunSekarang} (sd {tanggalFormat})</p>
                </div>
              </div>
            </div>

            {/* Tahun Lalu - FULL */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-pink-500/20 rounded-lg">
                  <ChartPieIcon className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Tahun Lalu</p>
                  <p className="text-2xl font-bold text-white">{formatNumber(data.pengunjungTahunLalu)}</p>
                  <p className="text-xs text-gray-500">Total {tahunLalu}</p>
                </div>
              </div>
            </div>

            {/* Pertumbuhan */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-500/20 rounded-lg">
                  <ArrowTrendingUpIcon className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Pertumbuhan YoY</p>
                  <p className={`text-2xl font-bold ${pertumbuhanStyle}`}>
                    {pertumbuhanIcon} {Math.abs(pertumbuhanYoY).toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-500">vs periode sama {tahunLalu}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistik Tambahan Tahun Lalu */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Rata-rata Bulanan Tahun Lalu */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <CalendarDaysIcon className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-white font-semibold">Rata-rata Bulanan {tahunLalu}</h3>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-cyan-400">
                  {formatDecimal(data.rataRataBulananTahunLalu)}
                </p>
                <p className="text-gray-400 text-sm mt-1">pengunjung per bulan</p>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-700">
                <p className="text-xs text-gray-500 text-center">
                  Total {formatNumber(data.pengunjungTahunLalu)} pengunjung sepanjang {tahunLalu}
                </p>
              </div>
            </div>

            {/* Perbandingan dengan Periode Sama */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <ArrowPathIcon className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-white font-semibold">Perbandingan Periode</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-gray-400 text-sm">Tahun Ini</p>
                  <p className="text-xl font-bold text-white">{formatNumber(data.pengunjungTahunIni)}</p>
                  <p className="text-xs text-gray-500">sd {tanggalFormat}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Tahun Lalu</p>
                  <p className="text-xl font-bold text-white">{formatNumber(data.pengunjungTahunLaluPeriode)}</p>
                  <p className="text-xs text-gray-500">periode sama {tahunLalu}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Update Time */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <ClockIcon className="w-4 h-4 inline mr-1" />
            Terakhir diperbarui: {updateTimeFormatted} WIB
          </div>
        </div>
      </section>
    </>
  );
}
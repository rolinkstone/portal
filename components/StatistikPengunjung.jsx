// components/StatistikPengunjung.jsx
'use client';

import { useState, useEffect } from 'react';
import { 
  UsersIcon, 
  CalendarIcon, 
  ChartBarIcon,
  BoltIcon, 
  ChartPieIcon,
  GlobeAltIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  ArrowPathIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";

const formatNumber = (num) => {
  return new Intl.NumberFormat('id-ID').format(num || 0);
};

const formatDecimal = (num) => {
  return new Intl.NumberFormat('id-ID', { 
    minimumFractionDigits: 0,
    maximumFractionDigits: 1 
  }).format(num || 0);
};

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

// Fungsi fetch dengan retry - PERBAIKI URL
const fetchWithRetry = async (retries = 3, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      // 🔥 PERBAIKI: Gunakan relative URL, bukan absolute
      const url = '/api/statistik';
      
      console.log(`🔄 Fetch attempt ${i + 1}/${retries}: ${url}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const response = await fetch(url, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Fetch successful:', data);
      return data;
      
    } catch (error) {
      console.error(`❌ Fetch attempt ${i + 1}/${retries} failed:`, error);
      
      if (i === retries - 1) {
        throw error;
      }
      
      // Wait before retry with exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
};

export default function StatistikPengunjung() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchWithRetry(3, 2000);
      setData(result);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(err.message || 'Gagal memuat data statistik. Silakan coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-16 bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          </div>
          <p className="text-gray-400">Memuat data statistik...</p>
        </div>
      </section>
    );
  }

  if (error || !data || data.error) {
    return (
      <section className="w-full py-16 bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8 max-w-md mx-auto">
            <ExclamationTriangleIcon className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Gagal Memuat Data</h3>
            <p className="text-gray-400 mb-6">
              {error || 'Terjadi kesalahan saat mengambil data statistik'}
            </p>
            <button 
              onClick={() => fetchData()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 mx-auto"
            >
              <ArrowPathIcon className="w-4 h-4" />
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
  const tanggalFormat = formatDateWithTimezone(sekarang, 'Asia/Jakarta').split(' ')[0];
  const updateTimeFormatted = formatDateWithTimezone(sekarang, 'Asia/Jakarta');
  
  const namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                     'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  return (
    <>
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
            {data.error && (
              <span className="ml-2 text-yellow-500">(Data tidak lengkap)</span>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
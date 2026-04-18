"use client";

import Navbar from "../Navbar";
import Footer from "../Footer";
import { useState } from "react";

export default function AplikasiBalai() {
  // Data aplikasi balai - bisa disimpan di database atau API di masa depan
  const [aplikasiBalai, setAplikasiBalai] = useState([
    {
      id: 1,
      nama: "TALAWANG",
      deskripsi: "Sistem Pengelolaan Perjalanan Dinas",
      kategori: "Keuangan",
      logo: "/Aplikasi/talawang.png",
      link: "https://talawang.bbpompky.id"
    },
    {
      id: 2,
      nama: "CLOUD STORAGE",
      deskripsi: "Platform Manajemen Dokumen Digital",
      kategori: "Layanan",
      logo: "/Aplikasi/cloud.png",
      link: "https://drive.bbpompky.id"
    },
    {
      id: 3,
      nama: "GROW",
      deskripsi: "Platform E-Learning",
      kategori: "Pelatihan",
      logo: "/Aplikasi/grow.png",
      link: "https://grow.bbpompky.id"
    },
    {
      id: 4,
      nama: "TAMBUN RAYA",
      deskripsi: "Pemetaan Kompetensi",
      kategori: "Kepegawaian",
      logo: "/Aplikasi/tr.png",
      link: "https://tambun-raya.bbpompky.id"
    },
    {
      id: 5,
      nama: "TABELA RAYA",
      deskripsi: "Sistem Pengelolaan Barang Milik Negara (BMN)",
      kategori: "BMN",
      logo: "/Aplikasi/tabelaraya.png",
      link: "https://tabela-raya.bbpompky.id"
    },
  ]);

  // State untuk kategori filter
  const [kategoriFilter, setKategoriFilter] = useState("Semua");
  
  // Mendapatkan daftar kategori unik
  const kategoriList = ["Semua", ...new Set(aplikasiBalai.map(app => app.kategori))];

  // Fungsi untuk memfilter aplikasi berdasarkan kategori
  const aplikasiTersaring = kategoriFilter === "Semua" 
    ? aplikasiBalai 
    : aplikasiBalai.filter(app => app.kategori === kategoriFilter);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
         {/* HERO SECTION */}
        <section className="bg-gradient-to-b from-[#0A1A2F] via-[#0F2A4A] to-[#14385F] py-20 text-white text-center">
          <h1 className="text-4xl font-bold">Aplikasi Balai</h1>
          <p className="text-lg mt-4 max-w-2xl mx-auto">
           Kumpulan aplikasi digital yang digunakan untuk mendukung operasional dan layanan Balai.
            Aplikasi-aplikasi ini dapat terus ditambahkan sesuai kebutuhan di masa depan.
          </p>
        </section>

        {/* CONTENT SECTION */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="bg-white shadow-lg rounded-3xl overflow-hidden p-8">
            
            {/* Filter Section */}
            <div className="mb-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Kumpulan Aplikasi
                  </h2>
                  <p className="text-gray-600">
                    Filter aplikasi berdasarkan kategori untuk menemukan yang Anda butuhkan
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {kategoriList.map((kategori) => (
                    <button
                      key={kategori}
                      onClick={() => setKategoriFilter(kategori)}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                        kategoriFilter === kategori 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                      }`}
                    >
                      {kategori}
                    </button>
                  ))}
                </div>
              </div>

              {/* Info Jumlah Aplikasi */}
              <div className="bg-blue-50 rounded-xl p-4 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700">
                      Menampilkan <span className="font-bold text-blue-600">{aplikasiTersaring.length}</span> dari total <span className="font-bold text-gray-800">{aplikasiBalai.length}</span> aplikasi
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Klik pada aplikasi untuk mengaksesnya langsung
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {kategoriFilter === "Semua" ? "Semua Kategori" : kategoriFilter}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid Aplikasi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {aplikasiTersaring.map((app) => (
                <a 
                  key={app.id}
                  href={app.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                    {/* Card Header */}
                    <div className="p-6 flex flex-col items-center text-center">
                      {/* Logo Container */}
                      <div className="mb-4 relative">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 flex items-center justify-center p-3 group-hover:border-blue-200 transition-colors">
                          {app.logo ? (
                            <div className="relative w-full h-full flex items-center justify-center">
                              <img 
                                src={app.logo} 
                                alt={app.nama}
                                className="max-w-full max-h-full object-contain"
                                onError={(e) => {
                                  console.error('Gagal memuat logo:', app.logo);
                                  e.target.style.display = 'none';
                                  // Tampilkan fallback
                                  const parent = e.target.parentNode;
                                  const fallbackSpan = document.createElement('span');
                                  fallbackSpan.className = 'text-blue-600 font-bold text-2xl';
                                  fallbackSpan.textContent = app.nama.charAt(0);
                                  parent.appendChild(fallbackSpan);
                                }}
                              />
                            </div>
                          ) : (
                            <span className="text-blue-600 font-bold text-2xl">
                              {app.nama.charAt(0)}
                            </span>
                          )}
                        </div>
                        {/* Category Badge */}
                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {app.kategori}
                        </div>
                      </div>

                      {/* App Name */}
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
                        {app.nama}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {app.deskripsi}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-auto p-4 bg-gradient-to-r from-blue-50/50 to-white border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 font-medium text-sm group-hover:underline">
                          Akses Aplikasi
                        </span>
                        <svg 
                          className="w-5 h-5 text-blue-500 transform group-hover:translate-x-1 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M14 5l7 7m0 0l-7 7m7-7H3" 
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Empty State */}
            {aplikasiTersaring.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 max-w-2xl mx-auto">
                  <div className="text-gray-400 mb-6">
                    <svg 
                      className="w-24 h-24 mx-auto" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1} 
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-3">
                    Tidak ada aplikasi
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Tidak ditemukan aplikasi dengan kategori "{kategoriFilter}".
                    Coba pilih kategori lain atau tambahkan aplikasi baru.
                  </p>
                  <button
                    onClick={() => setKategoriFilter("Semua")}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    Tampilkan Semua Aplikasi
                  </button>
                </div>
              </div>
            )}

            {/* Instructions Section */}
            
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
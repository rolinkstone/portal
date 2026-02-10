"use client";

import Navbar from "../Navbar";
import Footer from "../Footer";
import Image from "next/image";

export default function BetangAkziPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-700 py-20 text-white text-center">
          <div className="max-w-5xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Betang AKZI
            </h1>
            <p className="text-xl md:text-2xl font-semibold mb-4">
              Rumah Akselerasi Kompetensi Gizi
            </p>
            <p className="text-lg max-w-3xl mx-auto opacity-90">
              Inovasi BBPOM Palangka Raya untuk Meningkatkan Kompetensi Penjamah Makanan di SPPG
            </p>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
            {/* HERO IMAGE */}
            <div className="relative h-96 w-full">
              <Image
                src="/Inovasi/betang-akzi.jpg"
                alt="Betang AKZI - Pelatihan Penjamah Makanan SPPG"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h2 className="text-3xl font-bold mb-2">Betang AKZI</h2>
                  <p className="text-lg">Solusi Inovatif Keamanan Pangan SPPG</p>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              {/* INOVASI DESCRIPTION */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-emerald-900 mb-6">
                  Tentang Inovasi Betang AKZI
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Betang AKZI (Rumah Akselerasi Kompetensi Gizi)</strong> merupakan inovasi yang diinisiasi oleh 
                      <strong> BBPOM di Palangka Raya</strong> berkolaborasi dengan <strong>Badan Gizi Nasional (BGN)</strong> dan 
                      <strong> Pemerintah Daerah Kota Palangka Raya</strong>.
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed">
                      Inovasi ini hadir sebagai solusi untuk <strong>meningkatkan kompetensi penjamah makanan di SPPG</strong> 
                      dalam menerapkan praktik higienis mulai dari pemilihan bahan baku hingga penyajian makanan.
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed">
                      Betang AKZI juga menjadi <strong>langkah preventif dalam mencegah risiko Kejadian Luar Biasa (KLB) Keracunan Pangan</strong> 
                      dan mendukung keberhasilan <strong>Program Makan Bergizi Gratis (MBG)</strong>.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-2xl p-8 shadow-sm">
                    <h4 className="font-bold text-xl text-emerald-800 mb-6 pb-3 border-b border-emerald-200">
                      Kolaborasi Strategis
                    </h4>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 p-4 bg-white rounded-xl hover:bg-emerald-50 transition-colors">
                        <div className="flex-shrink-0 w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <span className="text-emerald-700 font-bold text-lg">BPOM</span>
                        </div>
                        <div>
                          <h5 className="font-bold text-lg text-gray-800 mb-1">BBPOM di Palangka Raya</h5>
                          <p className="text-gray-600">Balai Besar Pengawas Obat dan Makanan di Palangka Raya</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 bg-white rounded-xl hover:bg-emerald-50 transition-colors">
                        <div className="flex-shrink-0 w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <span className="text-emerald-700 font-bold text-lg">BGN</span>
                        </div>
                        <div>
                          <h5 className="font-bold text-lg text-gray-800 mb-1">BGN Regional Kalteng</h5>
                          <p className="text-gray-600">Badan Gizi Nasional Regional Kalimantan Tengah</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 bg-white rounded-xl hover:bg-emerald-50 transition-colors">
                        <div className="flex-shrink-0 w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <span className="text-emerald-700 font-bold text-lg">Dinkes</span>
                        </div>
                        <div>
                          <h5 className="font-bold text-lg text-gray-800 mb-1">Dinas Kesehatan Kota</h5>
                          <p className="text-gray-600">Dinas Kesehatan Kota Palangka Raya</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* VIDEO SECTION */}
              <div className="mb-12">
                <div className="bg-gray-900 rounded-2xl overflow-hidden">
                  <video
                    src="/Inovasi/Betang-Akzi.mp4"
                    controls
                    className="w-full h-auto max-h-[600px]"
                    poster="/Inovasi/betang-akzi.jpg"
                  >
                    Browser Anda tidak mendukung pemutaran video.
                  </video>
                </div>
              </div>

              {/* FITUR UTAMA dengan tombol e-learning */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-emerald-900 mb-6">
                  Fitur dan Manfaat Utama
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white border border-emerald-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-2xl">🎓</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Platform E-Learning</h4>
                    <p className="text-gray-600 mb-4">
                      Sarana pembelajaran mandiri yang berkelanjutan bagi penjamah makanan SPPG
                    </p>
                    <a 
                      href="https://grow.bbpompky.id" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      <span>🌐</span>
                      Akses Platform
                    </a>
                  </div>
                  
                  <div className="bg-white border border-emerald-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-2xl">👨‍🍳</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Pelatihan Higiene</h4>
                    <p className="text-gray-600">
                      Peningkatan kompetensi praktik higienis dari bahan baku hingga penyajian
                    </p>
                  </div>
                  
                  <div className="bg-white border border-emerald-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-2xl">🛡️</span>
                    </div>
                    <h4 className="font-bold text-lg mb-3">Pencegahan KLB</h4>
                    <p className="text-gray-600">
                      Langkah preventif mengurangi risiko Kejadian Luar Biasa keracunan pangan
                    </p>
                  </div>
                </div>
              </div>

              {/* TUJUAN DAN SASARAN */}
              <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Tujuan dan Sasaran
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-emerald-100">Tujuan Utama</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-emerald-300 mr-2">•</span>
                        Meningkatkan kompetensi penjamah makanan SPPG
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-300 mr-2">•</span>
                        Menjamin keamanan pangan Program MBG
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-300 mr-2">•</span>
                        Mencegah keracunan pangan di lingkungan sekolah
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-emerald-100">Sasaran Program</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-emerald-300 mr-2">•</span>
                        Penjamah makanan di Satuan Pemenuhan Pelayanan Gizi
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-300 mr-2">•</span>
                        SPPG Panarung, Pahandut 001 sebagai pilot project
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-300 mr-2">•</span>
                        Seluruh SPPG di wilayah Kalimantan Tengah
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* TOMBOL AKSES E-LEARNING BESAR */}
              <div className="mt-16 text-center">
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-2xl p-8 md:p-10">
                  <h3 className="text-2xl font-bold text-emerald-900 mb-4">
                    Akses Platform E-Learning Betang AKZI
                  </h3>
                  <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                    Bergabunglah dengan platform pembelajaran kami untuk meningkatkan kompetensi dalam keamanan pangan dan praktik higienis
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="https://grow.bbpompky.id" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <span className="text-2xl">🌐</span>
                      Akses Platform grow.bbpompky.id
                    </a>
                    <a 
                      href="https://grow.bbpompky.id/main/auth/inscription.php" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-bold py-3 px-8 rounded-xl text-lg transition-all hover:scale-105"
                    >
                      <span className="text-2xl">📝</span>
                      Daftar Akun Baru
                    </a>
                  </div>
                  <p className="text-gray-600 text-sm mt-6">
                    Platform tersedia untuk penjamah makanan SPPG dan tenaga kesehatan terkait
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
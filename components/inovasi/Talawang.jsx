"use client";

import Navbar from "../Navbar";
import Footer from "../Footer";
import Image from "next/image";
import { Shield, FileText, Clock, CheckCircle, TrendingUp, Lock, Zap, BarChart3, Scale } from "lucide-react";

const prinsipTalawang = [
  {
    huruf: "T",
    judul: "Tertib Administrasi",
    desc: "Prosedur dan dokumen lengkap sesuai ketentuan.",
    tagline: "Disiplin Prosedur",
    icon: FileText,
    color: "from-amber-500 to-yellow-400",
  },
  {
    huruf: "E",
    judul: "Efektif",
    desc: "Tercapainya tujuan dengan hasil maksimal.",
    tagline: "Tujuan Tercapai",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-400",
  },
  {
    huruf: "L",
    judul: "Legal",
    desc: "Sesuai peraturan perundang-undangan.",
    tagline: "Sesuai Hukum",
    icon: Scale,
    color: "from-blue-500 to-cyan-400",
  },
  {
    huruf: "A",
    judul: "Akurat",
    desc: "Data dan informasi tepat, benar, dan dapat dipertanggungjawabkan.",
    tagline: "Data Tepat",
    icon: CheckCircle,
    color: "from-purple-500 to-violet-400",
  },
  {
    huruf: "W",
    judul: "Wajar",
    desc: "Masuk akal dan sesuai kebutuhan riil.",
    tagline: "Masuk Akal",
    icon: Shield,
    color: "from-sky-500 to-indigo-400",
  },
  {
    huruf: "A",
    judul: "Akuntabel",
    desc: "Dapat dipertanggungjawabkan secara transparan.",
    tagline: "Transparan",
    icon: BarChart3,
    color: "from-rose-500 to-pink-400",
  },
  {
    huruf: "N",
    judul: "Nyata",
    desc: "Konkrit dan dapat dibuktikan kebenarannya.",
    tagline: "Konkrit",
    icon: Lock,
    color: "from-orange-500 to-amber-400",
  },
  {
    huruf: "G",
    judul: "Guna",
    desc: "Memberikan manfaat nyata bagi organisasi.",
    tagline: "Bermanfaat",
    icon: Zap,
    color: "from-green-500 to-lime-400",
  },
  {
    huruf: "E*",
    judul: "Efisien",
    desc: "Penggunaan sumber daya optimal dengan biaya minimal.",
    tagline: "Optimal",
    icon: Clock,
    color: "from-teal-500 to-cyan-400",
  },
];

export default function TalawangPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-b from-amber-900 via-amber-800 to-amber-700 py-24 text-white text-center overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-yellow-500/10 rounded-full blur-3xl"></div>
          </div>
          <div className="relative max-w-5xl mx-auto px-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 mb-8">
              <Shield className="w-10 h-10 text-amber-200" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Talawang
            </h1>
            <p className="text-xl md:text-2xl font-semibold mb-4 text-amber-100">
              Sistem Pengelolaan Perjalanan Dinas
            </p>
            <p className="text-lg max-w-3xl mx-auto opacity-90 text-amber-50">
              Sistem pengelolaan perjalanan dinas yang memastikan setiap perjalanan dinas
              di BBPOM Palangka Raya dilaksanakan sesuai dengan prinsip-prinsip pengelolaan
              keuangan negara yang baik.
            </p>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
            {/* HERO IMAGE */}
            <div className="relative h-96 w-full">
              <Image
                src="/Inovasi/talawang.jpg"
                alt="Talawang - Sistem Pengelolaan Perjalanan Dinas"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h2 className="text-3xl font-bold mb-2">Talawang</h2>
                  <p className="text-lg text-amber-200">Perisai Integritas Pengelolaan Perjalanan Dinas</p>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 space-y-16">
              {/* TENTANG INOVASI */}
              <div>
                <h3 className="text-2xl font-bold text-amber-900 mb-8">
                  Tentang Inovasi Talawang
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      <strong>Talawang</strong> merupakan sistem pengelolaan perjalanan dinas yang
                      dirancang untuk memastikan setiap perjalanan dinas di <strong>BBPOM Palangka
                      Raya</strong> dilaksanakan sesuai dengan prinsip-prinsip pengelolaan keuangan
                      negara yang baik.
                    </p>
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 rounded-r-xl p-6 italic text-gray-600">
                      &ldquo;Perjalanan dinas dilaksanakan secara tertib, sah secara hukum, hemat
                      anggaran, dapat dipertanggungjawabkan, dan memberikan manfaat nyata bagi
                      organisasi.&rdquo;
                    </div>
                  </div>

                  {/* MAKNA & FILOSOFI */}
                  <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-100 rounded-2xl p-8 shadow-sm">
                    <h4 className="font-bold text-xl text-amber-800 mb-6 pb-3 border-b border-amber-200">
                      Makna &amp; Filosofi
                    </h4>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 p-4 bg-white rounded-xl hover:bg-amber-50 transition-colors">
                        <div className="flex-shrink-0 w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center">
                          <Shield className="w-8 h-8 text-amber-700" />
                        </div>
                        <div>
                          <h5 className="font-bold text-lg text-gray-800 mb-1">Talawang</h5>
                          <p className="text-gray-600">
                            Dalam bahasa Dayak, Talawang berarti <strong>perisai</strong>. Sistem ini
                            berfungsi sebagai perisai untuk melindungi integritas dan akuntabilitas
                            pengelolaan perjalanan dinas.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 bg-white rounded-xl hover:bg-amber-50 transition-colors">
                        <div className="flex-shrink-0 w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center">
                          <Scale className="w-8 h-8 text-amber-700" />
                        </div>
                        <div>
                          <h5 className="font-bold text-lg text-gray-800 mb-1">Prinsip Dasar</h5>
                          <p className="text-gray-600">
                            Mengacu pada asas-asas pengelolaan keuangan negara: <strong>Tertib, Legal,
                            Efisien, Efektif, Akurat, Wajar, Akuntabel, Nyata, dan Bermanfaat</strong>.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 9 PRINSIP TALAWANG */}
              <div>
                <div className="text-center mb-10">
                  <h3 className="text-2xl font-bold text-amber-900 mb-2">9 Prinsip Talawang</h3>
                  <p className="text-gray-500">Akronim TALAWANG sebagai fondasi pengelolaan perjalanan dinas</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {prinsipTalawang.map((prinsip, index) => {
                    const Icon = prinsip.icon;
                    return (
                      <div
                        key={index}
                        className="group relative bg-white border border-amber-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                      >
                        {/* Background hover effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${prinsip.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                        {/* Huruf */}
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${prinsip.color} text-white font-bold text-xl mb-4 shadow-lg`}>
                          {prinsip.huruf}
                        </div>

                        <h4 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-amber-700 transition-colors">
                          {prinsip.judul}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                          {prinsip.desc}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 uppercase tracking-wider">
                          <Icon className="w-3.5 h-3.5" />
                          {prinsip.tagline}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* TUJUAN SISTEM */}
              <div>
                <h3 className="text-2xl font-bold text-amber-900 mb-8">
                  Tujuan Sistem Talawang
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    { icon: FileText, title: "Digitalisasi Proses", desc: "Digitalisasi proses pengajuan dan pelaporan perjalanan dinas" },
                    { icon: TrendingUp, title: "Efisiensi & Transparansi", desc: "Meningkatkan efisiensi dan transparansi pengelolaan anggaran" },
                    { icon: Scale, title: "Kepatuhan Regulasi", desc: "Memastikan kepatuhan terhadap regulasi keuangan negara" },
                    { icon: BarChart3, title: "Data Real-time", desc: "Menyediakan data real-time untuk pengambilan keputusan" },
                    { icon: Clock, title: "Efisiensi Proses", desc: "Mengurangi beban administrasi dan waktu proses" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex items-start gap-4 p-5 bg-amber-50/50 rounded-xl border border-amber-100 hover:bg-amber-50 transition-colors">
                        <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-amber-700" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* MANFAAT MENGGUNAKAN */}
              <div>
                <h3 className="text-2xl font-bold text-amber-900 mb-8">
                  Manfaat Menggunakan Talawang
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { icon: Lock, title: "Keamanan Data", desc: "Data terenkripsi dan terlindungi dengan sistem keamanan berlapis.", color: "from-blue-500 to-cyan-400" },
                    { icon: Zap, title: "Proses Cepat", desc: "Waktu proses pengajuan dan persetujuan lebih efisien.", color: "from-green-500 to-emerald-400" },
                    { icon: BarChart3, title: "Laporan Real-time", desc: "Monitoring dan pelaporan real-time untuk pengambilan keputusan.", color: "from-purple-500 to-violet-400" },
                    { icon: CheckCircle, title: "Kepatuhan Regulasi", desc: "Otomatisasi validasi sesuai peraturan yang berlaku.", color: "from-amber-500 to-orange-400" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="group bg-white border border-amber-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl text-center">
                  <p className="text-gray-700 text-lg font-medium">
                    Sistem Talawang dikembangkan untuk mendukung <strong>good governance</strong> dalam pengelolaan perjalanan dinas di BBPOM Palangka Raya.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="mt-10 text-center">
                  <a
                    href="https://talawang.bbpompky.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-500 text-white font-semibold rounded-2xl shadow-xl hover:shadow-amber-500/25 hover:scale-[1.02] transition-all duration-300 group"
                  >
                    <Shield className="w-5 h-5" />
                    <span>Akses Aplikasi Talawang</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <p className="text-gray-500 text-sm mt-3">talawang.bbpompky.id</p>
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

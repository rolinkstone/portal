"use client";

import Navbar from "../Navbar";
import Footer from "../Footer";
import Image from "next/image";
import {
  FileText,
  Accessibility,
  MessageSquare,
  Home,
  Users,
  CheckCircle,
  Eye,
  Ear,
  Hand,
  Baby,
  Heart,
  Clock,
  MapPin,
  Smartphone,
  Twitter,
  Phone,
  UserCheck,
  Calendar,
  Bus,
  Star,
  BookOpen,
  Shield,
} from "lucide-react";

const aspekData = [
  {
    no: "1",
    title: "Kebijakan dan Kepemimpinan",
    desc: "Komitmen Pimpinan & Keterlibatan dan Partisipasi",
    icon: FileText,
    items: ["Komitmen Pimpinan", "Keterlibatan dan Partisipasi"],
    color: "from-pink-500 to-rose-400",
  },
  {
    no: "2",
    title: "Aksesibilitas Fisik",
    desc: "Fasilitas fisik yang ramah bagi kelompok rentan",
    icon: Accessibility,
    items: [
      "Jalur pemandu",
      "Area parkir khusus",
      "Jalan landai",
      "Area prioritas",
      "Toilet disabilitas",
      "Loket prioritas",
      "Ruang laktasi",
      "Area ramah anak",
      "Alat bantu mobilitas",
      "Alat bantu komunikasi",
      "Ruang tenang",
    ],
    color: "from-sky-500 to-blue-400",
  },
  {
    no: "3",
    title: "Aksesibilitas Komunikasi dan Informasi",
    desc: "Kemudahan akses informasi bagi seluruh masyarakat",
    icon: MessageSquare,
    items: [
      "Informasi Pelayanan",
      "Laman web & Aplikasi Seluler",
      "Rambu dan Marka",
      "Media Sosial",
      "Layanan Pengaduan",
    ],
    color: "from-purple-500 to-violet-400",
  },
  {
    no: "4",
    title: "Akomodasi yang Layak",
    desc: "Fasilitas pendukung untuk kenyamanan kelompok rentan",
    icon: Home,
    items: [
      "Pendampingan",
      "Fleksibilitas Jadwal",
      "Layanan Jemput Bola",
      "Antrian Prioritas",
    ],
    color: "from-amber-500 to-orange-400",
  },
  {
    no: "5",
    title: "Sumber Daya Manusia",
    desc: "Pelatihan dan pengembangan kompetensi petugas",
    icon: Users,
    items: [
      "Pelatihan Sensitivitas",
      "Pelatihan Disabilitas",
      "Pelatihan Etika",
    ],
    color: "from-emerald-500 to-teal-400",
  },
];

export default function LauraIntanPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-b from-pink-900 via-pink-800 to-pink-700 py-24 text-white text-center overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-rose-500/10 rounded-full blur-3xl"></div>
          </div>
          <div className="relative max-w-5xl mx-auto px-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-pink-500/20 backdrop-blur-sm border border-pink-400/30 mb-8">
              <Heart className="w-10 h-10 text-pink-200" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Laura Intan
            </h1>
            <p className="text-xl md:text-2xl font-semibold mb-4 text-pink-100">
              <strong>L</strong>ayanan P<b>U</b>blik <strong>R</strong>amah d<b>A</b>n
              <strong> I</strong>nklusif <strong>B</strong>agi Kelompok <strong>Rentan</strong>
            </p>
            <p className="text-lg max-w-3xl mx-auto opacity-90 text-pink-50">
              Inovasi pelayanan publik yang berfokus pada pemenuhan kebutuhan kelompok rentan
            </p>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
            {/* HERO IMAGE */}
            <div className="relative h-96 w-full">
              <Image
                src="/Inovasi/laura_intan.png"
                alt="Laura Intan - Layanan Publik Ramah dan Inklusif"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h2 className="text-3xl font-bold mb-2">Laura Intan</h2>
                  <p className="text-lg text-pink-200">Layanan Publik Ramah dan Inklusif Bagi Kelompok Rentan</p>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 space-y-16">
              {/* TENTANG INOVASI */}
              <div>
                <h3 className="text-2xl font-bold text-pink-900 mb-8">
                  Tentang Inovasi Laura Intan
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      <strong>LAURA INTAN</strong> yang memiliki arti{" "}
                      <strong>Layanan Publik Ramah dan Inklusif Bagi Kelompok Rentan</strong>.
                      Inovasi ini berfokus pada pemenuhan <strong>5 (lima) aspek</strong> sesuai
                      dengan berpedoman pada 3 peraturan.
                    </p>

                    {/* Regulasi */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-gray-800">Berpedoman pada 3 Peraturan:</h4>
                      <div className="flex items-start gap-3 p-3 bg-pink-50 rounded-xl">
                        <FileText className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">
                          <strong>Permenpan RB Nomor 11 Tahun 2024</strong> — Penyelenggaraan
                          Pelayanan Publik Ramah Kelompok Rentan
                        </p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-pink-50 rounded-xl">
                        <FileText className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">
                          <strong>PEDOMAN MENPAN No.7 Tahun 2024</strong> — Pembinaan
                          Pelayanan Publik Ramah Kelompok Rentan
                        </p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-pink-50 rounded-xl">
                        <FileText className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">
                          <strong>Permenhukham Nomor 25 Tahun 2023</strong> — Pelayanan
                          Publik Berbasis Hak Asasi Manusia
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-white border border-pink-100 rounded-2xl p-8 shadow-sm">
                    <h4 className="font-bold text-xl text-pink-800 mb-6 pb-3 border-b border-pink-200">
                      Tujuan Inovasi
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Melalui pemenuhan kelima aspek tersebut, diharapkan BBPOM di Palangka Raya
                      dapat memberikan <strong>layanan yang ramah dan inklusif</strong> bagi
                      kelompok rentan.
                    </p>
                    <div className="flex items-center justify-center w-full p-6 bg-pink-100/50 rounded-xl">
                      <Heart className="w-12 h-12 text-pink-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* VIDEO YOUTUBE */}
              <div>
                <h3 className="text-2xl font-bold text-pink-900 mb-6">
                  Video Profil Laura Intan
                </h3>
                <div className="aspect-video rounded-2xl overflow-hidden shadow-xl bg-gray-900">
                  <iframe
                    src="https://www.youtube.com/embed/wto_AQNE22w"
                    title="Video Profil Laura Intan"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* 5 ASPEK */}
              <div>
                <div className="text-center mb-10">
                  <h3 className="text-2xl font-bold text-pink-900 mb-2">5 Aspek Pelayanan Inklusif</h3>
                  <p className="text-gray-500">
                    Pemenuhan layanan ramah kelompok rentan berdasarkan regulasi yang berlaku
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aspekData.map((aspek, index) => {
                    const Icon = aspek.icon;
                    return (
                      <div
                        key={index}
                        className="group bg-white border border-pink-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${aspek.color} flex items-center justify-center shadow-lg`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <div className={`inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br ${aspek.color} text-white text-xs font-bold mb-1`}>
                              {aspek.no}
                            </div>
                            <h4 className="font-bold text-gray-800 leading-tight">{aspek.title}</h4>
                          </div>
                        </div>

                        <p className="text-gray-500 text-sm mb-3">{aspek.desc}</p>

                        {/* Items */}
                        <ul className="space-y-1.5">
                          {aspek.items.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* UNDUH LAPORAN */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-pink-900 mb-6">
                  Unduh Laporan
                </h3>
                <a
                  href="/Inovasi/laporan_2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-500 text-white font-semibold rounded-2xl shadow-xl hover:shadow-pink-500/25 hover:scale-[1.02] transition-all duration-300 group"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Unduh Laporan PDF 2025</span>
                  <svg className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
                <p className="text-gray-500 text-sm mt-3">Laporan Pelaksanaan Tahun 2025</p>
              </div>

              {/* PENUTUP */}
              <div className="p-8 bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-2xl text-center">
                <Heart className="w-10 h-10 text-pink-500 mx-auto mb-4" />
                <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
                  Melalui pemenuhan kelima aspek tersebut, diharapkan{" "}
                  <strong>BBPOM di Palangka Raya</strong> dapat memberikan layanan yang
                  <strong> ramah dan inklusif</strong> bagi kelompok rentan, mewujudkan
                  pelayanan publik yang berkeadilan bagi seluruh masyarakat.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

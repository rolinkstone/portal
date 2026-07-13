"use client";

import Navbar from "../Navbar";
import Footer from "../Footer";
import Image from "next/image";
import { Shield, Music, TreePine, Users, Scale } from "lucide-react";

export default function BajakahOkePage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-b from-green-900 via-green-800 to-green-700 py-24 text-white text-center overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-green-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl"></div>
          </div>
          <div className="relative max-w-5xl mx-auto px-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-green-500/20 backdrop-blur-sm border border-green-400/30 mb-8">
              <TreePine className="w-10 h-10 text-green-200" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Bajakah OK
            </h1>
            <p className="text-xl md:text-2xl font-semibold mb-4 text-green-100">
              <strong>B</strong>ersama <strong>J</strong>aga I
              ntegritas <strong>K</strong>alimantan Tengah dengan
              Oversight (Pengawasan) <strong>K</strong>omprehensif
            </p>
            <p className="text-lg max-w-3xl mx-auto opacity-90 text-green-50">
              Inovasi budaya dalam membangun integritas dan pengawasan partisipatif
            </p>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
            {/* HERO - Logo Area */}
            <div className="relative h-96 w-full flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-50">
              <div className="text-center p-12">
                <Image
                  src="/Inovasi/aoc/logo-aoc.png"
                  alt="Bajakah OK - Logo"
                  width={200}
                  height={200}
                  className="mx-auto mb-6"
                  priority
                />
                <h2 className="text-3xl font-bold text-green-800 mb-2">Bajakah OK</h2>
                <p className="text-lg text-green-700">
                  Bersama Jaga Integritas Kalteng dengan Oversight Komprehensif
                </p>
              </div>
            </div>

            <div className="p-8 md:p-12 space-y-16">
              {/* TENTANG INOVASI */}
              <div>
                <h3 className="text-2xl font-bold text-green-900 mb-8">
                  Tentang Inovasi Bajakah OK
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      <strong>BAJAKAH OK</strong> merupakan singkatan dari{" "}
                      <strong>Bersama Jaga Integritas Kalimantan Tengah dengan
                      Oversight (Pengawasan) Komprehensif</strong>, mengutip kata{" "}
                      <strong>Bajakah</strong> yang dalam bahasa Dayak berarti{" "}
                      <strong>&ldquo;akar&rdquo;</strong>.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Inovasi ini dikemas dalam bentuk <strong>video berisi tarian dan lagu</strong>{" "}
                      menggunakan bahasa Dayak sarat makna, berisi himbauan kepada masyarakat
                      untuk membantu BBPOM di Palangka Raya melalui peran aktif melakukan praktik baik
                      (tidak memberi hadiah/suap/dengan harapan) bisa menjangkau wilayah yang luas
                      hingga pelosok Kalimantan Tengah yang berakarkan suku dan budaya Dayak yang
                      indah dan penuh filosofis.
                    </p>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-r-xl p-6 italic text-gray-600">
                      &ldquo;Melalui BAJAKAH OK, budaya kerja dan perilaku dalam menciptakan lingkungan
                      kerja yang anti korupsi, berkinerja tinggi dan melayani dengan prima menjadi akar
                      yang menjulur, bagian dari insan setiap ASN di BBPOM di Palangka Raya.&rdquo;
                    </div>
                  </div>

                  {/* MAKNA & FILOSOFI */}
                  <div className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl p-8 shadow-sm">
                    <h4 className="font-bold text-xl text-green-800 mb-6 pb-3 border-b border-green-200">
                      Makna &amp; Filosofi
                    </h4>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 p-4 bg-white rounded-xl hover:bg-green-50 transition-colors">
                        <div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                          <TreePine className="w-8 h-8 text-green-700" />
                        </div>
                        <div>
                          <h5 className="font-bold text-lg text-gray-800 mb-1">Bajakah (Akar)</h5>
                          <p className="text-gray-600">
                            Dalam bahasa Dayak, Bajakah berarti <strong>&ldquo;akar&rdquo;</strong>.
                            Akar yang kuat menjadi fondasi kokoh bagi budaya integritas dan anti korupsi.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 bg-white rounded-xl hover:bg-green-50 transition-colors">
                        <div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                          <Music className="w-8 h-8 text-green-700" />
                        </div>
                        <div>
                          <h5 className="font-bold text-lg text-gray-800 mb-1">Tarian &amp; Lagu Dayak</h5>
                          <p className="text-gray-600">
                            Dikemas dalam seni budaya Dayak yang sarat makna untuk menjangkau
                            masyarakat hingga pelosok Kalimantan Tengah.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 bg-white rounded-xl hover:bg-green-50 transition-colors">
                        <div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                          <Shield className="w-8 h-8 text-green-700" />
                        </div>
                        <div>
                          <h5 className="font-bold text-lg text-gray-800 mb-1">Anti Korupsi</h5>
                          <p className="text-gray-600">
                            Himbauan untuk tidak memberi hadiah/suap dan membangun praktik baik
                            dalam pengawasan partisipatif.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* VIDEO SECTION */}
              <div>
                <h3 className="text-2xl font-bold text-green-900 mb-6">
                  Video Bajakah OK
                </h3>
                <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
                  <video
                    src="/video/bajakah_ok.mov"
                    controls
                    className="w-full h-auto max-h-[600px]"
                    poster="/Inovasi/aoc/logo-aoc.png"
                  >
                    Browser Anda tidak mendukung pemutaran video.
                  </video>
                </div>
              </div>

              {/* TUJUAN */}
              <div>
                <h3 className="text-2xl font-bold text-green-900 mb-8">
                  Tujuan Bajakah OK
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { icon: Users, title: "Partisipasi Masyarakat", desc: "Mengajak masyarakat berperan aktif dalam pengawasan obat dan makanan" },
                    { icon: Shield, title: "Anti Korupsi", desc: "Membangun budaya kerja anti korupsi di lingkungan ASN BBPOM" },
                    { icon: Scale, title: "Zona Integritas", desc: "Memperkuat pembangunan Zona Integritas menuju WBBM" },
                    { icon: TreePine, title: "Akar Budaya", desc: "Menjadikan budaya Dayak sebagai akar nilai integritas dan pelayanan prima" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex items-start gap-4 p-5 bg-green-50/50 rounded-xl border border-green-100 hover:bg-green-50 transition-colors">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-green-700" />
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

              {/* PENUTUP */}
              <div className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl text-center">
                <p className="text-gray-700 text-lg leading-relaxed">
                  Melalui <strong>BAJAKAH OK</strong>, diharapkan budaya kerja dan perilaku dalam
                  menciptakan lingkungan kerja yang anti korupsi, berkinerja tinggi dan melayani
                  dengan prima menjadi akar yang menjulur, bagian dari insan setiap ASN di
                  BBPOM di Palangka Raya, memperkuat pembangunan Zona Integritas mewujudkan
                  predikat <strong>WBBM (Wilayah Birokrasi Bersih dan Melayani)</strong>.
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

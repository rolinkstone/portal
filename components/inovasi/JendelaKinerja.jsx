"use client";

import Navbar from "../Navbar";
import Footer from "../Footer";

export default function JendelaKinerjaPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-b from-[#0A1A2F] via-[#0F2A4A] to-[#14385F] py-20 text-white text-center">
          <h1 className="text-4xl font-bold">Jendela Kinerja</h1>
          <p className="text-lg mt-4 max-w-2xl mx-auto">
            JENDELA KINERJA PENGAWASAN SARANA PRODUKSI DAN DISTRIBUSI OBAT DAN
            MAKANAN DI WILAYAH KERJA BALAI BESAR POM DI PALANGKA RAYA
          </p>
        </section>

        {/* CONTENT */}
        <section className="py-16 px-4 max-w-6xl mx-auto">
          {/* Iframe 1 */}
          <div className="w-full mb-12">
            <div className="w-full h-[600px] md:h-[650px] rounded-xl overflow-hidden shadow-lg bg-white">
              <iframe
                className="w-full h-full"
                style={{ border: 0 }}
                src="https://lookerstudio.google.com/embed/reporting/1ad0bd5c-1018-4229-bd52-cc514150aa3b/page/fuOPF"
                sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Iframe 2 */}
          <div className="w-full">
            <div className="w-full h-[600px] md:h-[650px] rounded-xl overflow-hidden shadow-lg bg-white">
              <iframe
                className="w-full h-full"
                style={{ border: 0 }}
                src="https://lookerstudio.google.com/embed/reporting/9754bafd-840d-41b0-8202-9018bb0b0949/page/p_vdp9tkekud"
                sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

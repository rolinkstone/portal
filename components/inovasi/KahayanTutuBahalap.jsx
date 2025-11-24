"use client";

import Navbar from "../Navbar";
import Footer from "../Footer";
import Image from "next/image";

export default function KahayanTutuBahalap() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-b from-[#0A1A2F] via-[#0F2A4A] to-[#14385F] py-20 text-white text-center">
          <h1 className="text-4xl font-bold">Kahayan Tutu Bahalap</h1>
          <p className="text-lg mt-4 max-w-2xl mx-auto">
           Kahayan Tutu Bahalap (Kahayan Benar/Betul Hebat) : KemudAHAn dan KenYamanan PenerapAN Sistem MuTU LaboraTorium, Layanan PengUjian dan Pusat PemBelajaran PAHAri (saudara) BaLai BesAr POM di Palangka Raya 
          </p>
        </section>

        {/* CONTENT */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="bg-white shadow-md rounded-3xl overflow-hidden">
            <img
              src="/Inovasi/kahayan_tutu_bahalap.jpg"
              className="w-full h-150 object-cover"
              alt="Kahayan Tutu Bahalap"
            />

            <div className="p-8">
              
                       {/* VIDEO SECTION */}
            <div className="mt-6 w-full">
            <video
                src="/Inovasi/kahayan-tutu-bahalap.mp4"
                controls
                className="w-full rounded-xl shadow-lg"
            />
            </div>
             <br></br>

           <div className="flex gap-2 mt-4">
            <a
              href="https://sites.google.com/view/smmilpbbpompky/beranda"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            >
              BE SMMILE UP
            </a>

            <a
              href="https://kahayan.bbpompky.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
            >
              Kahayan
            </a>

            <a
              href="https://kahayan-inpro.bbpompky.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
            >
              Kahayan Inpro
            </a>
          </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

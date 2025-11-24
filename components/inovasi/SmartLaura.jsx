"use client";

import Navbar from "../Navbar";
import Footer from "../Footer";
import Image from "next/image";

export default function SmartLauraPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-b from-[#0A1A2F] via-[#0F2A4A] to-[#14385F] py-20 text-white text-center">
          <h1 className="text-4xl font-bold">Smart Laura</h1>
          <p className="text-lg mt-4 max-w-2xl mx-auto">
           Satu Usapan. Jangkauan Layanan BPOM Tanpa Batas
          </p>
        </section>

        {/* CONTENT */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="bg-white shadow-md rounded-3xl overflow-hidden">
            <img
              src="/Inovasi/laura.jpg"
              className="w-full h-80 object-cover"
              alt="Smart Laura"
            />

            <div className="p-8">
              

                        {/* VIDEO SECTION */}
            <div className="mt-6 w-full">
            <video
                src="/Inovasi/smart-laura.mp4"
                controls
                className="w-full rounded-xl shadow-lg"
            />
            </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
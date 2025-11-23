"use client";
import { useEffect, useState } from "react";

export default function Hero() {
  // Daftar gambar background slider
  const slides = [
   
    "Hero/bg4.jpeg",
  ];

  const [current, setCurrent] = useState(0);

  // Auto slide setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-screen min-h-screen flex items-center overflow-hidden">

      {/* Background Slider */}
     {slides.map((src, index) => (
        <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out
            ${index === current ? "opacity-100" : "opacity-0"}`}
            style={{
            backgroundImage: `url(${src})`,
            filter: "blur(6px)", // <-- tambahkan blur di sini
            transform: "scale(1.05)", // optional, supaya blur terlihat lebih natural
            }}
        ></div>
        ))}


      {/* Overlay gelap supaya teks terbaca */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Isi konten */}
      <div className="relative max-w-4xl mx-auto px-6 text-center pt-20 z-10">
        <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
          Portal BBPOM Palangka Raya
        </h1>
        <p className="text-gray-200 text-lg mb-8">
          Selamat Datang di Portal Informasi
        </p>

        <a
            href="https://palangkaraya.pom.go.id"
            target="_blank"   // buka di tab baru
            rel="noopener noreferrer" // untuk keamanan
            className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
            >
            Masuk Subsite Balai Besar POM di Palangka Raya
            </a>

      </div>
    </section>
  );
}

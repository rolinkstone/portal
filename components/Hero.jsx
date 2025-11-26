"use client";
import { useEffect, useState } from "react";

export default function Hero() {
  const slides = ["/Hero/bg4.jpeg"];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">

    {/* Background Mobile = pakai IMG agar tidak kepotong */}
    <div className="absolute inset-0 md:hidden">
      <img
        src={slides[current]}
        className="w-full h-full object-cover blur-md scale-110"
        alt="Background"
      />
    </div>

    {/* Background Desktop = tetap pakai background-image */}
    {slides.map((src, index) => (
      <div
        key={index}
        className={`absolute inset-0 hidden md:block bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out
        ${index === current ? "opacity-100" : "opacity-0"}`}
        style={{
          backgroundImage: `url(${src})`,
          filter: "blur(6px)",
          transform: "scale(1.05)",
        }}
      ></div>
    ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div
        className="
          relative z-10 w-full
          max-w-4xl mx-auto text-center
          px-6 
          pt-32 md:pt-40
        "
      >
        <h1
          className="
            font-bold text-white drop-shadow-lg
            text-3xl sm:text-4xl md:text-5xl
          "
        >
          Portal BBPOM Palangka Raya
        </h1>

        <p
          className="
            text-gray-200 
            mt-3 
            text-base sm:text-lg
          "
        >
          Selamat Datang di Portal Informasi
        </p>

        <a
          href="https://palangkaraya.pom.go.id"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition text-sm sm:text-base"
        >
          Masuk Subsite <br />
          Balai Besar POM di Palangka Raya
        </a>
      </div>
    </section>
  );
}

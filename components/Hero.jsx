"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero() {
  const slides = [
    {
      image: "/Hero/bg4.jpeg",
      title: "BBPOM di Palangka Raya",
      subtitle: "Selamat Datang di Portal Informasi (Batang Garing)",
    },
    {
      image: "/Hero/bg1.jpeg", // tambahkan gambar lain
      title: "Inovasi Pelayanan Publik",
       subtitle: "Transformasi Digital untuk Layanan yang Lebih Baik",
    },
    {
      image: "/Hero/bg1.jpeg", // tambahkan gambar lain
      title: "Inovasi Pelayanan Publik",
       subtitle: "Transformasi Digital untuk Layanan yang Lebih Baik",
    },
     
  ];

  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1500);
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 1500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [isTransitioning]);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Desktop & Mobile Background dengan efek parallax */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(0px) brightness(0.7)",
              transform: index === current ? "scale(1.05)" : "scale(1)",
              willChange: "transform, opacity",
            }}
          >
            {/* Gradient overlay profesional */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Content dengan animasi */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Animated Title */}
          <div className="overflow-hidden">
            <h1
              className="font-bold text-white drop-shadow-2xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
              style={{ 
                animation: "slideUp 0.8s ease-out 0.3s forwards",
                opacity: 0 
              }}
            >
              {slides[current].title}
            </h1>
          </div>

          {/* Animated Subtitle */}
          <div className="overflow-hidden mt-4">
            <p
              className="text-gray-200 text-lg sm:text-xl md:text-2xl lg:text-3xl font-light leading-relaxed"
              style={{ 
                animation: "slideUp 0.8s ease-out 0.5s forwards",
                opacity: 0 
              }}
            >
              {slides[current].subtitle}
            </p>
          </div>

          {/* CTA Button dengan efek glassmorphism */}
          <div
            className="mt-8 md:mt-12"
            style={{ 
              animation: "slideUp 0.8s ease-out 0.7s forwards",
              opacity: 0 
            }}
          >
            <a
              href="https://palangkaraya.pom.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-2xl hover:shadow-emerald-500/25 hover:scale-[1.02] transition-all duration-300 group border border-white/10 backdrop-blur-sm"
            >
              <span className="text-lg font-semibold">Kunjungi Subsite</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </a>
          </div>

          {/* Additional Info */}
          <div
            className="mt-6"
            style={{ 
              animation: "slideUp 0.8s ease-out 0.9s forwards",
              opacity: 0 
            }}
          >
            <p className="text-gray-300 text-sm md:text-base">
              Balai Besar Pengawas Obat dan Makanan di Palangka Raya
            </p>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current
                ? "w-8 bg-white"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 z-20 bg-gradient-to-r from-green-500 via-emerald-400 to-transparent">
        <div
          className="h-full bg-white transition-all duration-5000 ease-linear"
          style={{
            width: isTransitioning ? "100%" : "0%",
          }}
          key={current}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-green-500/10 to-transparent rounded-full blur-3xl"></div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
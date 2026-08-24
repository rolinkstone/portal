"use client";

import { useRef, useEffect, useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Lock,
  ExternalLink,
  Shield,
  Building2,
  FileText,
  Users,
  BarChart3,
  Archive
} from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { motion } from "framer-motion";

export default function Internal() {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { data: session } = useSession();

  const internalApps = [
    { 
      src: "Internal/betang-harmoni.png", 
      url: "https://sites.google.com/view/betangharmoni?usp=sharing", 
      title: "Betang Harmoni",
      desc: "Harmonisasi Layanan Terpadu",
      color: "from-blue-500 to-cyan-400",
      icon: Shield
    },
    { 
      src: "Internal/monelaku.png", 
      url: "https://sites.google.com/view/monelaku", 
      title: "Monelaku",
      desc: "Monitoring Pelaksanaan Kegiatan",
      color: "from-emerald-500 to-teal-400",
      icon: BarChart3
    },
    { 
      src: "Internal/smap_new.png", 
      url: "https://drive.google.com/drive/folders/1VDjkj5Xn7TxwfI251SJLzWVslhpSUBlL", 
      title: "SMAP",
      desc: "Sistem Manajemen Anti Penyuapan",
      color: "from-purple-500 to-violet-400",
      icon: Archive
    },
    { 
      src: "Internal/asik.png", 
      url: "https://sites.google.com/view/kearsipanbbpompky/pedoman", 
      title: "ASIK",
      desc: "Arsip Sistem Informasi Kearsipan",
      color: "from-amber-500 to-orange-400",
      icon: FileText
    },
    { 
      src: "Internal/d-peg.png", 
      url: "https://sites.google.com/view/d-peg", 
      title: "D-Peg",
      desc: "Dashboard Kepegawaian Digital",
      color: "from-rose-500 to-pink-400",
      icon: Users
    },
    
  ];

  const loopedApps = [...internalApps, ...internalApps];

  const handleLogoClick = (url, index) => {
    if (!session) {
      signIn("keycloak", {
        callbackUrl: window.location.href,
        redirect: false
      }).then(() => {
        // Buka aplikasi setelah login berhasil
        setTimeout(() => window.open(url, "_blank"), 1000);
      });
      return;
    }
    window.open(url, "_blank");
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!sliderRef.current || isPaused) return;

    const autoScroll = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({ left: 1, behavior: "auto" });
        
        // Reset ke awal jika sudah sampai akhir
        if (sliderRef.current.scrollLeft >= sliderRef.current.scrollWidth / 2) {
          sliderRef.current.scrollLeft = 0;
        }
      }
    }, 20);

    return () => clearInterval(autoScroll);
  }, [isPaused]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section 
      id="internal" 
      className="relative py-24 bg-gradient-to-b from-slate-50 to-gray-100 overflow-hidden"
      ref={containerRef}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-1 bg-gradient-to-r from-transparent via-blue-200/20 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-200/20 mb-6">
            <Lock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Internal Access</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Layanan <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">Internal</span>
          </h2>
          
        </motion.div>

        {/* Slider Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 group"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 group"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

          {/* Slider */}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto scrollbar-hide gap-8 py-8 px-2 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {loopedApps.map((app, idx) => {
              const Icon = app.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  whileHover="hover"
                  className="flex-none w-80"
                  onMouseEnter={() => setHoveredIndex(idx % internalApps.length)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div 
                    onClick={() => handleLogoClick(app.url, idx)}
                    className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
                  >
                    {/* Hover Effect Background */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${app.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                    {/* Logo Container */}
                    <div className="relative mb-6">
                      <div className={`absolute inset-0 bg-gradient-to-r ${app.color} rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                      <div className="relative bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                        <img
                          src={app.src}
                          className="h-20 w-full object-contain mx-auto transition-transform duration-500 group-hover:scale-110"
                          alt={app.title}
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Icon Badge */}
                      <div className={`absolute -top-3 -right-3 w-12 h-12 rounded-xl bg-gradient-to-r ${app.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                            {app.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {app.desc}
                          </p>
                        </div>
                        
                        {/* Access Indicator */}
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200">
                          {session ? (
                            <>
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span className="text-xs font-medium text-green-700">Akses Diberikan</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-3 h-3 text-amber-600" />
                              <span className="text-xs font-medium text-amber-700">Login Diperlukan</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                            {session ? 'Buka Aplikasi →' : 'Login untuk Akses →'}
                          </span>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${session ? 'bg-gradient-to-r from-blue-50 to-cyan-50 group-hover:from-blue-100 group-hover:to-cyan-100' : 'bg-gradient-to-r from-amber-50 to-orange-50 group-hover:from-amber-100 group-hover:to-orange-100'} transition-all`}>
                            {session ? (
                              <ExternalLink className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                            ) : (
                              <Lock className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${app.color} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 rounded-2xl`}></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Status Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${session ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`}></div>
                <span className="text-sm font-medium text-gray-700">
                  Status: {session ? `Login sebagai ${session.user?.name || session.user?.email}` : 'Belum login'}
                </span>
              </div>
              <div className="hidden md:block text-sm text-gray-500">
                {session ? '✅ Akses penuh ke semua aplikasi' : '⚠️ Login untuk mengakses aplikasi internal'}
              </div>
            </div>
            
            {!session && (
              <button
                onClick={() => signIn("keycloak")}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
              >
                Login Sekarang
              </button>
            )}
          </div>
        </motion.div>

        
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  SparklesIcon,
  RocketLaunchIcon,
  ArrowRightIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  MicrophoneIcon,
  StarIcon,
  PresentationChartLineIcon
} from "@heroicons/react/24/outline";

export default function Features() {
  const itemsOriginal = [
    { 
      title: "Smart Laura", 
      desc: "Satu Usapan. Jangkauan Layanan BPOM Tanpa Batas", 
      img: "Inovasi/laura.jpg", 
      avatar: "Inovasi/laura.jpg",
      category: "Digital Service",
      icon: RocketLaunchIcon,
      gradient: "from-blue-500 to-cyan-400",
      link: "/inovasi/smart-laura",
      external: false
    },
    { 
      title: "Laura Intan", 
      desc: "Layanan Publik Ramah dan Inklusif Bagi Kelompok Rentan", 
      img: "Inovasi/laura-intan.jpeg", 
      avatar: "Inovasi/laura-intan.jpeg",
      category: "Layanan Inklusif",
      icon: UserGroupIcon,
      gradient: "from-pink-500 to-rose-400",
      link: "/inovasi/laura-intan",
      external: false
    },
    { 
      title: "Bajakah OK", 
      desc: "Bersama Jaga Integritas Kalteng dengan Oversight Komprehensif", 
      img: "Inovasi/sigap.png", 
      avatar: "Inovasi/sigap.png",
      category: "Anti Korupsi",
      icon: GlobeAltIcon,
      gradient: "from-green-500 to-emerald-400",
      link: "/inovasi/bajakah-ok",
      external: false
    },
    { 
      title: "Talawang", 
      desc: "Sistem Pengelolaan Perjalanan Dinas yang Tertib dan Akuntabel — akses aplikasi di talawang.bbpompky.id", 
      img: "Inovasi/talawang.jpg", 
      avatar: "Inovasi/talawang.jpg",
      category: "Manajemen Perjalanan",
      icon: ShieldCheckIcon,
      gradient: "from-amber-500 to-orange-400",
      link: "/inovasi/talawang",
      external: false
    },
  ];

  const [items, setItems] = useState(itemsOriginal);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    setItems(prev => [...prev].sort(() => Math.random() - 0.5));
  }, []);

  const smallItems = [
    { 
      title: "Kahayan Tutu Bahalap", 
      desc: "Kemudahan Mutu Laboratorium", 
      icon: AcademicCapIcon,
      gradient: "from-emerald-500 to-teal-400",
      link: "/inovasi/kahayan-tutu-bahalap",
    },
    { 
      title: "Berdikari", 
      desc: "Saatnya UMKM Kalteng Naik Kelas", 
      icon: BuildingOfficeIcon,
      gradient: "from-purple-500 to-pink-400",
      link: "https://berdikari.bbpompky.id",
      external: true,
    },
    { 
      title: "Laura Jempol", 
      desc: "Layanan Uji Gratis Jemput Bola", 
      icon: RocketLaunchIcon,
      gradient: "from-rose-500 to-red-400",
      link: "/inovasi/laura-jempol",
    },
    { 
      title: "Betang Akzi", 
      desc: "Rumah Akselerasi Kompetensi Gizi", 
      icon: AcademicCapIcon,
      gradient: "from-indigo-500 to-blue-400",
      link: "/inovasi/betang-akzi",
    },
    { 
      title: "Jendela Kinerja", 
      desc: "Dashboard Kinerja BBPOM Palangka Raya", 
      icon: PresentationChartLineIcon,
      gradient: "from-purple-500 to-violet-400",
      link: "/inovasi/jendela-kinerja",
    },
    { 
      title: "Podcast OM", 
      desc: "Podcast Obat dan Makanan BBPOM", 
      icon: MicrophoneIcon,
      gradient: "from-amber-500 to-orange-400",
      link: "/inovasi/podcast-om",
    },
    { 
      title: "TRANMISI UMKM", 
      desc: "Transformasi Digital untuk UMKM", 
      icon: ChartBarIcon,
      gradient: "from-green-500 to-emerald-400",
      link: "/inovasi/tranmisi-umkm",
    },
    { 
      title: "Sikap Gaspol", 
      desc: "Sistem Informasi Keamanan Pangan", 
      icon: StarIcon,
      gradient: "from-rose-500 to-pink-400",
      link: "/inovasi/sikap-gaspol",
    },
    { 
      title: "Balanga", 
      desc: "Balai Latihan Gizi dan Keamanan Pangan", 
      icon: BuildingOfficeIcon,
      gradient: "from-teal-500 to-cyan-400",
      link: "/inovasi/balanga",
    },
    { 
      title: "Serasi Berakhlak", 
      desc: "Program Penguatan Nilai ASN", 
      icon: StarIcon,
      gradient: "from-blue-500 to-cyan-400",
      link: "/inovasi/serasi-berakhlak",
    },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const containerVariants = { 
    hidden: { opacity: 0 }, 
    show: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      } 
    } 
  };

  const itemVariants = { 
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    }, 
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.23, 1, 0.32, 1],
        type: "spring",
        stiffness: 100
      } 
    } 
  };

  // Fungsi untuk handle klik link
  const handleCardClick = (e, link, external) => {
    if (e.target.closest('a')) {
      return;
    }
    if (external && link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else if (link) {
      window.location.href = link;
    }
  };

  return (
    <section id="features" className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-60 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/4 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl"></div>
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
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 mb-6">
            <SparklesIcon className="w-8 h-8 text-cyan-300" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-blue-100">
              Inovasi Unggulan
            </span>
            <br />
            <span className="text-cyan-300">BBPOM di Palangka Raya</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Menghadirkan terobosan kreatif dalam pelayanan publik untuk masyarakat Kalimantan Tengah yang lebih baik
          </p>
        </motion.div>

        {/* Main Features Grid - 4 Inovasi Unggulan */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative cursor-pointer"
                onClick={(e) => handleCardClick(e, item.link, item.external)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-700/50 group-hover:border-cyan-500/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-cyan-900/20">
                  
                  {/* Image Container with Gradient Overlay */}
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
                    <img 
                      src={item.img} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      alt={item.title}
                    />
                    
                    {/* Category Badge */}
                    <div className={`absolute top-4 left-4 z-20 bg-gradient-to-r ${item.gradient} text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg`}>
                      {item.category}
                    </div>

                    {/* External Link Indicator */}
                    {item.external && (
                      <div className="absolute top-4 right-4 z-20 bg-slate-900/80 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center border border-slate-700/50">
                        <span className="text-xs font-bold text-cyan-300">↗</span>
                      </div>
                    )}
                  </div>

                  {/* Avatar & Content */}
                  <div className="relative p-6 pt-12">
                    {/* Avatar Container */}
                    <div className="absolute -top-8 left-6 z-20">
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-full blur-md opacity-50`}></div>
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-slate-900 shadow-xl">
                          <img 
                            src={item.avatar} 
                            className="w-full h-full object-cover"
                            alt={item.title}
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-slate-800 to-slate-900 p-1.5 rounded-full border border-slate-700">
                          <Icon className="w-4 h-4 text-cyan-300" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="inline-flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl text-cyan-300 font-medium hover:from-cyan-900/30 hover:to-blue-900/30 hover:text-white transition-all duration-300 group/btn border border-slate-700/50">
                      <span>
                        {item.external ? 'Kunjungi Website' : 'Lihat Detail'}
                      </span>
                      <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Hover Effect Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Inovasi Lainnya - Compact Carousel */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white">Inovasi Lainnya</h3>
              <p className="text-gray-400 text-sm mt-1">Inovasi TIM AOC BBPOM di Palangka Raya</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-gray-400 hover:text-white transition-all border border-slate-700/50"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-gray-400 hover:text-white transition-all border border-slate-700/50"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scroll-smooth py-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {smallItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="group min-w-[200px] flex-shrink-0 cursor-pointer"
                    onClick={() => {
                      if (item.external) {
                        window.open(item.link, '_blank', 'noopener,noreferrer');
                      } else {
                        window.location.href = item.link;
                      }
                    }}
                  >
                    <div className="h-full bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-900/10">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-400 ml-[52px] line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
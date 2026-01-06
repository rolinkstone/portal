"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  SparklesIcon, 
  LightBulbIcon, 
  RocketLaunchIcon, 
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  PresentationChartLineIcon,
  MicrophoneIcon,
  ChartBarIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  AcademicCapIcon
} from "@heroicons/react/24/outline";
import { 
  FireIcon as FireIconSolid,
  StarIcon as StarIconSolid
} from "@heroicons/react/24/solid";

export default function Features() {
  const itemsOriginal = [
    { 
      title: "Smart Laura", 
      desc: "Inovasi Tele-Public Service BBPOM", 
      img: "Inovasi/laura.jpg", 
      avatar: "Inovasi/laura.jpg",
      category: "Digital Service",
      icon: RocketLaunchIcon,
      gradient: "from-blue-500 to-cyan-400",
      link: "/inovasi/smart-laura",
      external: false
    },
    { 
      title: "Kahayan Tutu Bahalap", 
      desc: "Kemudahan Mutu Laboratorium", 
      img: "Inovasi/kahayan_tutu_bahalap.jpg", 
      avatar: "Inovasi/kahayan_tutu_bahalap.jpg",
      category: "Lab Innovation",
      icon: AcademicCapIcon,
      gradient: "from-emerald-500 to-teal-400",
      link: "/inovasi/kahayan-tutu-bahalap",
      external: false
    },
    { 
      title: "Berdikari", 
      desc: "Saatnya UMKM Kalteng Naik Kelas", 
      img: "Inovasi/berdikari.jpeg", 
      avatar: "Inovasi/berdikari.jpeg",
      category: "UMKM Empowerment",
      icon: BuildingOfficeIcon,
      gradient: "from-purple-500 to-pink-400",
      link: "https://berdikari.bbpompky.id",
      external: true
    },
    { 
      title: "Laura Intan", 
      desc: "Layanan Publik Ramah dan Inklusif bagi Kelompok Rentan.", 
      img: "Inovasi/laura-intan.jpeg", 
      avatar: "Inovasi/laura-intan.jpeg",
      category: "Inclusive Service",
      icon: UserGroupIcon,
      gradient: "from-amber-500 to-orange-400",
      link: "/inovasi/laura-intan",
      external: false
    },
    { 
      title: "Laura Jempol", 
      desc: "Layanan Uji Gratis Jemput Bola.", 
      img: "Inovasi/jempol.jpeg", 
      avatar: "Inovasi/jempol.jpeg",
      category: "Mobile Service",
      icon: RocketLaunchIcon,
      gradient: "from-rose-500 to-red-400",
      link: "/inovasi/laura-jempol",
      external: false
    },
    { 
      title: "Betang Akzi", 
      desc: "Rumah Akselerasi Kompetensi Gizi.", 
      img: "Inovasi/Betang-Akzi.jpg", 
      avatar: "Inovasi/Betang-Akzi.jpg",
      category: "Nutrition Hub",
      icon: AcademicCapIcon,
      gradient: "from-indigo-500 to-blue-400",
      link: "/inovasi/betang-akzi",
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
      title: "Aksi Bang Kahar", 
      desc: "Ajang Silaturahmi Melalui Bangun Nilai Keharmonisan", 
      img: "Inovasi/aoc/logo-aoc.png",
      icon: UserGroupIcon,
      gradient: "from-blue-500 to-cyan-400",
      link: "/inovasi/aksi-bang-kahar",
      external: false
    },
    { 
      title: "TRANMISI UMKM", 
      desc: "Transformasi Digital untuk UMKM", 
      img: "Inovasi/aoc/logo-aoc.png",
      icon: ChartBarIcon,
      gradient: "from-emerald-500 to-teal-400",
      link: "/inovasi/tranmisi-umkm",
      external: false
    },
    { 
      title: "JENDELA KINERJA", 
      desc: "Dashboard Kinerja BBPOM Palangka Raya", 
      img: "Inovasi/aoc/logo-aoc.png",
      icon: PresentationChartLineIcon,
      gradient: "from-purple-500 to-violet-400",
      link: "/inovasi/jendela-kinerja",
      external: false
    },
    { 
      title: "PODCAST OM", 
      desc: "Podcast Obat dan Makanan BBPOM Palangka Raya", 
      img: "Inovasi/aoc/logo-aoc.png",
      icon: MicrophoneIcon,
      gradient: "from-amber-500 to-orange-400",
      link: "/inovasi/podcast-om",
      external: false
    },
    { 
      title: "SIKAP GASPOL", 
      desc: "Sistem Informasi Keamanan Pangan dan Gizi", 
      img: "Inovasi/aoc/logo-aoc.png",
      icon: AcademicCapIcon,
      gradient: "from-rose-500 to-pink-400",
      link: "/inovasi/sikap-gaspol",
      external: false
    },
    { 
      title: "BALANGA", 
      desc: "Balai Latihan Gizi dan Keamanan Pangan", 
      img: "Inovasi/aoc/logo-aoc.png",
      icon: BuildingOfficeIcon,
      gradient: "from-indigo-500 to-blue-400",
      link: "/inovasi/balanga",
      external: false
    },
    { 
      title: "SERASI BERAKHLAK", 
      desc: "Program Penguatan Nilai ASN BerAKHLAK", 
      img: "Inovasi/aoc/logo-aoc.png",
      icon: StarIcon,
      gradient: "from-green-500 to-emerald-400",
      link: "/inovasi/serasi-berakhlak",
      external: false
    },
  ];

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

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Fungsi untuk handle klik link
  const handleCardClick = (e, link, external) => {
    // Jika card sudah memiliki link di dalamnya, biarkan default behavior
    if (e.target.closest('a')) {
      return;
    }
    
    // Jika external link, buka di tab baru
    if (external && link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else if (link) {
      // Jika internal link, navigasi
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

        {/* Main Features Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
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

        {/* Sub Innovations Carousel */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Inovasi Lainnya</h3>
              <p className="text-gray-400">Inovasi TIM AOC BBPOM di Palangka Raya</p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-3 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-gray-400 hover:text-white transition-all border border-slate-700/50 hover:border-cyan-500/30"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-3 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-gray-400 hover:text-white transition-all border border-slate-700/50 hover:border-cyan-500/30"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            <div 
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {smallItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="group relative min-w-[280px] flex-shrink-0 cursor-pointer"
                    onClick={() => {
                      if (item.external) {
                        window.open(item.link, '_blank', 'noopener,noreferrer');
                      } else {
                        window.location.href = item.link;
                      }
                    }}
                  >
                    <div className="h-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-900/10">
                      
                      {/* Icon Container */}
                      <div className="mb-6 relative">
                        <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-xl blur-md opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                        <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-400 mb-6">
                        {item.desc}
                      </p>

                      {/* View More */}
                      <div className="flex items-center text-cyan-300 text-sm font-medium">
                        <span>Pelajari lebih lanjut</span>
                        <ArrowRightIcon className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Gradient Overlays for Scroll */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none"></div>
          </div>
        </div>

      

        
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
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  SparklesIcon, 
  ChevronRightIcon,
  ArrowRightIcon,
  MicrophoneIcon,
  ChartBarIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  BeakerIcon,
  HeartIcon,
  DocumentTextIcon,
  ComputerDesktopIcon,
  FingerPrintIcon,
  ScaleIcon,
  TrophyIcon,
  ClipboardDocumentListIcon,
  TruckIcon,
  WifiIcon,
  CpuChipIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

export default function Features() {
  // Macro innovations data structure with placeholder images and links
  const macroInnovationsOriginal = [
    {
      id: "si-paling-berakhlak",
      title: "Si PALING BerAKHLAK",
      desc: "Program Penguatan Nilai ASN BerAKHLAK dan Harmonisasi Organisasi",
      icon: StarIconSolid,
      gradient: "from-blue-500 to-cyan-400",
      color: "blue",
      image: "Inovasi/sipalingberakhlak.jpeg",
      link: "/inovasi/si-paling-berakhlak",
      micros: [
        { title: "Aksi Bang Kahar", desc: "Ajang Silaturahmi Melalui Bangun Nilai Keharmonisan", link: "/inovasi/aksi-bang-kahar", icon: UserGroupIcon, image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=300&fit=crop" },
        { title: "Serasi BerAKHLAK", desc: "Program Penguatan Nilai ASN BerAKHLAK", link: "/inovasi/serasi-berakhlak", icon: HeartIcon, image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop" }
      ]
    },
    {
      id: "lewu-arsipom",
      title: "Lewu Arsipom",
      desc: "Inovasi Pengelolaan Arsip Digital dan Dokumentasi",
      icon: DocumentTextIcon,
      gradient: "from-emerald-500 to-teal-400",
      color: "emerald",
      image: "Inovasi/arsip.jpeg", 
      link: "/inovasi/lewu-arsipom",
      micros: [
        { title: "SI PAMELA", desc: "Sistem Informasi Pengelolaan Arsip Modern", link: "/inovasi/si-pamela", icon: ClipboardDocumentListIcon, image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop" }
      ]
    },
    {
      id: "tambun-raya",
      title: "Tambun Raya",
      desc: "Platform Kolaborasi dan Harmonisasi Pemangku Kepentingan",
      icon: UserGroupIcon,
      gradient: "from-purple-500 to-pink-400",
      color: "purple",
      image: "Inovasi/tambunraya.jpeg", 
      link: "/inovasi/tambun-raya",
      micros: [
        { title: "Hapakat BPOM", desc: "Forum Koordinasi dan Kolaborasi Stakeholder", link: "/inovasi/hapakat-bpom", icon: UserGroupIcon, image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop" },
        { title: "Bahadat", desc: "Program Penguatan Budaya Kerja", link: "/inovasi/bahadat", icon: HeartIcon, image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=300&fit=crop" },
        { title: "Diskora", desc: "Diskusi dan Kolaborasi Realisasi", link: "/inovasi/diskora", icon: MicrophoneIcon, image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop" },
        { title: "Seiraya", desc: "Sinergi dan Harmonisasi Program", link: "/inovasi/seiraya", icon: ScaleIcon, image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop" }
      ]
    },
    {
      id: "betang-harmoni",
      title: "Betang Harmoni",
      desc: "Ruang Kolaborasi Digital dan Inovasi Bersama",
      icon: ComputerDesktopIcon,
      gradient: "from-amber-500 to-orange-400",
      color: "amber",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop",
      link: "/inovasi/betang-harmoni",
      micros: [
        { title: "BE SMILE UP", desc: "Sistem Manajemen Inovasi dan Kolaborasi", link: "/inovasi/be-smile-up", icon: CpuChipIcon, image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=300&fit=crop" },
        { title: "GreenLab", desc: "Laboratorium Ramah Lingkungan", link: "/inovasi/greenlab", icon: BeakerIcon, image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop" },
        { title: "Let's Digital", desc: "Transformasi Digital Layanan Publik", link: "/inovasi/lets-digital", icon: WifiIcon, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop" }
      ]
    },
    {
      id: "jendela-kinerja",
      title: "Jendela Kinerja",
      desc: "Dashboard Monitoring dan Evaluasi Kinerja",
      icon: ChartBarIcon,
      gradient: "from-rose-500 to-red-400",
      color: "rose",
      image: "Inovasi/jendela_kinerja.jpeg", 
      link: "/inovasi/jendela-kinerja",
      micros: [
        { title: "Bintang Kinerja", desc: "Penilaian Kinerja ASN Berbasis Digital", link: "/inovasi/bintang-kinerja", icon: TrophyIcon, image: "Inovasi/images.png" },
        { title: "Hapakat Data Kinerja", desc: "Forum Integrasi Data Kinerja", link: "/inovasi/hapakat-data-kinerja", icon: ChartBarIcon, image: "Inovasi/images.png" },
        { title: "Mahaga Sei KalTeng", desc: "Monitoring Keamanan Pangan", link: "/inovasi/mahaga-sei-kalteng", icon: ScaleIcon, image: "Inovasi/images.png" },
        { title: "Huma Mutu Obat", desc: "Sistem Penjaminan Mutu Obat", link: "/inovasi/huma-mutu-obat", icon: BeakerIcon, image: "Inovasi/images.png" },
        { title: "P3K Paman", desc: "Pelayanan Publik dan Keamanan", link: "/inovasi/p3k-paman", icon: HeartIcon, image: "Inovasi/images.png" },
        { title: "Tabela Raya", desc: "Tabel Kinerja dan Akuntabilitas", link: "/inovasi/tabela-raya", icon: ClipboardDocumentListIcon, image: "Inovasi/images.png" }
      ]
    },
    {
      id: "talawang",
      title: "Talawang",
      desc: "Sistem Pengamanan dan Pengawasan Obat & Makanan",
      icon: ScaleIcon,
      gradient: "from-indigo-500 to-blue-400",
      color: "indigo",
      image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&h=500&fit=crop",
      link: "/inovasi/talawang",
      micros: []
    },
    {
      id: "bajakah-ok",
      title: "Bajakah OK",
      desc: "Inovasi Pengawasan Obat dan Makanan Berbasis Partisipasi",
      icon: FingerPrintIcon,
      gradient: "from-green-500 to-emerald-400",
      color: "green",
      image: "https://images.unsplash.com/photo-1581093458791-9f42c3da2c6a?w=800&h=500&fit=crop",
      link: "/inovasi/bajakah-ok",
      micros: [
        { title: "SIGAP", desc: "Sistem Informasi Gawat Publik", link: "/inovasi/sigap", icon: MicrophoneIcon, image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop" }
      ]
    },
    {
      id: "smart-laura",
      title: "Smart Laura",
      desc: "Inovasi Tele-Public Service BBPOM",
      icon: WifiIcon,
      gradient: "from-blue-500 to-cyan-400",
      color: "blue",
      image: "Inovasi/laura.jpg", 
      link: "/inovasi/smart-laura",
      micros: []
    },
    {
      id: "umkm-berdikari",
      title: "UMKM Berdikari",
      desc: "Saatnya UMKM Kalteng Naik Kelas",
      icon: BuildingOfficeIcon,
      gradient: "from-purple-500 to-pink-400",
      color: "purple",
      image: "Inovasi/berdikari.jpeg", 
      external: true,
      link: "https://berdikari.bbpompky.id",
      micros: [
        { title: "Klinik Laura", desc: "Pendampingan dan Konsultasi UMKM", link: "/inovasi/klinik-laura", icon: HeartIcon, image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop" }
      ]
    },
    {
      id: "laura-intan",
      title: "Laura Intan",
      desc: "Layanan Publik Ramah dan Inklusif bagi Kelompok Rentan",
      icon: UserGroupIcon,
      gradient: "from-amber-500 to-orange-400",
      color: "amber",
      image: "Inovasi/laura-intan.jpeg", 
      link: "/inovasi/laura-intan",
      micros: []
    },
    {
      id: "kahayan-inpro",
      title: "Kahayan Inpro",
      desc: "Inovasi Peningkatan Mutu Laboratorium",
      icon: BeakerIcon,
      gradient: "from-emerald-500 to-teal-400",
      color: "emerald",
      image: "Inovasi/inpro.jpeg", 
      link: "/inovasi/kahayan-inpro",
      micros: [
        { title: "Betang Akzi", desc: "Rumah Akselerasi Kompetensi Gizi", link: "/inovasi/betang-akzi", icon: AcademicCapIcon, image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop" }
      ]
    },
    {
      id: "laura-jempol",
      title: "Laura Jempol",
      desc: "Layanan Uji Gratis Jemput Bola",
      icon: TruckIcon,
      gradient: "from-rose-500 to-red-400",
      color: "rose",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
      link: "/inovasi/laura-jempol",
      micros: []
    }
  ];

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [macroInnovations, setMacroInnovations] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Randomize on every page load/refresh
    const shuffled = shuffleArray(macroInnovationsOriginal);
    setMacroInnovations(shuffled);
  }, []);

  const [expandedId, setExpandedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [hoveredMicroId, setHoveredMicroId] = useState(null);

  const toggleExpand = (id, e) => {
    e.stopPropagation();
    setExpandedId(expandedId === id ? null : id);
  };

  const handleMacroClick = (macro) => {
    if (macro.link) {
      if (macro.external) {
        window.open(macro.link, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = macro.link;
      }
    }
  };

  const handleMicroClick = (link, e) => {
    e.stopPropagation();
    if (link) {
      window.location.href = link;
    }
  };

  const getGradientClass = (gradient) => {
    return `bg-gradient-to-r ${gradient}`;
  };

  const containerVariants = { 
    hidden: { opacity: 0 }, 
    show: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.1
      } 
    } 
  };

  const itemVariants = { 
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.97
    }, 
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.23, 1, 0.32, 1]
      } 
    } 
  };

  const microVariants = {
    hidden: { opacity: 0, height: 0, y: -20 },
    show: { 
      opacity: 1, 
      height: "auto", 
      y: 0,
      transition: { 
        duration: 0.4,
        staggerChildren: 0.05,
        ease: [0.23, 1, 0.32, 1]
      }
    },
    exit: { 
      opacity: 0, 
      height: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const microItemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  };

  // Don't render until client-side to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <section id="features" className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-60 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/4 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
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

        {/* Macro Innovations Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          key={macroInnovations.map(m => m.id).join(',')}
        >
          {macroInnovations.map((macro) => {
            const Icon = macro.icon;
            const hasMicros = macro.micros && macro.micros.length > 0;
            const isExpanded = expandedId === macro.id;

            return (
              <motion.div
                key={macro.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredId(macro.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative"
                layout
              >
                <div 
                  className={`relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer
                    ${isExpanded ? 'border-cyan-500/50 shadow-2xl shadow-cyan-900/30' : 'border-slate-700/50 hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-900/20'}`}
                >
                  {/* Klik pada area card (selain tombol expand) akan menuju ke halaman macro */}
                  <div onClick={() => handleMacroClick(macro)} className="cursor-pointer">
                    {/* Image Header - LARGER SIZE */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={macro.image} 
                        alt={macro.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent"></div>
                      
                      {/* Icon overlay - LARGER */}
                      <div className="absolute bottom-3 left-3">
                        <div className={`w-12 h-12 rounded-xl ${getGradientClass(macro.gradient)} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* External Badge */}
                      {macro.external && (
                        <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-medium text-cyan-300 border border-cyan-500/30 z-10">
                          External ↗
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {macro.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {macro.desc}
                      </p>
                    </div>
                  </div>

                  {/* Tombol Expand/Collapse untuk Micro */}
                  {hasMicros && (
                    <div 
                      className="absolute bottom-4 right-4 z-20"
                      onClick={(e) => toggleExpand(macro.id, e)}
                    >
                      <div className={`w-8 h-8 rounded-full bg-slate-800/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-slate-700/80 cursor-pointer border border-slate-600/50 ${isExpanded ? 'rotate-180' : ''}`}>
                        <ChevronRightIcon className="w-5 h-5 text-cyan-300" />
                      </div>
                    </div>
                  )}

                  {/* Micro Innovations (Expandable) */}
                  <AnimatePresence>
                    {isExpanded && hasMicros && (
                      <motion.div
                        variants={microVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="px-5 pb-5"
                      >
                        <div className="pt-4 border-t border-slate-700/50">
                          <p className="text-xs text-cyan-300/70 mb-3 flex items-center gap-1">
                            <SparklesIcon className="w-3 h-3" />
                            Program Turunan
                          </p>
                          <div className="space-y-2">
                            {macro.micros.map((micro, idx) => {
                              const MicroIcon = micro.icon;
                              return (
                                <motion.div
                                  key={idx}
                                  variants={microItemVariants}
                                  onMouseEnter={() => setHoveredMicroId(`${macro.id}-${idx}`)}
                                  onMouseLeave={() => setHoveredMicroId(null)}
                                  className="micro-item"
                                  onClick={(e) => handleMicroClick(micro.link, e)}
                                >
                                  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 cursor-pointer group/micro">
                                    {/* Micro Image Thumbnail - LARGER */}
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                      <img 
                                        src={micro.image} 
                                        alt={micro.title}
                                        className="w-full h-full object-cover"
                                      />
                                      <div className={`absolute inset-0 ${getGradientClass(macro.gradient)} opacity-40`}></div>
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                      <h4 className="text-sm font-semibold text-white group-hover/micro:text-cyan-300 transition-colors">
                                        {micro.title}
                                      </h4>
                                      <p className="text-xs text-gray-400 truncate">
                                        {micro.desc}
                                      </p>
                                    </div>
                                    <ArrowRightIcon className="w-4 h-4 text-gray-500 group-hover/micro:text-cyan-300 transition-colors flex-shrink-0" />
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 ${getGradientClass(macro.gradient)} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer Note */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
            <SparklesIcon className="w-4 h-4 text-cyan-300" />
            <span className="text-sm text-gray-400">
              Klik pada card untuk melihat detail program utama • Klik tombol panah untuk melihat program turunan
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
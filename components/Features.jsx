"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Features() {
  const itemsOriginal = [
    { title: "Smart Laura", desc: "Inovasi Tele-Public Service BBPOM", img: "Inovasi/laura.jpg", avatar: "Inovasi/laura.jpg" },
    { title: "Kahayan Tutu Bahalap", desc: "Kemudahan Mutu Laboratorium", img: "Inovasi/kahayan_tutu_bahalap.jpg", avatar: "Inovasi/kahayan_tutu_bahalap.jpg" },
    { title: "Berdikari", desc: "Saatnya UMKM Kalteng Naik Kelas", img: "Inovasi/berdikari.jpeg", avatar: "Inovasi/berdikari.jpeg" },
    { title: "Laura Intan", desc: "Layanan Publik Ramah dan Inklusif bagi Kelompok Rentan.", img: "Inovasi/laura-intan.jpeg", avatar: "Inovasi/laura-intan.jpeg" },
    { title: "Laura Jempol", desc: "Layanan Uji Gratis Jemput Bola.", img: "Inovasi/jempol.jpeg", avatar: "Inovasi/jempol.jpeg" },
    { title: "Betang Akzi", desc: "Rumah Akselerasi Kompetensi Gizi.", img: "Inovasi/Betang-Akzi.jpg", avatar: "Inovasi/Betang-Akzi.jpg" },
  ];

  const [items, setItems] = useState(itemsOriginal);

  // Acak hanya di client
  useEffect(() => {
    setItems(prev => [...prev].sort(() => Math.random() - 0.5));
  }, []);

  const smallItems = [
  { 
    title: "Aksi Bang Kahar", 
    desc: "Ajang Silaturahmi Melalui Bangun Nilai Keharmonisan", 
    img: "Inovasi/aoc/logo-aoc.png",
    link: "/inovasi/aksi-bang-kahar"
  },
  { title: "TRANMISI UMKM", desc: "...", img: "Inovasi/aoc/logo-aoc.png" },
  
  { 
    title: "JENDELA KINERJA", 
    desc: "Dashboard Kinerja BBPOM Palangka Raya", 
    img: "Inovasi/aoc/logo-aoc.png",
    link: "/inovasi/jendela-kinerja"
  },

  { 
    title: "PODCAST OM", 
    desc: "Podcast Obat dan Makanan Balai Besar POM di Palangka Raya", 
    img: "Inovasi/aoc/logo-aoc.png",
    link: "/inovasi/podcast-om"
  },

  { title: "SIKAP GASPOL", desc: "...", img: "Inovasi/aoc/logo-aoc.png" },
  { title: "BALANGA", desc: "...", img: "Inovasi/aoc/logo-aoc.png" },
  { title: "SERASI BERAKHLAK", desc: "...", img: "Inovasi/aoc/logo-aoc.png" },
];


  const containerVariants = { hidden: {}, show: { transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

  const visibleCount = 4;
  const cardWidth = 220;
  const [startIndex, setStartIndex] = useState(0);

  const prev = () => setStartIndex(prev => Math.max(prev - 1, 0));
  const next = () => setStartIndex(prev => Math.min(prev + 1, smallItems.length - visibleCount));

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-[#0A1A2F] via-[#0F2A4A] to-[#14385F]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Inovasi Unggulan BBPOM di Palangka Raya</h2>

        {/* Card Utama */}
        <motion.div className="grid md:grid-cols-3 gap-10 mb-12" variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }}>
          {items.map((f, i) => (
            <motion.div key={i} className="bg-white shadow-lg rounded-3xl overflow-hidden border" variants={itemVariants}>
              <div className="w-full h-48 overflow-hidden">
                <img src={f.img} className="w-full h-full object-cover" />
              </div>
              <div className="relative p-6 pt-14">
                <div className="absolute -top-10 left-6 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <img src={f.avatar} className="w-full h-full object-cover" alt="avatar" />
                </div>
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="text-gray-600 mt-2 mb-4">{f.desc}</p>
                <a
                href={
                    f.title === "Berdikari"
                      ? "https://berdikari.bbpompky.id"
                      : f.title === "Smart Laura"
                      ? "inovasi/smart-laura"
                      : "#"
                      ? "inovasi/kahayan-tutu-bahalap"
                      : "#"
                  }
                  target={f.title === "Berdikari" ? "_blank" : "_self"}
                  className="text-green-600 font-medium flex items-center gap-2"
                >
                  Selengkapnya ➜
                </a>

              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Subcard dengan panah */}
        <div className="relative overflow-hidden">
          <button onClick={prev} disabled={startIndex === 0} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
            ◀
          </button>
          <button onClick={next} disabled={startIndex >= smallItems.length - visibleCount} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
            ▶
          </button>

          <motion.div 
            className="flex gap-4 transition-transform duration-500" 
            style={{ transform: `translateX(-${startIndex * cardWidth}px)` }}
          >
            {smallItems.map((f, i) => (
              <motion.a
                key={i}
                href={f.link ? f.link : "#"}
                className="min-w-[200px] border rounded-lg overflow-hidden p-4 flex flex-col items-center text-center bg-white shadow hover:shadow-md transition cursor-pointer"
                variants={itemVariants}
              >
                <img 
                  src={f.img} 
                  className="w-16 h-16 object-cover mb-2 rounded-full" 
                  alt={f.title} 
                />
                <h4 className="font-semibold">{f.title}</h4>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </motion.a>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

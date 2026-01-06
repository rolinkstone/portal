export default async function BeritaList() {
  const res = await fetch("https://bbpompky.id/spbe/scrape-berita.php", {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <section id="berita" className="py-16 md:py-20 bg-gradient-to-br from-[#0A1A2F] via-[#112A4E] to-[#1A3D6B] relative overflow-hidden">
      {/* Decorative Elements - lebih kecil */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/5 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-600/5 rounded-full blur-2xl"></div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header - lebih compact */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
            <span className="text-cyan-400 font-medium tracking-wide uppercase text-xs">
              Update Terbaru
            </span>
            <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">
            Berita Aktual 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 mt-1 text-2xl md:text-3xl">
              BBPOM di Palangka Raya
            </span>
          </h2>
          
          <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base">
            Informasi terkini seputar pengawasan obat dan makanan di Kalimantan Tengah
          </p>
        </div>

        {/* News Grid - lebih padat */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, i) => (
            <article
              key={i}
              className="group relative bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm 
                        border border-white/10 rounded-xl overflow-hidden 
                        hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-900/20
                        transition-all duration-300 hover:-translate-y-1"
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-blue-600/0 
                            opacity-0 group-hover:opacity-15 transition-opacity duration-300"></div>
              
              {/* Image Container */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2F]/80 via-transparent to-transparent"></div>
                
                {/* Date Badge */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-cyan-600 to-blue-700 
                              text-white text-xs font-medium px-2.5 py-1 rounded-full 
                              backdrop-blur-sm border border-white/20">
                  Terbaru
                </div>
              </div>

              {/* Content */}
              <div className="p-5 relative">
                {/* Title */}
                <h3 className="font-bold text-lg mb-2 text-white group-hover:text-cyan-100 transition-colors line-clamp-2">
                  {item.judul}
                </h3>

                {/* Summary */}
                <p className="text-gray-300/80 text-sm mb-3 line-clamp-2 leading-relaxed">
                  {item.ringkasan}
                </p>

                {/* Read More Link */}
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 font-medium 
                           text-sm group/link transition-colors"
                >
                  <span className="relative">
                    Baca Selengkapnya
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 
                                  group-hover/link:w-full transition-all duration-300"></span>
                  </span>
                  <svg className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>

              {/* Card Corner Accents - lebih kecil */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-cyan-500/30 rounded-tr-xl"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-blue-500/30 rounded-bl-xl"></div>
            </article>
          ))}
        </div>

        {/* View All Link - lebih kecil */}
        <div className="text-center mt-12">
          <a
            href="https://palangkaraya.pom.go.id/berita"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-600/20 to-blue-700/20 
                       border border-cyan-500/30 text-cyan-300 rounded-full font-medium text-sm
                       hover:from-cyan-600/30 hover:to-blue-700/30 hover:border-cyan-400/50
                       hover:shadow-lg hover:shadow-cyan-900/30 transition-all duration-300
                       group/btn"
          >
            <span>Lihat Semua Berita</span>
            <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
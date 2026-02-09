// components/zonaintegritas/manajemensdm/content/prestasi.jsx

// Data prestasi pegawai (kosong untuk sementara)
export const achievements = [];

// Fungsi untuk menghitung statistik prestasi
export const calculateAchievementStats = () => {
  return {
    totalPrestasi: 0,
    prestasiNasional: 0,
    prestasiInternasional: 0,
    prestasiRegional: 0,
    kategoriPenghargaan: 0,
    kategoriSertifikasi: 0,
    kategoriPublikasi: 0,
    kategoriKompetisi: 0
  };
};

// Data konten untuk halaman prestasi
export const prestasiContent = {
  icon: "🏆",
  title: "Prestasi Pegawai",
  description: "Rekap pencapaian dan penghargaan yang diraih oleh pegawai Balai Besar POM di Palangka Raya",
  
  heroStats: () => {
    const stats = calculateAchievementStats();
    return [
      {
        icon: "🏆",
        label: "Total Prestasi",
        value: stats.totalPrestasi.toString(),
        change: "Belum ada data",
        changeType: "info",
        color: "from-yellow-500 to-amber-500"
      },
      {
        icon: "🇮🇩",
        label: "Nasional",
        value: stats.prestasiNasional.toString(),
        change: "Penghargaan tingkat nasional",
        changeType: "info",
        color: "from-red-500 to-pink-500"
      },
      
      {
        icon: "📊",
        label: "Kategori",
        value: "0",
        change: "Berbagai jenis prestasi",
        changeType: "info",
        color: "from-green-500 to-emerald-500"
      }
    ];
  },

  sections: () => {
    const stats = calculateAchievementStats();
    
    return [
      {
        title: "Daftar Prestasi",
        icon: "📋",
        description: "Rekap pencapaian pegawai berdasarkan tahun dan kategori",
        type: "table",
        headers: ["NO", "NAMA PEGAWAI", "PRESTASI", "TINGKAT", "TAHUN", "KATEGORI"],
        items: achievements.length > 0 
          ? achievements.map((achievement, index) => [
              (index + 1).toString(),
              achievement.name,
              achievement.prestasi,
              achievement.tingkat,
              achievement.tahun,
              achievement.kategori
            ])
          : [["-", "Belum ada data prestasi", "-", "-", "-", "-"]]
      },
      {
        title: "Distribusi Prestasi",
        icon: "📊",
        description: "Prestasi berdasarkan kategori dan tingkat",
        type: "cards",
        items: [
          {
            icon: "🎖️",
            title: "Penghargaan",
            subtitle: "Penghargaan resmi",
            description: "Penghargaan dari instansi pemerintah dan organisasi",
            status: `${stats.kategoriPenghargaan} Prestasi`,
            statusClass: "bg-yellow-100 text-yellow-800",
            date: stats.totalPrestasi > 0 ? `${Math.round((stats.kategoriPenghargaan / stats.totalPrestasi) * 100)}%` : "0%"
          },
          {
            icon: "📜",
            title: "Sertifikasi",
            subtitle: "Sertifikasi kompetensi",
            description: "Sertifikasi keahlian dan kompetensi profesional",
            status: `${stats.kategoriSertifikasi} Prestasi`,
            statusClass: "bg-blue-100 text-blue-800",
            date: stats.totalPrestasi > 0 ? `${Math.round((stats.kategoriSertifikasi / stats.totalPrestasi) * 100)}%` : "0%"
          },
          {
            icon: "📚",
            title: "Publikasi",
            subtitle: "Publikasi ilmiah",
            description: "Publikasi jurnal, buku, dan karya ilmiah",
            status: `${stats.kategoriPublikasi} Prestasi`,
            statusClass: "bg-green-100 text-green-800",
            date: stats.totalPrestasi > 0 ? `${Math.round((stats.kategoriPublikasi / stats.totalPrestasi) * 100)}%` : "0%"
          },
          {
            icon: "🥇",
            title: "Kompetisi",
            subtitle: "Lomba dan kompetisi",
            description: "Prestasi dalam lomba dan kompetisi nasional/internasional",
            status: `${stats.kategoriKompetisi} Prestasi`,
            statusClass: "bg-purple-100 text-purple-800",
            date: stats.totalPrestasi > 0 ? `${Math.round((stats.kategoriKompetisi / stats.totalPrestasi) * 100)}%` : "0%"
          }
        ]
      },
      {
        title: "Catatan",
        icon: "📝",
        description: "Informasi tambahan mengenai prestasi pegawai",
        type: "list",
        items: [
          "Data prestasi akan diperbarui secara berkala",
          "Pegawai dapat melaporkan prestasi baru melalui sistem",
          "Prestasi yang tercatat akan digunakan untuk penilaian kinerja",
          "Setiap prestasi diverifikasi oleh tim SDM sebelum dicatat"
        ]
      }
    ];
  }
};
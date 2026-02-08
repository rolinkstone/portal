// di components/zonaintegritas/tatalaksana/manajemenmutu/content/profile.jsx
export const profileContent = {
  icon: "👥",
  title: "Manajemen SDM",
  description: "Data pegawai dan analisis sumber daya manusia Balai Besar POM di Palangka Raya",
  
  heroStats: [
    {
      icon: "👥",
      label: "Total Pegawai",
      value: "69",
      change: "+3 dari tahun lalu",
      changeType: "increase",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "♂️",
      label: "Laki-laki",
      value: "20",
      change: "29.0% dari total",
      changeType: "info",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "♀️",
      label: "Perempuan",
      value: "49",
      change: "71.0% dari total",
      changeType: "increase",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: "🎓",
      label: "Sertifikasi",
      value: "85%",
      change: "+5% dari target",
      changeType: "progress",
      color: "from-purple-500 to-violet-500"
    }
  ],

  sections: [
    {
      title: "Distribusi Jabatan",
      icon: "📊",
      description: "Distribusi pegawai berdasarkan jenis jabatan",
      type: "cards",
      items: [
        {
          icon: "👨‍⚕️",
          title: "Pengawas Farmasi",
          subtitle: "Jabatan Fungsional",
          description: "Pengawas Farmasi dan Makanan dengan berbagai jenjang",
          status: "45 Pegawai",
          statusClass: "bg-green-100 text-green-800",
          date: "65.2%"
        },
        {
          icon: "💼",
          title: "Pelaksana",
          subtitle: "Jabatan Pelaksana",
          description: "Pelaksana dan penata layanan operasional",
          status: "15 Pegawai",
          statusClass: "bg-blue-100 text-blue-800",
          date: "21.7%"
        },
        {
          icon: "🏛️",
          title: "Struktural",
          subtitle: "Jabatan Struktural",
          description: "Pejabat struktural pimpinan",
          status: "2 Pegawai",
          statusClass: "bg-purple-100 text-purple-800",
          date: "2.9%"
        },
        {
          icon: "💰",
          title: "Keuangan & Umum",
          subtitle: "Jabatan Pendukung",
          description: "Analis keuangan, arsiparis, dan administrasi",
          status: "7 Pegawai",
          statusClass: "bg-amber-100 text-amber-800",
          date: "10.1%"
        }
      ]
    },
    {
      title: "Pendidikan Terakhir",
      icon: "🎓",
      description: "Tingkat pendidikan pegawai",
      type: "grid",
      items: [
        {
          icon: "📚",
          title: "Sarjana (S1)",
          description: "Lulusan program sarjana",
          stats: [
            { label: "Jumlah", value: "58" },
            { label: "Persentase", value: "84.1%" },
            { label: "Tren", value: "+2%" }
          ]
        },
        {
          icon: "🎓",
          title: "Diploma (D3/D4)",
          description: "Lulusan program diploma",
          stats: [
            { label: "Jumlah", value: "6" },
            { label: "Persentase", value: "8.7%" },
            { label: "Tren", value: "Stabil" }
          ]
        },
        {
          icon: "👨‍🎓",
          title: "Magister (S2)",
          description: "Lulusan program magister",
          stats: [
            { label: "Jumlah", value: "5" },
            { label: "Persentase", value: "7.2%" },
            { label: "Tren", value: "+1" }
          ]
        }
      ]
    },
    {
      title: "Pangkat Pegawai",
      icon: "⭐",
      description: "Distribusi pangkat terakhir pegawai",
      type: "list",
      items: [
        "Pangkat IX: 15 Pegawai (21.7%)",
        "Pangkat IV: 19 Pegawai (27.5%)",
        "Pangkat III: 28 Pegawai (40.6%)",
        "Pangkat II: 4 Pegawai (5.8%)",
        "Pangkat Lainnya: 3 Pegawai (4.3%)"
      ]
    },
    {
      title: "Pelatihan & Pengembangan",
      icon: "📈",
      description: "Program pengembangan kompetensi SDM",
      type: "table",
      headers: ["Program", "Peserta", "Durasi", "Status", "Evaluasi"],
      items: [
        ["Sertifikasi Pengawas Farmasi", "15", "3 Bulan", "Selesai", "Sangat Baik"],
        ["Pelatihan ISO 9001:2015", "8", "5 Hari", "Selesai", "Baik"],
        ["Workshop Digitalisasi", "12", "2 Hari", "Berjalan", "-"],
        ["Pelatihan Leadership", "5", "1 Minggu", "Terjadwal", "-"],
        ["Sertifikasi Keamanan Pangan", "10", "1 Bulan", "Selesai", "Baik"]
      ]
    }
  ]
};
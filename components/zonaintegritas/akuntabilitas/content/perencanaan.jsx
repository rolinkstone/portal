// components/zonaintegritas/akuntabilitas/content/perencanaan.jsx

// Data kosong untuk perencanaan
export const perencanaanData = [];

// Konten untuk halaman perencanaan
export const perencanaanContent = {
  icon: "📋",
  title: "Perencanaan & Dokumen",
  description: "Dokumen perencanaan strategis, operasional, dan akuntabilitas Balai Besar POM dalam rangka Zona Integritas Menuju WBK/WBBM"
};

// Fungsi untuk menghitung statistik dokumen
export const calculateStats = () => {
  return {
    total: 0,
    byStatus: {},
    byYear: {},
    byCategory: {}
  };
};
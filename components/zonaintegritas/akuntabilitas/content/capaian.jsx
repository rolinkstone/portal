// components/zonaintegritas/akuntabilitas/content/capaian.jsx

// Data capaian kinerja
export const capaianData = [];

// Konten untuk halaman capaian
export const capaianContent = {
  icon: "📊",
  title: "Capaian Kinerja",
  description: "Laporan capaian indikator kinerja utama dan target yang telah dicapai"
};

// Fungsi untuk menghitung statistik capaian
export const calculateCapaianStats = () => {
  return {
    total: 0,
    byStatus: {},
    byYear: {},
    byCategory: {}
  };
};
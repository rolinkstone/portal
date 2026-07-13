// components/zonaintegritas/manajemensdm/content/menuItems.jsx

export const menuItems = [
  {
    id: "profile",
    title: "Profile Pegawai",
    icon: "👥",
    type: "internal"
  },
  {
    id: "prestasi",
    title: "Pegawai Berprestasi",
    icon: "🏆",
    type: "internal"
  },
  {
    id: "kompetensi",
    title: "Pengembangan Kompetensi",
    icon: "📚",
    external: true,
    loginRequired: true,
    url: "https://sites.google.com/view/d-peg"
  }
];
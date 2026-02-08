// di components/zonaintegritas/tatalaksana/manajemenmutu/content/sertifikasi.jsx
export const bisnisprosesContent = {
  icon: "🔄",
  title: "Bisnis Proses",
  description: "Status dan pencapaian sertifikasi mutu organisasi",
  
  heroStats: [
    {
      icon: "✅",
      label: "ISO 9001:2015",
      value: "Certified",
      change: "Valid until 2026",
      changeType: "info",
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: "⭐",
      label: "Audit Internal",
      value: "98%",
      change: "+5% dari target",
      changeType: "increase",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "📅",
      label: "Maintenance",
      value: "On Track",
      change: "Next audit: Q2 2025",
      changeType: "progress",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: "🎯",
      label: "NC Resolved",
      value: "100%",
      change: "All findings closed",
      changeType: "increase",
      color: "from-orange-500 to-amber-500"
    }
  ],

  sections: [
    {
      title: "Sertifikasi yang Dimiliki",
      icon: "🏆",
      description: "Daftar sertifikasi mutu yang telah diperoleh",
      type: "grid",
      items: [
        {
          icon: "📄",
          title: "ISO 9001:2015",
          description: "Sistem Manajemen Mutu",
          stats: [
            { label: "Status", value: "Aktif" },
            { label: "Cert Date", value: "2023" },
            { label: "Exp Date", value: "2026" }
          ]
        },
        {
          icon: "🛡️",
          title: "ISO 37001",
          description: "Anti-Bribery Management",
          stats: [
            { label: "Status", value: "Dalam Proses" },
            { label: "Target", value: "Q4 2024" },
            { label: "Progress", value: "85%" }
          ]
        },
        {
          icon: "💻",
          title: "ISO 27001",
          description: "Information Security",
          stats: [
            { label: "Status", value: "Planned" },
            { label: "Target", value: "2025" },
            { label: "Timeline", value: "On Track" }
          ]
        }
      ]
    },
    {
      title: "Audit Schedule",
      icon: "📅",
      description: "Jadwal audit dan assessment",
      type: "list",
      items: [
        "Q1 2024: Internal Audit - COMPLETED",
        "Q2 2024: Management Review - COMPLETED",
        "Q3 2024: Surveillance Audit - UPCOMING",
        "Q4 2024: ISO 37001 Certification - IN PROGRESS"
      ]
    }
  ]
};
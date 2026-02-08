export const surveyContent = {
  title: "Survey & Feedback Karyawan",
  description: "Hasil survey keterlibatan karyawan dan feedback untuk perbaikan berkelanjutan",
  
  heroStats: [
    {
      label: "Total Responden",
      value: "1,245",
      change: "98% response rate",
      changeType: "increase",
      color: "from-blue-500 to-cyan-500"
    },
    {
      label: "Employee Satisfaction",
      value: "4.2/5.0",
      change: "+0.3 dari 2023",
      changeType: "increase",
      color: "from-emerald-500 to-green-500"
    },
    {
      label: "Goal Alignment",
      value: "87%",
      change: "+8% YoY",
      changeType: "increase",
      color: "from-purple-500 to-violet-500"
    },
    {
      label: "Collaboration Index",
      value: "4.0/5.0",
      change: "+0.4 dari Q3",
      changeType: "increase",
      color: "from-orange-500 to-amber-500"
    }
  ],

  sections: [
    {
      title: "Key Findings",
      description: "Insight utama dari survey terbaru",
      type: "cards",
      items: [
        {
          title: "Work Environment",
          subtitle: "Kepuasan lingkungan kerja",
          description: "85% karyawan merasa lingkungan kerja mendukung produktivitas",
          score: "4.5/5.0",
          trend: "+0.2",
          status: "Excellent"
        },
        {
          title: "Growth Opportunities",
          subtitle: "Peluang pengembangan karir",
          description: "78% merasa ada peluang pengembangan yang jelas",
          score: "4.1/5.0",
          trend: "+0.3",
          status: "Good"
        },
        {
          title: "Communication Flow",
          subtitle: "Efektivitas komunikasi",
          description: "72% puas dengan alur komunikasi vertikal & horizontal",
          score: "3.8/5.0",
          trend: "-0.1",
          status: "Needs Improvement"
        }
      ]
    },
    {
      title: "Department-wise Analysis",
      description: "Analisis hasil per departemen",
      type: "table",
      headers: ["Departemen", "Satisfaction", "Engagement", "Recommendation Score", "Trend"],
      items: [
        {
          department: "IT & Digital",
          satisfaction: "4.5",
          engagement: "92%",
          recommendation: "9.2/10",
          trend: "+0.3"
        },
        {
          department: "HR & Development",
          satisfaction: "4.3",
          engagement: "89%",
          recommendation: "8.9/10",
          trend: "+0.2"
        },
        {
          department: "Finance",
          satisfaction: "4.1",
          engagement: "85%",
          recommendation: "8.5/10",
          trend: "+0.4"
        },
        {
          department: "Operations",
          satisfaction: "4.0",
          engagement: "82%",
          recommendation: "8.2/10",
          trend: "+0.1"
        },
        {
          department: "Marketing",
          satisfaction: "4.2",
          engagement: "88%",
          recommendation: "8.8/10",
          trend: "+0.3"
        }
      ]
    }
  ]
};
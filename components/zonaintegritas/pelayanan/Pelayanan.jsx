// components/zonaintegritas/Pelayanan.jsx
"use client";

import { useState } from "react";
import Navbar from "../../Navbar";
import { menuItems } from "./content/menuItems";
import StandarContent from "./components/StandarContent";
import BudayaContent from "./components/BudayaContent";
import JadwalContent from "./components/JadwalContent";
import KonsultasiContent from "./components/KonsultasiContent";
import PerpustakaanContent from "./components/PerpustakaanContent";
import MonevinovasiContent from "./components/MonevinovasiContent";

export default function Pelayanan() {
  const [activeMenu, setActiveMenu] = useState("standar");

  // Konten untuk setiap menu
  const standarContent = {
    icon: "⭐",
    title: "Standar Layanan",
    description: "Standar pelayanan publik di Balai Besar POM sesuai dengan peraturan yang berlaku"
  };

  const budayaContent = {
    icon: "🤝",
    title: "Budaya Pelayanan Publik",
    description: "Nilai-nilai dan perilaku dalam memberikan pelayanan publik yang berkualitas"
  };

  const jadwalContent = {
    icon: "📅",
    title: "Jadwal Pelayanan",
    description: "Jadwal dan informasi waktu pelayanan publik Balai Besar POM"
  };

  const konsultasiContent = {
    icon: "💬",
    title: "Konsultasi Publik",
    description: "Layanan konsultasi dan informasi kepada masyarakat mengenai obat dan makanan"
  };

  const perpustakaanContent = {
    icon: "📚",
    title: "Perpustakaan Online",
    description: "Koleksi digital dan referensi mengenai obat, makanan, dan regulasi Badan POM"
  };

  const monevinovasiContent = {
    icon: "📈",
    title: "Monev Inovasi Layanan Publik",
    description: "Monitoring dan evaluasi inovasi layanan publik untuk peningkatan kualitas pelayanan"
  };

  const contentMap = {
    standar: standarContent,
    budaya: budayaContent,
    jadwal: jadwalContent,
    konsultasi: konsultasiContent,
    perpustakaan: perpustakaanContent,
    monevinovasi: monevinovasiContent
  };

  const currentContent = contentMap[activeMenu] || standarContent;

  // Fungsi render konten
  const renderContent = () => {
    switch (activeMenu) {
      case "standar":
        return <StandarContent />;
      case "budaya":
        return <BudayaContent />;
      case "jadwal":
        return <JadwalContent />;
      case "konsultasi":
        return <KonsultasiContent />;
      case "perpustakaan":
        return <PerpustakaanContent />;
      case "monevinovasi":
        return <MonevinovasiContent />;
      default:
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">⭐</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Pelayanan Publik</h3>
            <p className="text-gray-600 mb-6">Halaman sedang dalam pengembangan</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-[#0f5c3c] via-[#1a7a52] to-[#259d6b] py-16 lg:py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 tracking-tight">
              Pelayanan Publik
            </h1>
            <p className="text-lg lg:text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              Sistem informasi standar pelayanan publik, prosedur, dan pengaduan masyarakat
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* SIDEBAR MENU */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden sticky top-8">
                <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">Menu Pelayanan</h2>
                  <p className="text-sm text-gray-600 mt-1">Pilih kategori untuk melihat</p>
                </div>
                <div className="p-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveMenu(item.id)}
                      className={`w-full text-left flex items-start p-4 rounded-xl mb-2 transition-all duration-200 ${
                        activeMenu === item.id
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md"
                          : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                      }`}
                    >
                      <span className="text-xl mr-3 mt-1">{item.icon}</span>
                      <div className="flex-1">
                        <span className="font-medium block">{item.title}</span>
                        <span className={`text-xs mt-1 block ${
                          activeMenu === item.id ? "text-emerald-100" : "text-gray-500"
                        }`}>
                          {item.description}
                        </span>
                      </div>
                      {activeMenu === item.id && (
                        <svg className="w-4 h-4 ml-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {/* CONTENT HEADER */}
                <div className="p-8 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">{currentContent.icon}</span>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                        {currentContent.title}
                      </h2>
                      <p className="text-gray-600 mt-2">{currentContent.description}</p>
                    </div>
                  </div>
                </div>

                {/* CONTENT BODY */}
                <div className="p-8">
                  {renderContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
// components/zonaintegritas/Pengawasan.jsx
"use client";

import { useState } from "react";
import Navbar from "../../Navbar";
import { menuItems } from "./content/menuItems";
import WbsContent from "./components/WbsContent";
import GratifikasiContent from "./components/GratifikasiContent";
import BenturankepentinganContent from "./components/BenturankepentinganContent";

export default function Pengawasan() {
  const [activeMenu, setActiveMenu] = useState("wbs");

  // Konten untuk setiap menu
  const wbsContent = {
    icon: "⚖️",
    title: "Whistleblowing System (WBS)",
    description: "Sistem pelaporan pelanggaran dan penyalahgunaan wewenang di lingkungan Badan POM"
  };

  const gratifikasiContent = {
    icon: "🎁",
    title: "Pelaporan Gratifikasi",
    description: "Sistem pelaporan dan pengendalian gratifikasi di lingkungan Badan POM"
  };

  const benturanContent = {
    icon: "⚖️",
    title: "Benturan Kepentingan",
    description: "Pencegahan dan pengelolaan benturan kepentingan di lingkungan Badan POM"
  };

  const contentMap = {
    wbs: wbsContent,
    gratifikasi: gratifikasiContent,
    benturankepentingan: benturanContent
  };

  const currentContent = contentMap[activeMenu] || wbsContent;

  // Fungsi render konten
  const renderContent = () => {
    switch (activeMenu) {
      case "wbs":
        return <WbsContent />;
      case "gratifikasi":
        return <GratifikasiContent />;
      case "benturankepentingan":
        return <BenturankepentinganContent />;
      default:
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">⚖️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Pengawasan & Integritas</h3>
            <p className="text-gray-600 mb-6">Halaman sedang dalam pengembangan</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-[#1a2e3a] via-[#2a4a5a] to-[#3a667a] py-16 lg:py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 tracking-tight">
              Pengawasan & Integritas
            </h1>
            <p className="text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Sistem pengawasan internal, pelaporan pelanggaran, dan penegakan integritas
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
                <div className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">Menu Pengawasan</h2>
                  <p className="text-sm text-gray-600 mt-1">Pilih kategori untuk melihat</p>
                </div>
                <div className="p-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveMenu(item.id)}
                      className={`w-full text-left flex items-start p-4 rounded-xl mb-2 transition-all duration-200 ${
                        activeMenu === item.id
                          ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md"
                          : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                      }`}
                    >
                      <span className="text-xl mr-3 mt-1">{item.icon}</span>
                      <div className="flex-1">
                        <span className="font-medium block">{item.title}</span>
                        <span className={`text-xs mt-1 block ${
                          activeMenu === item.id ? "text-teal-100" : "text-gray-500"
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
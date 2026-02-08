"use client";

import { useState } from "react";
import Navbar from "../../Navbar";
import { menuItems } from "./content/menuItems";
import { profileContent } from "./content/profile";
import ProfileContent from "./components/ProfileContent";

export default function ManajemenSdm() {
  const [activeMenu, setActiveMenu] = useState("profile");

  const contentMap = {
    profile: profileContent
  };

  const currentContent = contentMap[activeMenu];

  // Data pegawai lengkap
  const employees = [
    // ... semua data pegawai dari yang Anda berikan
    { id: 1, nip: "199205222025211023", name: "Fauzan Abdullah, S.Kom", gender: "L", pangkat: "IX", tipe: "Pelaksana", jabatan: "Penata Layanan Operasional" },
    { id: 2, nip: "198106112006042004", name: "Nurfadilla, S.Si, Apt", gender: "P", pangkat: "IV/a", tipe: "Fungsional", jabatan: "Pengawas Farmasi dan Makanan Ahli Madya" },
    { id: 3, nip: "198907032015022003", name: "Nila Murdiana, S.Si.", gender: "P", pangkat: "III/c", tipe: "Fungsional", jabatan: "Pengawas Farmasi dan Makanan Ahli Muda" },
    { id: 4, nip: "198507272009122001", name: "Wihelminae, S.Farm, Apt", gender: "P", pangkat: "IV/a", tipe: "Fungsional", jabatan: "Pengawas Farmasi dan Makanan Ahli Muda" },
    { id: 5, nip: "196905012000031001", name: "I Dewa Made Hari Buana, S.Si, Apt", gender: "L", pangkat: "IV/b", tipe: "Fungsional", jabatan: "Pengawas Farmasi dan Makanan Ahli Madya" },
    { id: 6, nip: "198005292006042004", name: "Etik Sumardani, S.Farm, Apt", gender: "P", pangkat: "IV/a", tipe: "Fungsional", jabatan: "Pengawas Farmasi dan Makanan Ahli Madya" },
    { id: 7, nip: "198309072008121001", name: "Bayu Indra Permana, S.Farm, Apt", gender: "L", pangkat: "IV/a", tipe: "Fungsional", jabatan: "Pengawas Farmasi dan Makanan Ahli Madya" },
    { id: 8, nip: "196901301992032001", name: "Tri Wahyuningsih, S.H.", gender: "P", pangkat: "III/d", tipe: "Fungsional", jabatan: "Pengawas Farmasi dan Makanan Penyelia" },
    { id: 9, nip: "197210171994032001", name: "Ita Mentayani, S.H.", gender: "P", pangkat: "III/d", tipe: "Fungsional", jabatan: "Pengawas Farmasi dan Makanan Ahli Muda" },
    { id: 10, nip: "199501282019032006", name: "Sri Nola Vebiola, S.Si", gender: "P", pangkat: "III/b", tipe: "Fungsional", jabatan: "Pengawas Farmasi dan Makanan Ahli Pertama" },
    // ... lanjutkan hingga id 69
  ];

  // Fungsi render konten dinamis
  const renderContent = () => {
    switch (activeMenu) {
      case "profile":
        return <ProfileContent content={currentContent} employees={employees} />;
      
      default:
        return (
          <div className="space-y-8">
            {/* Hero Stats Section */}
            {currentContent.heroStats && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentContent.heroStats.map((stat, index) => (
                  <div key={index} className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg`}>
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">{stat.icon}</span>
                      <div>
                        <p className="text-sm opacity-90">{stat.label}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm opacity-90">{stat.change}</span>
                      <span className="text-sm px-2 py-1 bg-white/20 rounded-full">
                        {stat.changeType === "increase" ? "📈" : 
                         stat.changeType === "progress" ? "⚡" : 
                         stat.changeType === "info" ? "ℹ️" : "💰"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Main Content Sections */}
            {currentContent.sections && currentContent.sections.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {section.title && (
                  <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                    <div className="flex items-center">
                      <span className="text-2xl mr-4">{section.icon}</span>
                      <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
                    </div>
                    {section.description && (
                      <p className="text-gray-600 mt-2 ml-10">{section.description}</p>
                    )}
                  </div>
                )}
                
                <div className="p-6">
                  {/* Render content based on type */}
                  {section.type === "grid" && section.items && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="bg-gradient-to-b from-white to-blue-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                          {item.icon && <div className="text-3xl mb-4">{item.icon}</div>}
                          {item.title && <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>}
                          {item.description && <p className="text-gray-600 mb-4">{item.description}</p>}
                          {item.stats && (
                            <div className="space-y-2">
                              {item.stats.map((stat, statIndex) => (
                                <div key={statIndex} className="flex justify-between items-center">
                                  <span className="text-sm text-gray-600">{stat.label}</span>
                                  <span className="font-medium">{stat.value}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {section.type === "list" && section.items && (
                    <div className="space-y-4">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start p-4 bg-gray-50 rounded-lg">
                          <span className="text-blue-500 mr-3 text-lg">•</span>
                          <div className="flex-1">
                            <p className="text-gray-800">{item}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.type === "table" && section.items && (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            {section.headers.map((header, headerIndex) => (
                              <th key={headerIndex} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {section.items.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-50">
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {section.type === "cards" && section.items && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-xl mr-4">
                              {item.icon}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-800">{item.title}</h4>
                              <p className="text-sm text-gray-600">{item.subtitle}</p>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${item.statusClass}`}>
                              {item.status}
                            </span>
                            <span className="text-sm text-gray-500">{item.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-[#0A1A2F] via-[#0F2A4A] to-[#1E429F] py-16 lg:py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 tracking-tight">
              Manajemen Sumber Daya Manusia
            </h1>
            <p className="text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Pengelolaan dan pengembangan kompetensi pegawai Balai Besar POM di Palangka Raya
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
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">Data SDM</h2>
                  <p className="text-sm text-gray-600 mt-1">Pilih menu untuk melihat</p>
                </div>
                <div className="p-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveMenu(item.id)}
                      className={`w-full text-left flex items-center p-4 rounded-xl mb-2 transition-all duration-200 ${
                        activeMenu === item.id
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      <span className="text-xl mr-3">{item.icon}</span>
                      <span className="font-medium">{item.title}</span>
                      {activeMenu === item.id && (
                        <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
"use client";

import { useState } from "react";
import Navbar from "../../Navbar";
import { menuItems } from "./content/menuItems";
import { profileContent } from "./content/profile";
import ProfileContent from "./components/ProfileContent";
import { prestasiContent } from "./content/prestasi";
import PrestasiContent from "./components/PrestasiContent";
import { useSession, signIn } from "next-auth/react";

export default function ManajemenSdm() {
  const { data: session, status } = useSession();
  const [activeMenu, setActiveMenu] = useState("profile");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [clickedMenuItem, setClickedMenuItem] = useState(null);

  const contentMap = {
    profile: profileContent,
    prestasi: prestasiContent
  };

  const currentContent = contentMap[activeMenu];

  // Handle menu click
  const handleMenuClick = (item) => {
    if (item.external && item.loginRequired && !session) {
      setClickedMenuItem(item);
      setShowLoginModal(true);
      return;
    }

    if (item.external && item.url) {
      // Buka link eksternal di tab baru
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      // Internal menu
      setActiveMenu(item.id);
    }
  };

  // Fungsi untuk login dan redirect
  const handleLoginAndRedirect = () => {
    setShowLoginModal(false);
    signIn("keycloak", {
      callbackUrl: clickedMenuItem?.url || "/manajemensdm"
    });
  };

  // Fungsi render konten dinamis
  const renderContent = () => {
    switch (activeMenu) {
      case "profile":
        return <ProfileContent content={currentContent} />;
      case "prestasi":
        return <PrestasiContent content={currentContent} />;
      default:
        return (
          <div className="space-y-8">
            {/* Hero Stats Section */}
            {currentContent?.heroStats && (
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
            {currentContent?.sections && currentContent.sections.map((section, index) => (
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
                      onClick={() => handleMenuClick(item)}
                      className={`w-full text-left flex items-start p-4 rounded-xl mb-2 transition-all duration-200 ${
                        activeMenu === item.id
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                          : item.external
                          ? "text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 hover:text-purple-600 border border-transparent hover:border-purple-200"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      <span className="text-xl mr-3 mt-1">{item.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium block">{item.title}</span>
                          {item.external && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ml-2 ${
                              activeMenu === item.id
                                ? "bg-blue-400 text-white"
                                : "bg-purple-100 text-purple-700"
                            }`}>
                              dpeg
                            </span>
                          )}
                        </div>
                        {item.external && item.loginRequired && !session && (
                          <span className="text-xs text-amber-600 mt-1 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                            </svg>
                            Login Required
                          </span>
                        )}
                      </div>
                      {item.external && (
                        <svg className="w-4 h-4 ml-2 mt-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Info External Link */}
                
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {/* CONTENT HEADER */}
                <div className="p-8 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">{currentContent?.icon || "📋"}</span>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                        {currentContent?.title || "Manajemen SDM"}
                      </h2>
                      <p className="text-gray-600 mt-2">
                        {currentContent?.description || "Pengelolaan data sumber daya manusia"}
                      </p>
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

      {/* Modal Login */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Akses Diperlukan</h3>
              <p className="text-gray-600 mb-4">
                Untuk mengakses <span className="font-semibold text-purple-600">{clickedMenuItem?.title}</span>,
                Anda perlu login terlebih dahulu menggunakan Single Sign-On (SSO) BBPOM di Palangka Raya.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-left">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-amber-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-amber-800">Akses Terbatas</p>
                    <p className="text-xs text-amber-700 mt-1">
                      Hanya pegawai BBPOM di Palangka Raya yang memiliki akun SSO yang dapat mengakses aplikasi ini.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <button
                onClick={handleLoginAndRedirect}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow font-medium tracking-tight flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login dengan SSO Badan POM
              </button>

              <button
                onClick={() => setShowLoginModal(false)}
                className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
              >
                Batalkan
              </button>

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Lupa password atau masalah login? Hubungi Helpdesk IT BBPOM di Palangka Raya
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
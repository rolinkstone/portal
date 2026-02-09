// components/zonaintegritas/akuntabilitas/akuntabilitas.jsx
"use client";

import { useState } from "react";
import Navbar from "../../Navbar";
import { menuItems } from "./content/menuItems";
import PerencanaanContent from "./components/PerencanaanContent";
import KinerjaContent from "./components/KinerjaContent";
import CapaianContent from "./components/CapaianContent";
import { useSession, signIn } from "next-auth/react";

export default function Akuntabilitas() {
  const { data: session, status } = useSession();
  const [activeMenu, setActiveMenu] = useState("perencanaan");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [clickedMenuItem, setClickedMenuItem] = useState(null);

  // Konten untuk setiap menu
  const perencanaanContent = {
    icon: "📋",
    title: "Perencanaan & Dokumen",
    description: "Dokumen perencanaan strategis, operasional, dan akuntabilitas Balai Besar POM"
  };

  const kinerjaContent = {
    icon: "🎯",
    title: "Indikator Kinerja",
    description: "Indikator Kinerja Utama (IKU) dan Indikator Kinerja Kunci (IKK) Balai Besar POM"
  };

  const capaianContent = {
    icon: "📊",
    title: "Capaian Kinerja",
    description: "Laporan capaian indikator kinerja utama dan target yang telah dicapai"
  };

  const contentMap = {
    perencanaan: perencanaanContent,
    kinerja: kinerjaContent,
    capaian: capaianContent
  };

  const currentContent = contentMap[activeMenu] || perencanaanContent;

  // Fungsi untuk handle klik menu
  const handleMenuClick = (item) => {
    if (item.external && item.loginRequired && !session) {
      setClickedMenuItem(item);
      setShowLoginModal(true);
      return;
    }
    
    if (item.external && item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      setActiveMenu(item.id);
    }
  };

  // Fungsi untuk login dan redirect
  const handleLoginAndRedirect = () => {
    setShowLoginModal(false);
    signIn("keycloak", {
      callbackUrl: clickedMenuItem?.url || "/akuntabilitas"
    });
  };

  // Fungsi render konten
  const renderContent = () => {
    switch (activeMenu) {
      case "perencanaan":
        return <PerencanaanContent />;
      case "kinerja":
        return <KinerjaContent />;
      case "capaian":
        return <CapaianContent />;
      default:
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">📋</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Perencanaan & Dokumen</h3>
            <p className="text-gray-600 mb-6">Halaman sedang dalam pengembangan</p>
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
              Akuntabilitas Kinerja
            </h1>
            <p className="text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Sistem akuntabilitas kinerja, perencanaan strategis, dan pelaporan Balai Besar POM
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
                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">Menu Akuntabilitas</h2>
                  <p className="text-sm text-gray-600 mt-1">Pilih kategori untuk melihat</p>
                </div>
                <div className="p-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleMenuClick(item)}
                      className={`w-full text-left flex items-start p-4 rounded-xl mb-2 transition-all duration-200 group ${
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
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              activeMenu === item.id 
                                ? "bg-blue-400 text-white" 
                                : "bg-purple-100 text-purple-700 group-hover:bg-purple-200"
                            }`}>
                              Monelaku
                            </span>
                          )}
                        </div>
                        <span className={`text-xs mt-1 block ${
                          activeMenu === item.id ? "text-blue-100" : 
                          item.external ? "text-purple-500 group-hover:text-purple-600" : 
                          "text-gray-500"
                        }`}>
                          {item.description}
                        </span>
                        {item.external && item.loginRequired && !session && (
                          <span className="text-xs text-amber-600 mt-1 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                            </svg>
                            Login Required
                          </span>
                        )}
                      </div>
                      {(activeMenu === item.id || item.external) && (
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
                Anda perlu login terlebih dahulu menggunakan Single Sign-On (SSO)  BBPOM di Palangka Raya.
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
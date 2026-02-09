"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    aplikasi: false,
    zonaIntegritas: false,
    tataLaksana: false,
    mobileAplikasi: false,
    mobileZonaIntegritas: false,
    mobileTataLaksana: false
  });
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  
  const dropdownRefs = {
    aplikasi: useRef(null),
    zonaIntegritas: useRef(null),
    tataLaksana: useRef(null),
    mobile: useRef(null)
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefs.aplikasi.current && 
        !dropdownRefs.aplikasi.current.contains(event.target) &&
        dropdownRefs.zonaIntegritas.current && 
        !dropdownRefs.zonaIntegritas.current.contains(event.target)
      ) {
        setDropdowns(prev => ({
          ...prev,
          aplikasi: false,
          zonaIntegritas: false,
          tataLaksana: false
        }));
      }
      
      if (
        mobileMenuOpen && 
        dropdownRefs.mobile.current && 
        !dropdownRefs.mobile.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  const toggleDropdown = (dropdown) => {
    setDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const closeAllDropdowns = () => {
    setDropdowns({
      aplikasi: false,
      zonaIntegritas: false,
      tataLaksana: false,
      mobileAplikasi: false,
      mobileZonaIntegritas: false,
      mobileTataLaksana: false
    });
    setMobileMenuOpen(false);
  };

  const aplikasiItems = [
    { name: "Aplikasi Pusat", href: "/aplikasi/pusat" },
    { name: "Aplikasi Balai", href: "/aplikasi/balai" }
  ];

  const zonaIntegritasItems = [
    { 
      name: "Manajemen Perubahan", 
      href: "/zonaintegritas/manajemenperubahan",
      icon: "🔄"
    },
    { 
      name: "Tata Laksana", 
      href: "/zonaintegritas/tatalaksana/manajemenmutu",
      icon: "⚖️",
      hasSubmenu: true,
      submenu: [
        { name: "Monev Sistem Manajemen Mutu", href: "/zona-integritas/tatalaksana/manajemenmutu", icon: "📋" },
        { name: "Monev Pemanfaatan TI", href: "/zona-integritas/tatalaksana/teknologiinformasi", icon: "💻" }
      ]
    },
    { 
      name: "Manajemen SDM", 
      href: "/zonaintegritas/manajemensdm",
      icon: "👥"
    },
    { 
      name: "Akuntabilitas & Kinerja", 
      href: "/zonaintegritas/akuntabilitas",
      icon: "📊"
    },
    { 
      name: "Pengawasan", 
      href: "/zonaintegritas/pengawasan",
      icon: "🔍"
    },
    { 
      name: "Pelayanan Publik", 
      href: "/zonaintegritas/pelayanan",
      icon: "🤝"
    }
  ];

  // Tata Laksana submenu items for desktop hover
  const tataLaksanaItems = [
    { 
      name: "Monev Sistem Manajemen Mutu", 
      href: "/zonaintegritas/tatalaksana/manajemenmutu",
      icon: "📋",
      description: "Monitoring & Evaluasi Sistem Manajemen Mutu"
    },
    { 
      name: "Monev Pemanfaatan TI", 
      href: "/zonaintegritas/tatalaksana/teknologiinformasi",
      icon: "💻",
      description: "Monitoring & Evaluasi Pemanfaatan Teknologi Informasi"
    }
  ];

  return (
    <nav 
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg py-1.5" 
          : "bg-white py-2.5 border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-4" onClick={closeAllDropdowns}>
              <img 
                src="/header/badan-pom.png" 
                alt="Badan POM" 
                className="h-9 sm:h-11 w-auto transition-transform duration-300 hover:scale-105"
              />
              <img 
                src="/header/logo_berakhlak.png" 
                alt="Berakhlak" 
                className="h-9 sm:h-11 w-auto hidden sm:block transition-transform duration-300 hover:scale-105"
              />
              <img 
                src="/header/logo_kata_bpom.png" 
                alt="Kata BPOM" 
                className="h-9 sm:h-11 w-auto transition-transform duration-300 hover:scale-105"
              />
              <img 
                src="/header/logo_zi.png" 
                alt="Zona Integritas" 
                className="h-9 sm:h-11 w-auto hidden md:block transition-transform duration-300 hover:scale-105"
              />
              <img 
                src="/header/tolak_gratifikasi.png" 
                alt="Tolak Gratifikasi" 
                className="h-9 sm:h-11 w-auto hidden lg:block transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Menu-menu yang tetap menggunakan anchor link */}
            <Link 
              href="/" 
              className="px-3.5 py-2 text-sm hover:text-blue-600 font-medium text-gray-700 rounded-lg hover:bg-blue-50 transition-all duration-200 tracking-tight"
            >
              Beranda
            </Link>
            
            {/* Zona Integritas Dropdown */}
            <div 
              className="relative"
              ref={dropdownRefs.zonaIntegritas}
              onMouseEnter={() => setDropdowns(prev => ({ ...prev, zonaIntegritas: true }))}
              onMouseLeave={() => setDropdowns(prev => ({ ...prev, zonaIntegritas: false, tataLaksana: false }))}
            >
             <button 
  className={`px-3.5 py-2 text-sm rounded-lg transition-all duration-200 font-medium flex items-center gap-1.5 tracking-tight ${
    dropdowns.zonaIntegritas || dropdowns.tataLaksana
      ? "text-blue-600 bg-blue-50" 
      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
  }`}
>
  <span className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white px-2 py-0.5 rounded-md font-semibold shadow-sm">
    Zona Integritas
  </span>
  <svg 
    className={`w-3.5 h-3.5 transition-transform duration-300 ${
      dropdowns.zonaIntegritas || dropdowns.tataLaksana ? "rotate-180 text-blue-600" : "text-gray-500"
    }`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
</button>
              
              <div 
                className={`absolute left-0 mt-1 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 transition-all duration-300 z-50 ${
                  dropdowns.zonaIntegritas || dropdowns.tataLaksana
                    ? "opacity-100 visible translate-y-0" 
                    : "opacity-0 invisible -translate-y-2"
                }`}
                onMouseEnter={() => setDropdowns(prev => ({ ...prev, zonaIntegritas: true }))}
                onMouseLeave={() => setDropdowns(prev => ({ ...prev, zonaIntegritas: false, tataLaksana: false }))}
              >
                <div className="px-3 pb-1.5 mb-1.5 border-b border-gray-100">
                  <h3 className="text-xs font-semibold text-gray-900">Zona Integritas</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">Wilayah Birokrasi Bersih & Melayani</p>
                </div>
                <div className="space-y-0.5">
                  {zonaIntegritasItems.map((item) => (
                    <div key={item.name} className="relative">
                      {item.hasSubmenu ? (
                        <div
                          className="group"
                          ref={dropdownRefs.tataLaksana}
                          onMouseEnter={() => setDropdowns(prev => ({ ...prev, tataLaksana: true, zonaIntegritas: true }))}
                          onMouseLeave={() => setDropdowns(prev => ({ ...prev, tataLaksana: false }))}
                        >
                          <div 
                            className="flex items-center px-3 py-2 text-xs text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                          >
                            <span className="text-base mr-2 group-hover:scale-110 transition-transform duration-200">
                              {item.icon}
                            </span>
                            <span className="font-medium flex-1 group-hover:translate-x-1 transition-transform duration-200">
                              {item.name}
                            </span>
                            <svg 
                              className="w-3 h-3 text-gray-400 transform rotate-90" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                          
                          {/* Tata Laksana Submenu */}
                          <div 
                            className={`absolute left-full top-0 ml-1 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 transition-all duration-300 z-50 ${
                              dropdowns.tataLaksana 
                                ? "opacity-100 visible" 
                                : "opacity-0 invisible"
                            }`}
                            onMouseEnter={() => setDropdowns(prev => ({ ...prev, tataLaksana: true }))}
                            onMouseLeave={() => setDropdowns(prev => ({ ...prev, tataLaksana: false }))}
                          >
                            <div className="space-y-0.5">
                              {tataLaksanaItems.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="flex items-center px-3 py-2 text-xs text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
                                  onClick={closeAllDropdowns}
                                >
                                  <span className="text-base mr-2 group-hover:scale-110 transition-transform duration-200">
                                    {subItem.icon}
                                  </span>
                                  <div className="flex-1">
                                    <span className="font-medium block group-hover:translate-x-1 transition-transform duration-200">
                                      {subItem.name}
                                    </span>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="flex items-center px-3 py-2 text-xs text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
                          onClick={closeAllDropdowns}
                          onMouseEnter={() => setDropdowns(prev => ({ ...prev, tataLaksana: false }))}
                        >
                          <span className="text-base mr-2 group-hover:scale-110 transition-transform duration-200">
                            {item.icon}
                          </span>
                          <span className="font-medium flex-1 group-hover:translate-x-1 transition-transform duration-200">
                            {item.name}
                          </span>
                          <svg 
                            className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <a 
              href="#features" 
              className="px-3.5 py-2 text-sm hover:text-blue-600 font-medium text-gray-700 rounded-lg hover:bg-blue-50 transition-all duration-200 tracking-tight"
            >
              Inovasi
            </a>
            
            <a 
              href="#internal" 
              className="px-3.5 py-2 text-sm hover:text-blue-600 font-medium text-gray-700 rounded-lg hover:bg-blue-50 transition-all duration-200 tracking-tight"
            >
              Layanan Internal
            </a>
            
            <a 
              href="#berita" 
              className="px-3.5 py-2 text-sm hover:text-blue-600 font-medium text-gray-700 rounded-lg hover:bg-blue-50 transition-all duration-200 tracking-tight"
            >
              Berita
            </a>

            {/* Aplikasi Dropdown */}
            <div 
              className="relative"
              ref={dropdownRefs.aplikasi}
              onMouseEnter={() => setDropdowns(prev => ({ ...prev, aplikasi: true }))}
              onMouseLeave={() => setDropdowns(prev => ({ ...prev, aplikasi: false }))}
            >
              <button 
                className={`px-3.5 py-2 text-sm rounded-lg transition-all duration-200 font-medium flex items-center gap-1.5 tracking-tight ${
                  dropdowns.aplikasi 
                    ? "text-blue-600 bg-blue-50" 
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                Aplikasi
                <svg 
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    dropdowns.aplikasi ? "rotate-180 text-blue-600" : "text-gray-500"
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 transition-all duration-300 z-50 ${
                  dropdowns.aplikasi 
                    ? "opacity-100 visible translate-y-0" 
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                {aplikasiItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-xs text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
                    onClick={closeAllDropdowns}
                  >
                    <span className="font-medium flex items-center group-hover:translate-x-1 transition-transform duration-200">
                      {item.name}
                      <svg 
                        className="w-3 h-3 ml-1.5 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Auth Button */}
            <div className="ml-3">
              {session ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-800 leading-tight">
                        {session.user?.name?.split(' ')[0] || "User"}
                      </span>
                      <span className="text-[11px] text-gray-500">
                        {session.user?.role || "Pengguna"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: "/api/auth/logout-kc" })}
                    className="px-3.5 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow font-medium tracking-tight"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => signIn("keycloak")}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow font-medium tracking-tight flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login SSO
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        ref={dropdownRefs.mobile}
        className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-200 transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-3 py-3 space-y-0.5">
          <Link
            href="/"
            className="block px-3 py-2.5 text-sm hover:text-blue-600 font-medium text-gray-700 rounded-lg hover:bg-blue-50 transition-all duration-200"
            onClick={closeAllDropdowns}
          >
            Beranda
          </Link>

          {/* Mobile Zona Integritas Dropdown */}
          <div className="px-3 py-1">
            <button
              onClick={() => toggleDropdown("mobileZonaIntegritas")}
              className={`flex items-center justify-between w-full px-3 py-2.5 text-sm hover:text-blue-600 font-medium text-gray-700 rounded-lg hover:bg-blue-50 transition-all duration-200 ${
                dropdowns.mobileZonaIntegritas ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              <span>Zona Integritas</span>
              <svg 
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  dropdowns.mobileZonaIntegritas ? "rotate-180" : ""
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`pl-3 mt-1 space-y-0.5 overflow-hidden transition-all duration-300 ${
              dropdowns.mobileZonaIntegritas ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}>
              {zonaIntegritasItems.map((item) => (
                <div key={item.name}>
                  {item.hasSubmenu ? (
                    <>
                      <button
                        onClick={() => toggleDropdown("mobileTataLaksana")}
                        className={`flex items-center justify-between w-full px-3 py-2 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 ${
                          dropdowns.mobileTataLaksana ? "bg-blue-50 text-blue-600" : ""
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="text-base mr-2">{item.icon}</span>
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <svg 
                          className={`w-3 h-3 transition-transform duration-300 ${
                            dropdowns.mobileTataLaksana ? "rotate-180" : ""
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className={`pl-6 mt-1 space-y-0.5 overflow-hidden transition-all duration-300 ${
                        dropdowns.mobileTataLaksana ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                      }`}>
                        {item.submenu?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="flex items-center px-3 py-1.5 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            onClick={closeAllDropdowns}
                          >
                            <span className="text-sm mr-2">{subItem.icon}</span>
                            <span>{subItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center px-3 py-2 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      onClick={closeAllDropdowns}
                    >
                      <span className="text-base mr-2">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          <a 
            href="#features" 
            className="block px-3 py-2.5 text-sm hover:text-blue-600 font-medium text-gray-700 rounded-lg hover:bg-blue-50 transition-all duration-200" 
            onClick={closeAllDropdowns}
          >
            Inovasi
          </a>
          
          <a 
            href="#internal" 
            className="block px-3 py-2.5 text-sm hover:text-blue-600 font-medium text-gray-700 rounded-lg hover:bg-blue-50 transition-all duration-200" 
            onClick={closeAllDropdowns}
          >
            Layanan Internal
          </a>
          
          <a 
            href="#berita" 
            className="block px-3 py-2.5 text-sm hover:text-blue-600 font-medium text-gray-700 rounded-lg hover:bg-blue-50 transition-all duration-200" 
            onClick={closeAllDropdowns}
          >
            Berita
          </a>

          {/* Mobile Aplikasi Dropdown */}
          <div className="px-3 py-1">
            <button
              onClick={() => toggleDropdown("mobileAplikasi")}
              className={`flex items-center justify-between w-full px-3 py-2.5 text-sm hover:text-blue-600 font-medium text-gray-700 rounded-lg hover:bg-blue-50 transition-all duration-200 ${
                dropdowns.mobileAplikasi ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              Aplikasi
              <svg 
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  dropdowns.mobileAplikasi ? "rotate-180" : ""
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`pl-3 mt-1 space-y-0.5 overflow-hidden transition-all duration-300 ${
              dropdowns.mobileAplikasi ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}>
              {aplikasiItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  onClick={closeAllDropdowns}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Auth Button */}
          <div className="px-3 py-3 border-t border-gray-100">
            {session ? (
              <div className="space-y-3">
                <div className="flex items-center px-3 py-2.5 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-800">
                      {session.user?.name || "User"}
                    </p>
                    <p className="text-[11px] text-gray-600 mt-0.5">
                      {session.user?.email || ""}
                    </p>
                    <p className="text-[11px] text-blue-600 font-medium mt-1">
                      {session.user?.role || "Pengguna"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/api/auth/logout-kc" })}
                  className="w-full px-3 py-2.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("keycloak")}
                className="w-full px-3 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login SSO
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
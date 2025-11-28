"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // desktop dropdown
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false); // mobile dropdown
  const { data: session } = useSession();

  // Timer untuk delay close dropdown desktop
  let timer; // hapus : NodeJS.Timeout

  const handleMouseEnter = () => {
    clearTimeout(timer);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timer = setTimeout(() => {
      setDropdownOpen(false);
    }, 200); // delay 200ms supaya tidak langsung hilang
  };

  return (
    <nav className="w-full fixed top-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <div className="flex items-center space-x-2">
          <img src="/header/badan-pom.png" className="w-15 h-12" />
          <img src="/header/logo_berakhlak.png" className="w-20 h-12" />
          <img src="/header/logo_kata_bpom.png" className="w-15 h-12" />
          <img src="/header/logo_zi.png" className="w-15 h-12" />
          <img src="/header/tolak_gratifikasi.png" className="w-20 h-12" />
        </div>

        {/* HAMBURGER MOBILE */}
        <button className="md:hidden block text-3xl" onClick={() => setOpen(!open)}>
          ☰
        </button>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex space-x-6 items-center">

          <Link href="/" className="hover:text-blue-600 font-medium">Beranda</Link>
          <a href="#features" className="hover:text-blue-600 font-medium">Inovasi</a>       
          <a href="#internal" className="hover:text-blue-600 font-medium">Layanan Internal</a>
          <a href="#berita" className="hover:text-blue-600 font-medium">Berita</a>
          {/* Dropdown Aplikasi */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="hover:text-blue-600 font-medium flex items-center">
              Aplikasi ▼
            </button>
            <div
              className={`absolute top-full left-0 mt-2 bg-white shadow-lg rounded border w-48 z-50
                transform transition-all duration-300 origin-top
                ${dropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
            >
              <Link href="#aplikasi-pusat" className="block px-4 py-2 hover:bg-gray-100">
                Aplikasi Pusat
              </Link>
              <Link href="#aplikasi-balai" className="block px-4 py-2 hover:bg-gray-100">
                Aplikasi Balai
              </Link>
            </div>
          </div>

          {/* LOGIN / LOGOUT */}
          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: "/api/auth/logout-kc" })}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => signIn("keycloak")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login SSO
            </button>
          )}
        </div>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <a href="/" className="block px-6 py-3 hover:bg-gray-100">Beranda</a>
          <a href="#features" className="block px-6 py-3 hover:bg-gray-100">Inovasi</a>
          <a href="#internal" className="block px-6 py-3 hover:bg-gray-100">Layanan Internal</a>
          <a href="#berita" className="block px-6 py-3 hover:bg-gray-100">Berita</a>
           {/* Mobile Dropdown Aplikasi */}
          <div className="px-6 py-3">
            <button
              onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
              className="w-full text-left flex justify-between items-center"
            >
              Aplikasi ▼
            </button>
            <div
              className={`mt-2 pl-4 transition-all duration-300 overflow-hidden
                ${mobileDropdownOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
            >
              <a href="#aplikasi-pusat" className="block px-4 py-2 hover:bg-gray-100">
                Aplikasi Pusat
              </a>
              <a href="#aplikasi-balai" className="block px-4 py-2 hover:bg-gray-100">
                Aplikasi Balai
              </a>
            </div>
          </div>


          {/* MOBILE LOGIN / LOGOUT */}
          <div className="px-6 py-3">
            {session ? (
              <button
                onClick={() => signOut({ callbackUrl: "/api/auth/logout-kc" })}
                className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => signIn("keycloak")}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

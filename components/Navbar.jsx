"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* ==== LOGO ==== */}
        <div className="flex items-center space-x-2">
          <img src="/header/badan-pom.png" alt="logo1" className="w-15 h-12" />
          <img src="/header/logo_berakhlak.png" alt="logo1" className="w-20 h-12" />
          <img src="/header/logo_kata_bpom.png" alt="logo1" className="w-15 h-12" />
          <img src="/header/logo_zi.png" alt="logo1" className="w-15 h-12" />
          <img src="/header/tolak_gratifikasi.png" alt="logo1" className="w-20 h-12" />
        </div>

        {/* ==== HAMBURGER (MOBILE) ==== */}
        <button
          className="md:hidden block text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* ==== MENU DESKTOP ==== */}
        <div className="hidden md:flex space-x-6 items-center">

          <Link href="/" className="hover:text-blue-600 font-medium">
            Beranda
          </Link>

          <a href="#features" className="hover:text-blue-600 font-medium">
            Inovasi
          </a>

          <a href="#internal" className="hover:text-blue-600 font-medium">
            Layanan Internal
          </a>

          <a href="#berita" className="hover:text-blue-600 font-medium">
            Berita
          </a>

          {/* ======= DROPDOWN DESKTOP ======= */}
          <div className="relative group">
            <button className="font-medium hover:text-blue-600">
              Daftar Aplikasi ▾
            </button>

            <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-md opacity-0 invisible 
                            group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <a href="#internal" className="block px-4 py-2 hover:bg-gray-100">
                Aplikasi Pusat
              </a>

              <a href="#layanan1" className="block px-4 py-2 hover:bg-gray-100">
                Aplikasi Balai
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ==== MENU MOBILE (DROPDOWN) ==== */}
      {open && (
        <div className="md:hidden bg-white shadow-lg border-t">

          <a href="/" className="block px-6 py-3 hover:bg-gray-100">
            Beranda
          </a>

          <a href="#features" className="block px-6 py-3 hover:bg-gray-100">
            Inovasi
          </a>

          <a href="#internal" className="block px-6 py-3 hover:bg-gray-100">
            Layanan Internal
          </a>

          <a href="#berita" className="block px-6 py-3 hover:bg-gray-100">
            Berita
          </a>

          {/* === DROPDOWN MOBILE === */}
          <details className="px-6 py-3 hover:bg-gray-50">
            <summary className="cursor-pointer font-medium">
              Daftar Aplikasi
            </summary>

            <div className="ml-4 mt-2 space-y-2">
              <a href="#internal" className="block py-2 hover:text-blue-600">
                Aplikasi Pusat
              </a>
              <a href="#layanan1" className="block py-2 hover:text-blue-600">
                Aplikasi Balai
              </a>
            </div>
          </details>
        </div>
      )}
    </nav>
  );
}

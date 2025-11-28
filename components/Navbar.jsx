"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="w-full fixed top-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* ==== LOGO ==== */}
        <div className="flex items-center space-x-2">
          <img src="/header/badan-pom.png" className="w-15 h-12" />
          <img src="/header/logo_berakhlak.png" className="w-20 h-12" />
          <img src="/header/logo_kata_bpom.png" className="w-15 h-12" />
          <img src="/header/logo_zi.png" className="w-15 h-12" />
          <img src="/header/tolak_gratifikasi.png" className="w-20 h-12" />
        </div>

        {/* ==== HAMBURGER (MOBILE) ==== */}
        <button className="md:hidden block text-3xl" onClick={() => setOpen(!open)}>
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

          {/* LOGIN / LOGOUT BUTTON */}
          {session ? (
            <button
              onClick={() =>
                signOut({
                  callbackUrl: "/api/auth/logout-kc",
                })
              }
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => signIn("keycloak")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
          )}
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

          {/* MOBILE LOGIN / LOGOUT */}
          <div className="px-6 py-3">
            {session ? (
              <button
                onClick={() =>
                  signOut({
                    callbackUrl: "/api/auth/logout-kc",
                  })
                }
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

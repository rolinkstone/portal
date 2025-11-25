import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* === Logo Images (5 items) === */}
        <div className="flex items-center space-x-2">
          <img src="/header/badan-pom.png" alt="logo1" className="w-15 h-12" />
          <img src="/header/logo_berakhlak.png" alt="logo1" className="w-20 h-12" />
          <img src="/header/logo_kata_bpom.png" alt="logo1" className="w-15 h-12" />
          <img src="/header/logo_zi.png" alt="logo1" className="w-15 h-12" />
          <img src="/header/tolak_gratifikasi.png" alt="logo1" className="w-20 h-12" />
        </div>

        {/* === Menu Navigation === */}
        <div className="space-x-6">
         <Link href="/" className="cursor-pointer scroll-smooth">Beranda</Link>
          <a href="#features" className="cursor-pointer scroll-smooth">Inovasi</a>
          <a href="#internal" className="cursor-pointer scroll-smooth">Layanan Internal</a>
           <a href="#berita" className="cursor-pointer scroll-smooth">Berita</a>
        </div>

      </div>
    </nav>
  );
}

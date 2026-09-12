import fs from "node:fs";
import path from "node:path";

/**
 * Banner promosi LAURA Assistant (https://asisten-laura.bbpompky.id).
 *
 * Aset desain final: /public/Inovasi/laura-assistant.png
 * Kanvas 3584 x 1184 px (rasio ~3:1). Rasio file inilah yang menentukan tinggi
 * banner, jadi selama tetap ~3:1 tampilannya proporsional di lebar berapa pun.
 *
 * Lebar TAMPIL di halaman diatur oleh kelas `max-w-3xl` (768 px) di bawah.
 * Tangga pilihan lebar:
 *   max-w-2xl = 672px   (paling kecil)
 *   max-w-3xl = 768px   <-- sekarang
 *   max-w-4xl = 896px
 *   max-w-5xl = 1024px
 *   max-w-full = selebar halaman
 *
 * Catatan ukuran: tampil di 736 px hanya butuh file ~1472 px lebar untuk layar
 * retina. File 3584 px / 2.4 MB saat ini jauh melebihi kebutuhan itu.
 * Gambar panduan ukuran ada di /public/Inovasi/laura-assistant-banner.png
 *
 * Keberadaan file dicek di server, jadi banner tidak dirender sama sekali
 * (tanpa area kosong) selama asetnya belum ada. Ini disengaja: onError pada
 * <img> tidak andal, karena kalau gambar gagal dimuat sebelum React hydration
 * handler-nya tidak pernah dipanggil dan yang tampil justru ikon gambar rusak.
 */
const LAURA_ASSISTANT_URL = "https://asisten-laura.bbpompky.id";
const POSTER_SRC = "/Inovasi/laura-assistant.png";
const POSTER_PATH = ["public", "Inovasi", "laura-assistant.png"];

export default function LauraAssistantBanner() {
  if (!fs.existsSync(path.join(process.cwd(), ...POSTER_PATH))) return null;

  return (
    <section id="laura-assistant" className="relative w-full overflow-hidden bg-slate-900 py-8 md:py-10">
      <a
        href={LAURA_ASSISTANT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Buka LAURA Assistant, layanan AI untuk ulasan regulasi dan analisis"
        className="group mx-auto block w-full max-w-3xl px-4"
      >
        <img
          src={POSTER_SRC}
          alt="LAURA Assistant — layanan AI untuk ulasan regulasi dan analisis. Bantu telaah, perkuat analisis."
          className="h-auto w-full rounded-2xl shadow-2xl ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </a>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

export default function ReformasiBanner() {
  return (
    <a
      href="https://rb.bbpompky.id"
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full"
    >
    <section className="relative w-full cursor-pointer overflow-hidden bg-black">
  <picture onClick={() => window.open("https://rb.bbpompky.id", "_blank")}>
    {/* Desktop */}
    <source
      srcSet="/rb/rb-desktop.gif"
      media="(min-width: 1024px)"
    />

    {/* Tablet */}
    <source
      srcSet="/rb/rb-tablet.gif"
      media="(min-width: 768px)"
    />

    {/* Mobile */}
    <img
      src="/rb/rb-mobile.gif"
      alt="Reformasi Birokrasi"
      className="w-full h-auto cursor-pointer"
    />
  </picture>
</section>



    </a>
  );
}

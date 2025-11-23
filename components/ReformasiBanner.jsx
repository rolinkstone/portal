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
      <section className="relative w-full cursor-pointer overflow-hidden h-40 md:h-50 bg-black">
        <motion.video
          src="/rb/rb.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain shadow-2xl mx-auto transform transition-transform duration-500"
          whileHover={{ scale: 1.03 }}
        />
      </section>
    </a>
  );
}

"use client";

import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSession, signIn } from "next-auth/react";

export default function Internal() {
  const sliderRef = useRef(null);
  const { data: session } = useSession();

  const logos = [
    { src: "Internal/QMS.png", url: "https://sites.google.com/view/qmsbbpomdipalangkaraya/halamanmuka?authuser=3" },
    { src: "Internal/monelaku.png", url: "https://sites.google.com/view/monelaku" },
    { src: "Internal/smap_new.png", url: "https://drive.google.com/drive/folders/1VDjkj5Xn7TxwfI251SJLzWVslhpSUBlL" },
    { src: "Internal/asik.png", url: "https://sites.google.com/view/kearsipanbbpompky/pedoman" },
    { src: "Internal/d-peg.png", url: "https://sites.google.com/view/d-peg" },
    { src: "Internal/bmn.png", url: "https://sites.google.com/view/bmn-pky" },
  ];

  const loopedLogos = [...logos, ...logos];

  const handleLogoClick = (url) => {
  if (!session) {
    // user belum login → paksa login Keycloak
    signIn("keycloak", {
      callbackUrl: url, // setelah login, buka URL internal
    });
    return;
  }


    // sudah login → langsung buka
    window.open(url, "_blank");
  };

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const auto = setInterval(() => {
      slider.scrollBy({ left: 300, behavior: "smooth" });
    }, 2500);

    return () => clearInterval(auto);
  }, []);

  return (
    <section id="internal" className="py-20 bg-white relative">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Layanan <span className="text-green-400">Internal</span> Balai Besar POM di Palangka Raya
      </h2>

      <div className="relative max-w-6xl mx-auto px-6">

        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-100 p-3 rounded-full shadow z-10 pointer-events-auto"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-100 p-3 rounded-full shadow z-10 pointer-events-auto"
        >
          <ChevronRight size={28} />
        </button>

        <div
          ref={sliderRef}
          className="flex overflow-x-hidden gap-10 py-6 scroll-smooth select-none"
        >
          {loopedLogos.map((item, idx) => (
            <div key={idx} className="min-w-[25%] flex justify-center">
              <button onClick={() => handleLogoClick(item.url)} className="pointer-events-auto">
                <img
                  src={item.src}
                  className="h-24 mx-auto opacity-70 hover:opacity-100 transition"
                  alt="logo"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Internal() {
  const sliderRef = useRef(null);

  const [showLogin, setShowLogin] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logos = [
    { src: "Internal/QMS.png", url: "https://sites.google.com/view/qmsbbpomdipalangkaraya/halamanmuka?authuser=3" },
    { src: "Internal/monelaku.png", url: "https://sites.google.com/view/monelaku" },
    { src: "Internal/smap_new.png", url: "https://drive.google.com/drive/folders/1VDjkj5Xn7TxwfI251SJLzWVslhpSUBlL" },
    { src: "Internal/asik.png", url: "https://sites.google.com/view/kearsipanbbpompky/pedoman" },
    { src: "Internal/d-peg.png", url: "https://sites.google.com/view/d-peg" },
    { src: "Internal/bmn.png", url: "https://sites.google.com/view/bmn-pky" },
  ];

  // Perpanjang array agar animasi mulus
  const loopedLogos = [...logos, ...logos];

  const handleLogoClick = (url) => {
    setRedirectUrl(url);
    setShowLogin(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      window.open(redirectUrl, "_blank");
      setShowLogin(false);
    } else {
      alert("Login gagal!");
    }
  };

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  // Auto slide
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

        {/* LEFT BUTTON */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-100 p-3 rounded-full shadow z-10 pointer-events-auto"
        >
          <ChevronLeft size={28} />
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-100 p-3 rounded-full shadow z-10 pointer-events-auto"
        >
          <ChevronRight size={28} />
        </button>

        {/* SLIDER (NO SCROLL MANUAL) */}
        <div
          ref={sliderRef}
          className="flex overflow-x-hidden gap-10 py-6 scroll-smooth select-none"
          style={{ touchAction: "none" }} // Disable swipe di mobile
        >
          {loopedLogos.map((item, idx) => (
            <div
              key={idx}
              className="min-w-[25%] flex justify-center"
            >
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

      {/* MODAL LOGIN */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-80 shadow-xl text-center">
            <h3 className="text-xl font-bold mb-4">Login Akses</h3>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border px-3 py-2 rounded"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border px-3 py-2 rounded"
                required
              />

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => setShowLogin(false)}
                className="text-gray-500 mt-2 hover:text-gray-700"
              >
                Batal
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import Navbar from "../Navbar";
import Footer from "../Footer";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PodcastOm() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("/api/podcast/videos")
      .then((res) => {
        if (!res.ok) throw new Error("API tidak ditemukan");
        return res.json();
      })
      .then((data) => setVideos(data.videos))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-b from-[#0A1A2F] via-[#0F2A4A] to-[#14385F] py-20 text-white text-center">
          <h1 className="text-4xl font-bold">Podcast OM</h1>
          <p className="text-lg mt-4 max-w-2xl mx-auto">
           Podcast Obat dan Makanan Balai Besar POM di Palangka Raya
          </p>
        </section>

        {/* CONTENT */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="bg-white shadow-md rounded-3xl overflow-hidden">
            <img
              src="/Inovasi/podcast.jpg"
              className="w-full h-80 object-cover"
              alt="Podcast OM"
            />

            <div className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Podcast Terbaru</h2>

              {/* VIDEO SECTION */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {videos.length > 0 ? (
                  videos.map((video, i) => (
                    <a
                      key={i}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl overflow-hidden shadow hover:scale-105 transition-transform bg-gray-100"
                    >
                      <div className="relative w-full h-48">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="font-medium text-gray-800">{video.title}</p>
                      </div>
                    </a>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-full text-center">
                    Memuat video...
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

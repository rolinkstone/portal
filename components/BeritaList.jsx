export default async function BeritaList() {
  const res = await fetch("https://bbpompky.id/spbe/scrape-berita.php", {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <section
      className="
        py-20
        bg-gradient-to-b from-[#0A1A2F] via-[#0F2A4A] to-[#14385F]
      "
    >
      <div className="flex justify-center mt-8 mb-12">
        <div className="w-full max-w-5xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Berita Aktual BBPOM di Palangka Raya
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white"
              >
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{item.judul}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {item.ringkasan}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import * as cheerio from "cheerio";
import https from "https";

export async function GET() {
  const url = "https://palangkaraya.pom.go.id/berita";

  try {
    const agent = new https.Agent({
      rejectUnauthorized: false, // bypass SSL
    });

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      agent,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    if (!response.ok) {
      throw new Error("HTTP Error " + response.status);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const berita = [];

    $("article.col-6").each((i, el) => {
      const judul = $(el).find("a.text-dark").eq(1).text().trim();
      let link = $(el).find("a.text-dark").eq(1).attr("href") || "";

      if (link && !link.startsWith("http")) {
        link = "https://palangkaraya.pom.go.id" + link;
      }

      const img = $(el).find("img").attr("src") || "";
      const gambar = img.startsWith("http")
        ? img
        : "https://palangkaraya.pom.go.id" + img;

      const ringkasan = $(el).find(".card-text").text().trim();

      berita.push({ judul, link, gambar, ringkasan });
    });

    return Response.json(berita.slice(0, 6));
  } catch (err) {
    return Response.json({
      error: "Gagal mengambil data",
      detail: err.message,
    });
  }
}

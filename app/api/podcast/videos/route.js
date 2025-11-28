import { NextResponse } from "next/server";


const API_KEY = "AIzaSyCW9ii_em-nNgmqOPB6VCX-Xj8OuFUldtw";
const PLAYLIST_ID = "PL-5H8rDv_lsEhd9azh2z_B1-XGuCULqkI"; // playlist podcast

export async function GET() {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${PLAYLIST_ID}&key=${API_KEY}`
    );
    const data = await res.json();

    const videos = data.items.map(item => ({
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      thumbnail: item.snippet.thumbnails.high.url
    }));

    return NextResponse.json({ videos });
  } catch (err) {
    console.error("Error fetching YouTube playlist:", err);
    return NextResponse.json({ videos: [] }, { status: 500 });
  }
}

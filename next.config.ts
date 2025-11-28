import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.ytimg.com"], // tambahkan host YouTube thumbnails
  },
};

export default nextConfig;

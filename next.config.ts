import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // tambahkan ini ↓↓↓
  outputFileTracingRoot: __dirname,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
};

export default nextConfig;

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Portal Informasi BBPOM di Palangka Raya",
    template: "%s | BBPOM di Palangka Raya",
  },
  description:
    "Portal informasi resmi BBPOM di Palangka Raya — Inovasi, Layanan Publik, dan Informasi Pengawasan Obat dan Makanan di Kalimantan Tengah.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProviderWrapper>
          {children}
          <AccessibilityMenu />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}

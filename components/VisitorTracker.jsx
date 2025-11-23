"use client"; // wajib karena pakai useEffect
import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    fetch("/api/kunjungan", { method: "POST" }).catch(console.error);
  }, []);

  return null; // tidak render apa-apa
}

"use client";
import { useEffect, useRef } from "react";

export default function VisitorTracker() {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;

    // Generate atau ambil session ID dari localStorage
    let sessionId = localStorage.getItem('visitor_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('visitor_session_id', sessionId);
    }

    let ipCache = null;

    const trackVisit = async () => {
      try {
        // Dapatkan IP dari API (cache setelah pertama)
        if (!ipCache) {
          const ipRes = await fetch('/api/statistik/get-ip');
          const ipData = await ipRes.json();
          if (!ipData.success || ipData.ip === 'unknown') return;
          ipCache = ipData.ip;
        }

        const body = {
          ip: ipCache,
          sessionId: sessionId,
          userAgent: navigator.userAgent,
          referer: document.referrer || window.location.pathname
        };

        // Kirim ke API hit
        await fetch('/api/statistik/hit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      } catch (error) {
        console.debug('Visitor track error:', error);
      }
    };

    // Tracking setelah 1 detik
    const timer = setTimeout(trackVisit, 1000);

    // Heartbeat setiap 2 menit
    const heartbeat = setInterval(trackVisit, 120000);

    return () => {
      clearTimeout(timer);
      clearInterval(heartbeat);
    };
  }, []);

  return null;
}

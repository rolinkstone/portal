// components/StatistikTracker.jsx
'use client';

import { useEffect, useRef } from 'react';

export default function StatistikTracker() {
  const trackedRef = useRef(false);

  useEffect(() => {
    // Cegah double tracking
    if (trackedRef.current) return;
    trackedRef.current = true;

    // Generate atau ambil session ID dari localStorage
    let sessionId = localStorage.getItem('visitor_session_id');
    if (!sessionId) {
      // Generate session ID unik (akan bertahan selama browser tidak di-clear)
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('visitor_session_id', sessionId);
      console.log('Session ID baru:', sessionId);
    } else {
      console.log('Session ID existing:', sessionId);
    }

    const trackVisitor = async () => {
      try {
        // Dapatkan IP dari API
        const ipRes = await fetch('/api/statistik/get-ip');
        const ipData = await ipRes.json();
        
        if (!ipData.success || ipData.ip === 'unknown') {
          return;
        }

        console.log('Mengirim hit dengan session:', sessionId);

        // Kirim ke API hit
        const response = await fetch('/api/statistik/hit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ip: ipData.ip,
            sessionId: sessionId,
            userAgent: navigator.userAgent,
            referer: document.referrer || window.location.pathname
          }),
        });

        const result = await response.json();
        console.log('Hasil hit:', result);

        // Update online status setiap 2 menit
        const interval = setInterval(async () => {
          try {
            await fetch('/api/statistik/hit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ip: ipData.ip,
                sessionId: sessionId,
                userAgent: navigator.userAgent,
                referer: window.location.pathname,
                isHeartbeat: true
              }),
            });
          } catch (e) {
            // Silent fail
          }
        }, 120000); // 2 menit

        return () => clearInterval(interval);

      } catch (error) {
        console.debug('Tracking error:', error);
      }
    };

    // Tracking setelah 1 detik
    const timer = setTimeout(trackVisitor, 1000);
    return () => {
      clearTimeout(timer);
    };
    
  }, []);

  return null;
}
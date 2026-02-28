// app/api/statistik/get-ip/route.js
import { headers } from 'next/headers';

export async function GET() {
  try {
    const headersList = await headers();
    
    // Coba berbagai sumber IP
    const xForwardedFor = headersList.get('x-forwarded-for');
    const xRealIp = headersList.get('x-real-ip');
    const cfConnectingIp = headersList.get('cf-connecting-ip');
    const trueClientIp = headersList.get('true-client-ip');
    
    let ip = xForwardedFor || xRealIp || cfConnectingIp || trueClientIp || 'unknown';
    
    // Bersihkan IP
    if (ip.includes(',')) {
      ip = ip.split(',')[0].trim();
    }
    
    // Untuk localhost, kita tetap gunakan IP unik agar tracking jalan
    if (ip === '::1' || ip === '127.0.0.1' || ip === 'localhost') {
      // Gunakan kombinasi user agent + timestamp agar lebih unik
      const headersForUA = await headers();
      const userAgent = headersForUA.get('user-agent') || '';
      const hash = Buffer.from(userAgent + Date.now()).toString('base64').substring(0, 8);
      ip = `local-${hash}`;
    }

    return Response.json({ 
      success: true, 
      ip: ip
    });
    
  } catch (error) {
    console.error('Error getting IP:', error);
    return Response.json({ 
      success: false, 
      ip: 'unknown'
    });
  }
}
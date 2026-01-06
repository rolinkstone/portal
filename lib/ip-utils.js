export async function getClientIP(request) {
  let ip = request.headers.get('x-forwarded-for') || 
           request.headers.get('x-real-ip') || 
           'unknown';
  
  // Ambil IP pertama jika ada multiple IPs
  if (ip.includes(',')) {
    ip = ip.split(',')[0].trim();
  }
  
  return ip;
}
// lib/datos.js
export async function getProductos() {
  // DEBES usar la URL completa en el servidor
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const res = await fetch(`${baseUrl}/api/test01`, {
    next: { revalidate: 3600 }
  });
  return res.json();
}

// app/api/saludo/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  // Datos que queremos devolver
  const data = {
    mensaje: "¡Hola desde el endpoint de API!",
    fecha: new Date().toLocaleDateString()
  };

  // Retornamos una respuesta JSON
  return NextResponse.json(data);
}

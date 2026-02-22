// Variant.tsx (SERVER COMPONENT)
import { use } from "react";

function getVariants(publicId: string) {
  return new Promise(resolve =>
    setTimeout(() => resolve({ ok: true }), 5000)
  );
}

export function Test({ publicId }: { publicId: string }) {
  const data = use(getVariants(publicId)); // 👈 AQUÍ

  return <div>Datos cargados</div>;
}

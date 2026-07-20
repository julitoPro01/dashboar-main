// hooks/useRefreshOnBfcache.ts
'use client'

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Hook que fuerza el refresco de la página cuando vuelve del bfcache
 * (navegación con atrás/adelante en el navegador)
 */
//TODO: No se esta usando
export function useRefreshOnBfcache() {
  const router = useRouter();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') return;

    const handlePageShow = (event: PageTransitionEvent) => {
      // persisted = true significa que la página vino del bfcache
      if (event.persisted) {
        console.log('🔄 Página recuperada del bfcache - Refrescando...');
        router.refresh();
      }
    };

    // También refrescar cuando la página se carga por primera vez
    // (pero evitamos doble refresh en montaje inicial)
    const handleLoad = () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      // Si no es la primera carga, podría ser un refresh manual
    };

    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('load', handleLoad);
    };
  }, [router]);
}
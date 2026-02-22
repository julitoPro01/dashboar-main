// Catálogo de mensajes según el tipo de error
export const errorMessages = {
  network: {
    title: "Sin conexión",
    description: "Parece que hay un problema con tu conexión a internet.",
    action: "Revisar conexión",
    icon: "📡"
  },
  
  server: {
    title: "Servidor no disponible",
    description: "El servidor está experimentando problemas. Estamos trabajando para solucionarlo.",
    action: "Intentar nuevamente en unos minutos",
    icon: "⚙️"
  },
  
  timeout: {
    title: "Tiempo de espera agotado",
    description: "La solicitud tardó demasiado en responder.",
    action: "Reintentar",
    icon: "⏱️"
  },
  
  generic: {
    title: "Algo salió mal",
    description: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.",
    action: "Reintentar",
    icon: "⚠️"
  },
  loading:{
     title: "Algo salió mal",
    description: "Hubo un error al cargar los datos. Vuelve a intentarlo.",
    action: "Reintentar",
    icon: "⚠️"
  },
  initState:{
    title: "Algo salió mal",
    description: "No se pudieron cargar los datos requeridos. Intenta nuevamente más tarde.",
    action: "Reintentar",
    icon: "⚠️"
  },
  temp:{
     title: "Algo salió mal",
    description: "No pudimos cargar la información. Intenta nuevamente en unos segundos.",
    action: "Reintentar",
    icon: "⚠️"
  }

};

// Determinar mensaje según el error
export const getErrorMessage = (error: any) => {
  if (error.code === 'ERR_NETWORK') return errorMessages.network;
  if (error.response?.status >= 500) return errorMessages.server;
  if (error.code === 'ECONNABORTED') return errorMessages.timeout;
  return errorMessages.generic;
};
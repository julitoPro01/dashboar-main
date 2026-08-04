import {  ApiErrorType } from "../utils";

export interface ErrorMessage {
  title: string;
  description: string;
  action: string;
  icon: string;
}

export const errorMessages = {
  network: {
    title: "Sin conexión",
    description: "Parece que hay un problema con tu conexión a internet.",
    action: "Revisar conexión",
    icon: "📡",
  },

  server: {
    title: "Servidor no disponible",
    description: "El servidor está experimentando problemas. Estamos trabajando para solucionarlo.",
    action: "Intentar nuevamente en unos minutos",
    icon: "⚙️",
  },

  timeout: {
    title: "Tiempo de espera agotado",
    description: "La solicitud tardó demasiado en responder.",
    action: "Reintentar",
    icon: "⏱️",
  },

  badRequest: {
    title: "Datos inválidos",
    description: "Verifica la información ingresada e inténtalo nuevamente.",
    action: "Corregir datos",
    icon: "📝",
  },

  unauthorized: {
    title: "Inicia sesión",
    description: "Debes iniciar sesión para continuar.",
    action: "Iniciar sesión",
    icon: "🔐",
  },

  forbidden: {
    title: "Acceso denegado",
    description: "No tienes permisos para realizar esta acción.",
    action: "Volver",
    icon: "🚫",
  },

  notFound: {
    title: "No encontrado",
    description: "El recurso solicitado ya no existe o fue eliminado.",
    action: "Volver",
    icon: "🔍",
  },

  conflict: {
    title: "Registro duplicado",
    description: "Ya existe un registro con la misma información.",
    action: "Modificar información",
    icon: "⚠️",
  },

  loading: {
    title: "Error al cargar",
    description: "Hubo un error al cargar los datos.",
    action: "Reintentar",
    icon: "📥",
  },

  initState: {
    title: "No fue posible iniciar",
    description: "No se pudieron obtener los datos necesarios.",
    action: "Reintentar",
    icon: "📂",
  },

  temp: {
    title: "Error temporal",
    description: "No pudimos completar la operación en este momento.",
    action: "Intentar nuevamente",
    icon: "⌛",
  },

  generic: {
    title: "Algo salió mal",
    description: "Ocurrió un error inesperado.",
    action: "Reintentar",
    icon: "⚠️",
  }

} satisfies Record<string, ErrorMessage>;

export const getErrorMessage = (errorType: ApiErrorType): ErrorMessage => {
  switch (errorType) {
    case "BAD_REQUEST":
      return errorMessages.badRequest;

    case "UNAUTHORIZED":
      return errorMessages.unauthorized;

    case "FORBIDDEN":
      return errorMessages.forbidden;

    case "NOT_FOUND":
      return errorMessages.notFound;

    case "CONFLICT":
      return errorMessages.conflict;

    case "SERVER_ERROR":
      return errorMessages.server;

    default:
      return errorMessages.generic;
  }
};
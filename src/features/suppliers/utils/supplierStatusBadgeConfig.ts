
//TODO: No se esta usando

export interface StatusConfig {
  label: string;
  color: string;
  bgColor: string;
  icon?: string;
  description?: string;
}

export const supplierStatusBadgeConfig: Record<any, StatusConfig> = {
  UNDER_REVIEW: {
    label: "En Revisión",
    color: "#F59E0B", // amber-500
    bgColor: "#FEF3C7", // amber-100
    icon: "🕐",
    description: "La cuenta está siendo revisada por el equipo administrativo"
  },
  REJECTED: {
    label: "Rechazada",
    color: "#EF4444", // red-500
    bgColor: "#FEE2E2", // red-100
    icon: "❌",
    description: "La solicitud de cuenta ha sido rechazada"
  },
  SUSPENDED: {
    label: "Suspendida",
    color: "#DC2626", // red-600
    bgColor: "#FECACA", // red-200
    icon: "⏸️",
    description: "La cuenta ha sido suspendida temporalmente"
  },
  ACTIVE: {
    label: "Activa",
    color: "#10B981", // emerald-500
    bgColor: "#D1FAE5", // emerald-100
    icon: "✅",
    description: "La cuenta está activa y funcionando"
  },
  INACTIVE: {
    label: "Inactiva",
    color: "#6B7280", // gray-500
    bgColor: "#F3F4F6", // gray-100
    icon: "💤",
    description: "La cuenta existe pero no está siendo utilizada"
  },
  PENDING_VERIFICATION: {
    label: "Verificación Pendiente",
    color: "#F59E0B", // amber-500
    bgColor: "#FEF3C7", // amber-100
    icon: "📧",
    description: "Esperando verificación del correo electrónico"
  },
  VERIFIED: {
    label: "Verificada",
    color: "#3B82F6", // blue-500
    bgColor: "#DBEAFE", // blue-100
    icon: "🔒",
    description: "Cuenta verificada y lista para usar"
  },
  BLOCKED: {
    label: "Bloqueada",
    color: "#7C3AED", // violet-600
    bgColor: "#EDE9FE", // violet-100
    icon: "🚫",
    description: "La cuenta ha sido bloqueada por seguridad"
  },
  DELETED: {
    label: "Eliminada",
    color: "#374151", // gray-700
    bgColor: "#E5E7EB", // gray-200
    icon: "🗑️",
    description: "La cuenta ha sido eliminada del sistema"
  }
};

// Función para obtener la configuración de un estado
export function getStatusConfig(status: any): StatusConfig {
  return supplierStatusBadgeConfig[status];
}

// Función para obtener solo el label
export function getStatusLabel(status: any): string {
  return supplierStatusBadgeConfig[status]?.label || status;
}

// Función para obtener solo el color
export function getStatusColor(status: any): string {
  return supplierStatusBadgeConfig[status]?.color || "#6B7280";
}
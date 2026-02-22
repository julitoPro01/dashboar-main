import { ProductStatusType } from "@/src/generated/prisma/enums";

export interface ProductStatusConfig {
  label: string;
  color: string;
  bgColor: string;
  icon: string;
  description: string;
  badgeClass?: string; // Para Tailwind
  priority: number; // Para ordenar
  isSellable: boolean; // ¿Se puede vender?
  requiresAction: boolean; // ¿Requiere atención?
}

export const productStatusConfig: Record<ProductStatusType, ProductStatusConfig> = {
  AVAILABLE: {
    label: "Disponible",
    color: "#10B981", // verde
    bgColor: "#D1FAE5",
    icon: "📦",
    description: "Producto disponible para venta inmediata",
    badgeClass: "bg-green-100 text-green-800 border border-green-200",
    priority: 1,
    isSellable: true,
    requiresAction: false
  },
  OUT_OF_STOCK: {
    label: "Agotado",
    color: "#EF4444", // rojo
    bgColor: "#FEE2E2",
    icon: "🚫",
    description: "Producto temporalmente sin stock",
    badgeClass: "bg-red-100 text-red-800 border border-red-200",
    priority: 3,
    isSellable: false,
    requiresAction: true
  },
  COMING_SOON: {
    label: "Próximamente",
    color: "#8B5CF6", // violeta
    bgColor: "#EDE9FE",
    icon: "🚀",
    description: "Producto en camino, disponible pronto",
    badgeClass: "bg-purple-100 text-purple-800 border border-purple-200",
    priority: 5,
    isSellable: false,
    requiresAction: false
  },
  DISCONTINUED: {
    label: "Descontinuado",
    color: "#6B7280", // gris
    bgColor: "#F3F4F6",
    icon: "🗑️",
    description: "Producto que ya no se fabrica/vende",
    badgeClass: "bg-gray-100 text-gray-800 border border-gray-200",
    priority: 8,
    isSellable: false,
    requiresAction: false
  },
  PENDING_RESTOCK: {
    label: "Reabasteciendo",
    color: "#F59E0B", // ámbar
    bgColor: "#FEF3C7",
    icon: "⏳",
    description: "Esperando nuevo inventario",
    badgeClass: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    priority: 4,
    isSellable: false,
    requiresAction: true
  },
  MADE_TO_ORDER: {
    label: "Bajo Pedido",
    color: "#0EA5E9", // azul cielo
    bgColor: "#E0F2FE",
    icon: "🔨",
    description: "Producto fabricado según especificaciones del cliente",
    badgeClass: "bg-sky-100 text-sky-800 border border-sky-200",
    priority: 2,
    isSellable: true,
    requiresAction: false
  },
  IN_TRANSIT: {
    label: "En Tránsito",
    color: "#F97316", // naranja
    bgColor: "#FFEDD5",
    icon: "🚚",
    description: "Producto en camino al almacén",
    badgeClass: "bg-orange-100 text-orange-800 border border-orange-200",
    priority: 6,
    isSellable: false,
    requiresAction: false
  },
  RESERVED: {
    label: "Reservado",
    color: "#EC4899", // rosa
    bgColor: "#FCE7F3",
    icon: "🔒",
    description: "Producto reservado para un cliente",
    badgeClass: "bg-pink-100 text-pink-800 border border-pink-200",
    priority: 7,
    isSellable: false,
    requiresAction: false
  }
};

// Funciones helper
export const getStatusConfig = (status: ProductStatusType): ProductStatusConfig => 
  productStatusConfig[status];

export const getStatusLabel = (status: ProductStatusType): string => 
  productStatusConfig[status]?.label || status;

export const getStatusColor = (status: ProductStatusType): string => 
  productStatusConfig[status]?.color || "#6B7280";
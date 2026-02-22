import { CategoryStatusType } from "@/src/generated/prisma/enums";




export interface BadgeConfig {
  label: string;
  text: string;       // Clases para color de texto
  border: string;     // Clases para borde
  bg: string;         // Clases para fondo
  icon?: React.ComponentType<{ className?: string }>;
}

// utils/categoryBadges.ts
export const CategoryStatusBadgeConfig: Record<CategoryStatusType, BadgeConfig> = {
    ACTIVE: {
        label: "Activo",
        text: "text-green-700",
        border: "border-green-200",
        bg: "bg-green-50"
        },
    INACTIVE: {
        label: "Inactivo",
        text: "text-gray-700",
        border: "border-gray-200",
        bg: "bg-gray-50",
    },
    PENDING_REVIEW: {
        label: "En Revisión",
        text: "text-amber-700",
        border: "border-amber-200",
        bg: "bg-amber-50",
    },
    ARCHIVED: {
        label: "Archivado",
        text: "text-blue-700",
        border: "border-blue-200",
        bg: "bg-blue-50",
    },
    DELETED: {
        label: "Eliminado",
        text: "text-red-700",
        border: "border-red-200",
        bg: "bg-red-50",
    },
    FEATURED: {
        label: "Destacado",
        text: "text-purple-700",
        border: "border-purple-200",
        bg: "bg-purple-50",
    },
    TEMPORARY: {
        label: "Temporal",
        text: "text-indigo-700",
        border: "border-indigo-200",
        bg: "bg-indigo-50",
    },
    DRAFT: {
        label: "Borrador",
        text: "text-slate-700",
        border: "border-slate-200",
        bg: "bg-slate-50",
    }
};
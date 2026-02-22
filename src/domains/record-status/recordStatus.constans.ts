import { RECORD_STATUS_TYPE, RECORD_STATUS_TYPE_LABEL, RECORD_STATUS_TYPE_QUERY_LABEL } from "@/src/interfaces/record-status/recordStatus.type";

// -- ESTADO CON LABEL
export const RECORD_STATUS_QUERY_LABELS: Record<RECORD_STATUS_TYPE, RECORD_STATUS_TYPE_QUERY_LABEL> = {
    ACTIVE: "active",
    INACTIVE: "inactive",
    ARCHIVED: "archived",
    DELETED: "deleted",
} as const;

//--------------
export const RECORD_STATUS_LABELS: Record<RECORD_STATUS_TYPE, RECORD_STATUS_TYPE_LABEL> = {
    ACTIVE: "Activo",
    INACTIVE: "Inactivo",
    ARCHIVED: "Archivado",
    DELETED: "Eliminado",
} as const;

export const RECORD_STATUS_STYLES: Record<RECORD_STATUS_TYPE, { color50: string, color300: string, color400: string, color500: string }> = {
    ACTIVE: { color50: "bg-green-50 dark:bg-green-900/30", color300: "border-green-300", color400: "bg-green-400", color500: "text-green-500 dark:text-green-300" },
    INACTIVE: { color50: "bg-gray-50 dark:bg-gray-900/30", color300: "border-gray-300", color400: "bg-gray-400", color500: "text-gray-500 dark:text-gray-300" },
    ARCHIVED: { color50: "bg-slate-50 dark:bg-slate-900/30", color300: "border-slate-300", color400: "bg-slate-400", color500: "text-slate-500 dark:text-slate-300" },
    DELETED: { color50: "bg-red-50 dark:bg-red-900/30", color300: "border-red-300", color400: "bg-red-400", color500: "text-red-500 dark:text-red-300" }
}

export const RECORD_STATUS_OPTIONS = Object.entries(RECORD_STATUS_LABELS).map(([value, label]) => ({ value, label })) as { value: RECORD_STATUS_TYPE, label: RECORD_STATUS_TYPE_LABEL }[];

//-----------------------
/**
 * POR DEFECTO Y EN DB
 */
export const RECORD_STATUS_ID = {
    ACTIVE: 1,
    INACTIVE: 2,
    ARCHIVED: 3,
    DELETED: 4
} as const;


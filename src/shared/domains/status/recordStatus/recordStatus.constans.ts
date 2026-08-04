import { RecordStatusLabel, RecordStatusDb, RecordStatusValue } from "./type";

// -- ESTADO CON LABEL
export const RECORD_STATUS: Record<RecordStatusDb, RecordStatusValue> = {
    DRAFT: "draft",
    ACTIVE: "active",
    INACTIVE: "inactive",
    ARCHIVED: "archived",
    DELETED: "deleted",
} as const;

//--------------
export const RECORD_STATUS_LABEL: Record<RecordStatusDb, RecordStatusLabel> = {
    DRAFT: "Borrador",
    ACTIVE: "Activo",
    INACTIVE: "Inactivo",
    ARCHIVED: "Archivado",
    DELETED: "Eliminado",
} as const;

export const RECORD_STATUS_STYLES: Record<RecordStatusDb, { colorBg50: string, colorBor300: string, colorBg400: string, colorTxt500: string }> = {
    DRAFT: { colorBg50: "bg-orange-50 dark:bg-orange-900/30", colorBor300: "border-orange-300", colorBg400: "bg-orange-400", colorTxt500: "text-orange-500 dark:text-orange-300" },
    ACTIVE: { colorBg50: "bg-green-50 dark:bg-green-900/30", colorBor300: "border-green-300", colorBg400: "bg-green-400", colorTxt500: "text-green-500 dark:text-green-300" },
    INACTIVE: { colorBg50: "bg-gray-50 dark:bg-gray-900/30", colorBor300: "border-border", colorBg400: "bg-gray-400", colorTxt500: "text-gray-500 dark:text-gray-300" },
    ARCHIVED: { colorBg50: "bg-slate-50 dark:bg-slate-900/30", colorBor300: "border-slate-300", colorBg400: "bg-slate-400", colorTxt500: "text-slate-500 dark:text-slate-300" },
    DELETED: { colorBg50: "bg-red-50 dark:bg-red-900/30", colorBor300: "border-red-300", colorBg400: "bg-red-400", colorTxt500: "text-red-500 dark:text-red-300" }
}

// TODO: TEST - Solo de prueba - Eliminarlo
export const RECORD_STATUS_OPTIONS = Object.entries(RECORD_STATUS_LABEL).map(([value, label]) => ({ value, label })) as { value: RecordStatusDb, label: RecordStatusLabel }[];

//-----------------------
/**
 * POR DEFECTO Y EN DB
 */
export const RECORD_STATUS_ID: Record<RecordStatusDb, number> = {
    DRAFT: 1,
    ACTIVE: 2,
    INACTIVE: 3,
    ARCHIVED: 4,
    DELETED: 5
} as const;

//--------------------------

export const PARENT_RESTRICTED_STATUS: Partial<Record<RecordStatusDb, RecordStatusDb[]>> = {
    DRAFT: ["DRAFT","DELETED"],
    ARCHIVED: ["ARCHIVED"],
    DELETED: ["DELETED","DRAFT"],
};

export const RECORD_STATUS_TRANSITIONS: Record<RecordStatusDb, RecordStatusDb[]> = {
    DRAFT: ["DRAFT", "ACTIVE"],
    ACTIVE: ["ACTIVE", "INACTIVE", "ARCHIVED", "DELETED"],
    INACTIVE: ["ACTIVE", "INACTIVE", "ARCHIVED", "DELETED"],
    ARCHIVED: ["ACTIVE", "ARCHIVED", "DELETED"],
    DELETED: ["DRAFT", "DELETED"],
};


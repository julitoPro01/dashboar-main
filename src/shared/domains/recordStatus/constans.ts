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

export const RECORD_STATUS_VALUE: Record<RecordStatusDb, RecordStatusDb> = {
    DRAFT: "DRAFT",
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
    ARCHIVED: "ARCHIVED",
    DELETED: "DELETED",
} as const;

export const RECORD_STATUS_STYLE: Record<RecordStatusDb, string> = {
    DRAFT:
        "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",

    ACTIVE:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",

    INACTIVE:
        "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",

    ARCHIVED:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",

    DELETED:
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

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

export const RECORD_STATUS_OPTIONS = Object.entries(RECORD_STATUS_LABEL).map(([value, label]) => ({
    value, label, id: RECORD_STATUS_ID[value as RecordStatusDb]
})) as { value: RecordStatusDb, label: RecordStatusLabel, id: number }[];


//--------------------------

export const PARENT_RESTRICTED_STATUS: Partial<Record<RecordStatusDb, RecordStatusDb[]>> = {
    DRAFT: ["DRAFT", "DELETED"],
    ARCHIVED: ["ARCHIVED"],
    DELETED: ["DELETED", "DRAFT"],
};

export const RECORD_STATUS_TRANSITIONS: Record<RecordStatusDb, RecordStatusDb[]> = {
    DRAFT: ["DRAFT", "ACTIVE"],
    ACTIVE: ["ACTIVE", "INACTIVE", "ARCHIVED", "DELETED"],
    INACTIVE: ["ACTIVE", "INACTIVE", "ARCHIVED", "DELETED"],
    ARCHIVED: ["ACTIVE", "ARCHIVED", "DELETED"],
    DELETED: ["DRAFT", "DELETED"],
};


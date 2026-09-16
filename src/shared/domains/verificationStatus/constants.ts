import { VerificationStatusDb, VerificationStatusValue } from "./type";

/**
 * POR DEFECTO Y EN DB
 */
export const VERIFICATION_STATUS_ID: Record<VerificationStatusDb, number> = {
    DRAFT: 1,
    IN_REVIEW: 2,
    APPROVED: 3,
    REJECTED: 4,
    SUSPENDED: 5,
    ARCHIVED: 6,
} as const;


export const VERIFICATION_STATUS: Record<VerificationStatusDb, VerificationStatusValue> = {
    DRAFT: "draft",
    IN_REVIEW: "in_review",
    REJECTED: "rejected",
    APPROVED: "approved",
    SUSPENDED: "suspended",
    ARCHIVED: "archived",
} as const;


export const VERIFICATION_STATUS_LABEL: Record<VerificationStatusDb, string> = {
    DRAFT: "Borrador",
    IN_REVIEW: "En revisión",
    APPROVED: "Aprobado",
    ARCHIVED: "Archivado",
    REJECTED: "Rechazado",
    SUSPENDED: "Suspendido"
} as const;

export const VERIFICATION_STATUS_ID_LABEL: Record<number, string> = {
    1: "Borrador",
    2: "En revisión",
    3: "Aprobado",
    4: "Rechazado",
    5: "Suspendido",
    6: "Archivado"
} as const;

export const VERIFICATION_STATUS_OPTIONS = Object.entries(VERIFICATION_STATUS_LABEL).map(([key, value]) => {
    return { id: VERIFICATION_STATUS_ID[key as VerificationStatusDb], label: value }
})

export const VERIFICATION_STATUS_STYLE: Record<
    VerificationStatusDb,
    string
> = {
    DRAFT: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",

    IN_REVIEW:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",

    APPROVED:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",

    ARCHIVED:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",

    REJECTED:
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",

    SUSPENDED:
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};
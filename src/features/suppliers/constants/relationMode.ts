import { SupplierRelationModeDb } from "../types";

export const SUPPLIER_RELATION_MODE_LABEL:Record<SupplierRelationModeDb,string>={
    OWNER: "Operación propia",
    PARTNER: "Proveedor asociado",
    CATALOG: "Solo catálogo",
} as const;

export const SUPPLIER_RELATION_MODE_BADGE_STYLE: Record<SupplierRelationModeDb, string> = {
    OWNER:
        "border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",

    PARTNER:
        "border-zinc-300 bg-zinc-100 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",

    CATALOG:
        "border-stone-300 bg-stone-100 text-stone-700 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300",
} as const;
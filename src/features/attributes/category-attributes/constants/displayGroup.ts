import { CategoryAttrDisplayGroupDb } from "../types";

export const CATEGORY_ATTR_GROUP_LABEL: Record<CategoryAttrDisplayGroupDb, string> = {
    GENERAL: "Información General",
    FEATURES: "Características",
    DIMENSIONS: "Dimensiones",
    TECHNICAL: "Especificaciones Técnicas",
    COMPATIBILITY: "Compatibilidad",
    PACKAGE_CONTENT: "Contenido del paquete",
    WARRANTY: "Garantía",
    ADDITIONAL: "Información adicional",
} as const;

export const CATEGORY_ATTR_GROUP_OPTIONS = Object.entries(CATEGORY_ATTR_GROUP_LABEL)
    .map<{ value: CategoryAttrDisplayGroupDb, label: string }>(([key, val]: any) => ({ value: key, label: val }))
import type{ SupplierRelationModeDb, SupplierRelationModeLabel } from "../types";

export const SUPPLIER_RELATION_MODE_LABEL:Record<SupplierRelationModeDb,SupplierRelationModeLabel>={
    OWNED:"Operación propia / Dueño",
    PARTNER:"Proveedor externo con acceso al sistema",
    CATALOG:"Solo catálogo (proveedor pasivo/pasante)"
}
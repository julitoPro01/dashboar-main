import { SUPPLIER_RELATION_MODE_TYPE, SUPPLIER_RELATION_MODE_TYPE_LABEL } from "@/src/interfaces/supplier/supplierRelationMode.type"

export const SUPPLIER_RELATION_MODE_LABEL:Record<SUPPLIER_RELATION_MODE_TYPE,SUPPLIER_RELATION_MODE_TYPE_LABEL>={
    OWNED:"Operación propia / Dueño",
    PARTNER:"Proveedor externo con acceso al sistema",
    CATALOG:"Solo catálogo (proveedor pasivo/pasante)"
}
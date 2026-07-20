import { SupplierRelationMode } from "@/src/generated/prisma/enums";

export type SupplierRelationModeDb = SupplierRelationMode;
export type SupplierRelationModeLabel = 
"Operación propia / Dueño" 
| "Proveedor externo con acceso al sistema" 
| "Solo catálogo (proveedor pasivo/pasante)";

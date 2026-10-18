import { RecordStatusDb } from "@/src/shared/domains/recordStatus";

// variantBaseProduct
type BaseProduct = {
    id: number,
    name: string,
    sku: string,
    category: {
        id: number;
        name?: string | undefined;
        paths?: {
            id: number;
            name: string;
        }[] | undefined;
        path?: string | undefined;
    }
}

// actualizar - crear
type VariantUpsert = { type: "edit", variantId: number } | { type: "create" }

// Acción en la tabla
export type VariantTableAction = {
    type: "list" | "reorder" | "setMain" | "adjustStock"
    //TODO: Solo prueba, temporal
    | "multipleSelection"
}

export interface StateVariant {

    // PAGE - LAYOUT - LISTAS DE VARIANTES 
    variantBaseProduct?: BaseProduct; // Datos basicos del producto con sus referencias
    variantUpsert?: VariantUpsert;// Estado para editar o crear
    variantRecordStatus: RecordStatusDb;
    // PAGE - LISTAS DE VARIANTES
    variantTableAction: VariantTableAction
}

export interface ActionVariant {
    //
    setVariantBaseProduct: (_?: BaseProduct) => void;
    setVariantUpsert: (_?: VariantUpsert) => void;
    setVariantRecordStatus: (_: RecordStatusDb) => void;
    //
    setVariantTableAction: (_: VariantTableAction["type"]) => void;
}

export type VariantSlice = StateVariant & ActionVariant;

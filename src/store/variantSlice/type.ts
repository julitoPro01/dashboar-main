import { RecordStatusDb } from "@/src/shared/domains/recordStatus";

// variantBaseProduct
type BaseProduct = {
    id: number,
    name:string,
    sku:string,
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
type VariantUpsert = { type: "edit", variantId: number } | { type: "create"}

export interface StateVariant {

    // PAGE - LAYOUT - LISTAS DE VARIANTES 
    variantBaseProduct?: BaseProduct; // Datos basicos del producto con sus referencias
    variantUpsert?: VariantUpsert;// Estado para editar o crear
    variantRecordStatus:RecordStatusDb;
}

export interface ActionVariant {
    //
    setVariantBaseProduct: (_?: BaseProduct) => void;
    setVariantUpsert: (_?: VariantUpsert) => void;
    setVariantRecordStatus:(_:RecordStatusDb)=>void
    //
}

export type VariantSlice = StateVariant & ActionVariant;
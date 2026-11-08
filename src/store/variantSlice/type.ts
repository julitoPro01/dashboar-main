import type { VariantListItemResponse } from "@/src/features/products/types";
import { VARIANT_COLUMN_ID } from '../../features/products/variants/variantManagement/listVariants/table/columnName';
import { VARIANT_TABLE_ACTION } from "./constants";

// variantBaseProduct
export type BaseProduct = {
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
    type: keyof typeof VARIANT_TABLE_ACTION
    //TODO: Solo prueba, temporal
    | "multipleSelection",
    // Cambiar de versión siempre y cuando se realiza nueva consulta
    version: number
}

// Variante seleccionada en la tabla y mostrada en su menú contextual.
export type SelectedVariant = Pick<
    VariantListItemResponse,
    | "id"
    | "sku"
    | "isMainVariant"
    | "attributes"
    | "inventoryPolicy"
    | "stockQuantity"
    | "minStock"
    | "stockAdjustments"
    | "variantChannel"
    | "recordStatus"
>;


export type SelectedVariantCell = {
    columnId: string;
    selectedAt: number;
    mode: "singleSelect" | "multiSelect";
    isDirty: boolean
    originalId: number;
    isSelected: boolean;
    dirtyData: Record<string, any>;
};

export interface StateVariant {

    // PAGE - LAYOUT - LISTAS DE VARIANTES 
    variantBaseProduct?: BaseProduct; // Datos basicos del producto con sus referencias
    variantUpsert?: VariantUpsert;// Estado para editar o crear
    variantDetailsId?: number;
    // PAGE - LISTAS DE VARIANTES
    variantTableAction: VariantTableAction;
    variantSelected?: SelectedVariant;
    variantSelectedCells: Record<
        string, // Id de la columna
        {
            version: number,
            cell: Record<
                number, // Identificador del objeto
                SelectedVariantCell | undefined
            >
        }
    >;
}

export interface ActionVariant {
    //
    setVariantBaseProduct: (_?: BaseProduct) => void;
    setVariantUpsert: (_?: VariantUpsert) => void;
    setVariantDetailsId: (_?: number) => void;
    //
    setVariantTableAction: (_: VariantTableAction["type"], newVersion?: boolean) => void;
    setVariantSelect: (_?: SelectedVariant) => void;
    setVariantSelectCells: (key_columnId: string, key_originalId: number, cell?: Omit<SelectedVariantCell, "selectedAt">) => void;
    variantReagentColumn: (column_name:keyof typeof VARIANT_COLUMN_ID) => void;
}

export type VariantSlice = StateVariant & ActionVariant;

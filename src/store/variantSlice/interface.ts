import { VariantDetailsResponse } from "@/src/features/products/types";

type TYPE_MODAL = { modalOpen: boolean, id?: number, type: "edit" | "create" }

// variantBaseProduct
type BaseProduct = {
    id: number,
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
    // TODO: no usados
    isUpsertVariantModalOpen: TYPE_MODAL;
    isVariantListEditing: boolean;
    variant?: VariantDetailsResponse;

    // Datos basicos del producto con sus referencias
    variantBaseProduct?: BaseProduct;

    // Estado para editar o crear
    variantUpsert?: VariantUpsert;
}

export interface ActionVariant {
    setUpsertVariantModalOpen: (_: TYPE_MODAL) => void;
    setVariantListEditing: (value: boolean) => void;
    setVariants: (_: VariantDetailsResponse) => void;

    setVariantBaseProduct: (_?: BaseProduct) => void;

    setVariantUpsert: (_?: VariantUpsert) => void;
}

export type VariantSlice = StateVariant & ActionVariant;
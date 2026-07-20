import { VariantDetailsResponse } from "@/src/features/products/types";

type TYPE_MODAL = {modalOpen:boolean, id?:number, type:"edit"|"create"}

export interface StateVariant {
    isUpsertVariantModalOpen: TYPE_MODAL;
    isVariantListEditing: boolean;
    variant?:VariantDetailsResponse
}

export interface ActionVariant {
    setUpsertVariantModalOpen: (_: TYPE_MODAL) => void;
    setVariantListEditing: (value: boolean) => void;
    setVariants:(_:VariantDetailsResponse)=>void;
}

export type VariantSlice = StateVariant & ActionVariant;
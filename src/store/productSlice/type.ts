import { ProductFilters } from "@/src/features/products/types";


type TYPE_SELECTED = { id: number, publicId: string }

// PAGE - INDEX 
type Delete = Partial<Record<keyof ProductFilters, true>>;

//------------
export interface ProductProperty {
    id: number;
    label: string;
    value: string;
    isCustom?:boolean;
}
// ----------
export type OriginalLongDescription = {
    description: Record<string, any>,// Contendio de tiptap
    customProperties: ProductProperty[],
    version: number
}

export interface StateProduct {
    // PAGE - INDEX - LISTAS DE PRODUCTOS
    productFilters: ProductFilters;
    productSelected?: TYPE_SELECTED;

    //PAGE - CREAR, EDITAR
    productProperties: ProductProperty[];
    productOriginalLongDescription: {
        originalCreate: OriginalLongDescription,
        originalEdit: OriginalLongDescription
    }
}

export interface ActionProduct {
    //
    setProductFilters: (_: Partial<ProductFilters>, del?: Delete) => void;
    setProductSelect: (_?: TYPE_SELECTED) => void;
    //
    setProductProperties: (properties: ProductProperty[]) => void;
    setProductOriginalLongDescriptionEdit: (longDescription:Omit<OriginalLongDescription,"version">) => void
    productRefreshOriginalLongDescriptionCreate: () => void

}

export type ProductSlice = StateProduct & ActionProduct;
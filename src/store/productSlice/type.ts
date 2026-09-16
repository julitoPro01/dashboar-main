import { CategorizationForm, ProductDetailsResponse, ProductFilters } from "@/src/features/products/types";

// page -> Product Details
export type TYPE_PRODUCT_DETAILS =
    "product-details" |
    "image-details" |
    "category-details" |
    "attribute-details"

interface ModalProductDetails {
    type?: TYPE_PRODUCT_DETAILS,
    open: boolean,
    id?: number
}
//-----------

export type STATE_LOADING_PRODUCT = "loaded" | "loading";

type TYPE_SELECTED = { id: number, publicId: string }

// PAGE - INDEX 
type Delete = Partial<Record<keyof ProductFilters, true>>;

export interface StateProduct {
    // PAGE - INDEX
    productFilters: ProductFilters;

    productLoadingState: STATE_LOADING_PRODUCT;
    productSelected?: TYPE_SELECTED;

    productDetailsData?: ProductDetailsResponse;
    productModalTypeDetails: ModalProductDetails

 
}

export interface ActionProduct {
    setProductFilters: (_: Partial<ProductFilters>, del?: Delete) => void;

    setProductLoadingState: (_: STATE_LOADING_PRODUCT) => void;
    setProductSelect: (_?: TYPE_SELECTED) => void;

    setProductModalTypeDetails: (_: ModalProductDetails) => void;
    setProductDetailsData: (_?: ProductDetailsResponse) => void;


}

export type ProductSlice = StateProduct & ActionProduct;
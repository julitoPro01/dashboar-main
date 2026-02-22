import { PaginationBasic } from "@/src/domains/pagination";
import { ProductDetailsResponse, ProductTableFilters } from "@/src/interfaces/products";

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

type TYPE_SELECTED = { id: number, publicId: string, lastCategoryId: number, to: "modal" | "dropDrow", index: number }

export interface StateProduct {
    productFilters: ProductTableFilters;
    productPagination: {pagination:PaginationBasic,isActive:boolean};
    loadingProductState: STATE_LOADING_PRODUCT;
    selectedProduct?: TYPE_SELECTED;

    productDetailsData?: ProductDetailsResponse;
    modalTypeProductDetails: ModalProductDetails
}

export interface ActionProduct {
    setProductFilters: (_: ProductTableFilters) => void;
    setProductPagination: (_: Partial<PaginationBasic>) => void;
    setProductFiltersAndPagination: (_: Partial<ProductTableFilters>, _p: Partial<PaginationBasic>) => void;
    setLoadingProductState: (_: STATE_LOADING_PRODUCT) => void;
    setSelectedProduct: (_?: TYPE_SELECTED) => void;

    setModalTypeProductDetails: (_: ModalProductDetails) => void;
    setProductDetailsData: (_?: ProductDetailsResponse) => void;
}

export type ProductSlice = StateProduct & ActionProduct;
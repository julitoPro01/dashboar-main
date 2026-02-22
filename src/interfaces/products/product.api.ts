import { AttributeDetailsResponse } from "../attribute";
import { MetaPagination } from "../others/table";

//--------------
export type ProductFormDataResponse = {
    images: {
        id: number;
        imageUrl: string;
        fileId: number;
        displayOrder: number;
        isPrimary: boolean;
    }[];
    selectedCategories: {
        id: number;
        name: string;
        parentId: number | undefined;
    }[];
    id: number;
    supplierId: number;
    recordStatusId: number;
    name: string;
    longDescription: string | null;
    shortDescription: string;
    productCategories: {
        category: {
            id: number;
            name: string;
            parentId: number | null;
        };
    }[];
}

//---------------------------------

export interface PreviewProductDetailsResponse {
    id: number;
    publicId: string;
    supplier: string;
    status: string;
    verificationStatus: string;
    mainCategory: string;
    name: string;
    shortDescription: string;
    longDescription?: string | null;
    images: { id: number, url: string, isPrimary: boolean, displayOrder: number }[],
    variants: {
        id: number;
        status: string;
        sku: string;
        stockQuantity: number;
        price: number;
        discount: number;
    }[]
}

//---------------------------------

export type ImageDetailsResponse = {
    id: number,
    url: string,
    isPrimary: boolean,
    displayOrder: number,
    isFeatured: boolean,
    featuredOrder?: number | null,
}

export type ProductVariantDetailsResponse = {
    id: number;
    recordStatus: string;
    sku: string;
    stockQuantity: number;
    minStock?: number | null;
    price: number;
    discount: number;
    isMainVariant: boolean;
    displayOrder: number;
    isUnique: boolean;
    tags: string[];
    attributesDetails: AttributeDetailsResponse[];
    imagesDetails: ImageDetailsResponse[]
}

export type CategoryDetailsResponse = {
    id: number;
    name: string;
    parentId?: number;
}

export interface ProductDetailsResponse {
    id: number;
    publicId: string;
    supplier: string;
    recordStatus: string;
    verificationStatus: string;
    mainCategory: string;
    name: string;
    shortDescription: string;
    longDescription?: string | null;
    createdAt: Date;
    updatedAt?: Date | null;
}

export interface ProductDetailsResponse {
    productDetails: ProductDetailsResponse;
    categoriesDetails: CategoryDetailsResponse[];
    attributesDetails: AttributeDetailsResponse[];
    imagesDetails: ImageDetailsResponse[];
    variantsDetails: ProductVariantDetailsResponse[];
}


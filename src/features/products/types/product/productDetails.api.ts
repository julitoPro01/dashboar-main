
//---------------------------------

import { RecordStatusDb } from "@/src/shared/domains/recordStatus";
import { VerificationStatusDb } from "@/src/shared/domains/verificationStatus";

export interface PreviewProductDetailsResponse {
    id: number;
    publicId: string;
    supplier: string;
    status: string;
    verificationStatus: string;
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
    // attributesDetails: AttributeDetailsResponse[];
    attributesDetails: [];
    imagesDetails: ImageDetailsResponse[]
}

export type CategoryDetailsResponse = {
    id: number;
    name: string;
    parentId?: number | null;
}

export interface ProductDetailsResponse {
    id: number;
    publicId: string;
    supplier: string;
    recordStatus: RecordStatusDb;
    verificationStatus: VerificationStatusDb;
    name: string;
    shortDescription: string;
    longDescription: string | null;
    createdAt: Date;
    updatedAt: Date | null;
}

export interface ProductFullDetailsResponse {
    productDetails: ProductDetailsResponse;
    categoriesDetails: CategoryDetailsResponse[];
    // attributesDetails: AttributeDetailsResponse[];
    attributesDetails: [];
    imagesDetails: ImageDetailsResponse[];
    variantsDetails: ProductVariantDetailsResponse[];
}


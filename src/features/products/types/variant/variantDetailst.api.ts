import {  ProductTag } from "@/src/generated/prisma/enums";

export type VariantImageDetailsResponse = {
    id: number,
    fileId: number,
    url: string,
    isPrimary: boolean,
    displayOrder: number,
    isFeatured: boolean,
    featuredOrder?: number | null,
}

export type VariantDetailsResponse = {
    id: number;
    productId: number;
    status: string;
    sku: string;
    stockQuantity: number;
    minStock?: number | null;
    price: number;
    discount: number;
    isMainVariant: boolean;
    displayOrder: number;
    isUnique: boolean;
    tags: ProductTag[];
    createdAt: Date;
    updatedAt?: Date | null;

    imagesDetails: VariantImageDetailsResponse[];
    // attributesDetails: AttributeDetailsResponse[];
    attributesDetails: [];
}

export interface ProductVariantsDetailsResponse {
    productId: number;
    // attributesDetails: AttributeDetailsResponse[];
    attributesDetails: [];
    variantsDetails: VariantDetailsResponse[];
}
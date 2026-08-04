
//----------------------------------

import { MetaPagination } from "@/src/shared/table/pagination";

export type ProductItemResponse = {
    // ------ VISUAL / TABLE --------
    // columna 1
    image?: string; 
    // columna 2
    name: string;
    // columna 3
    parentSku: string;
    // columna 4
    category: string;
    // columna 5
    variantsCount: number;
    // columna 6
    // Price (range + discount)
    minPrice: number;
    maxPrice: number;
    hasDiscount: boolean;
    maxDiscountPercent: number;
    isUniformDiscount: boolean;
    // columna 7
    // Stock
    totalStock: number;
    lowStockVariantsCount: number;
    hasLowStock: boolean; 
    // columna 8
    // Status
    productStatus: string;        // recordStatus / saleStatus merged
    verificationStatus: string;
    // columna 9
    // Dates 
    createdAt: Date;
    updatedAt: Date;

    // ------ INTERNAL --------
    id: number;
    publicId: string;
    lastCategoryId: number;
}


export type ProductListResponse = {
    products: ProductItemResponse[];
    meta: MetaPagination;
}
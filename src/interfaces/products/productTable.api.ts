

import { MetaPagination } from "@/src/domains/pagination";

//----------------------------------
// para tabla

export type ProductResponse = {
    // ------ VISUAL / TABLE --------
    image?: string;

    name: string;
    parentSku: string;

    category: string;

    variantsCount: number;

    // Price (range + discount)
    minPrice: number;
    maxPrice: number;

    hasDiscount: boolean;
    maxDiscountPercent: number;
    isUniformDiscount: boolean;

    // Stock
    totalStock: number;
    lowStockVariantsCount: number;
    hasLowStock: boolean; 
    // Status
    productStatus: string;        // recordStatus / saleStatus merged
    verificationStatus: string;

    // Dates
    createdAt: Date;
    updatedAt: Date;

    // ------ INTERNAL --------
    id: number;
    publicId: string;
    lastCategoryId: number;
}


export type ProductsResponse = {
    products: ProductResponse[];
    meta: MetaPagination;
}
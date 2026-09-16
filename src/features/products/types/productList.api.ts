
//----------------------------------

import { RecordStatusDb } from "@/src/shared/domains/recordStatus";
import { VerificationStatusDb } from "@/src/shared/domains/verificationStatus";
import { MetaPagination } from "@/src/shared/table/pagination";

export type ProductListItemResponse = {
    // ------ VISUAL / TABLE --------
    // columna 1
    image?: { name: string, path: string };
    // columna 2
    name: string;
    // columna 3
    parentSku: string;
    // columna 4
    category: {id:number, name:string};
    // columna 5
    variantsCount: number;
    // columna 6
    // Price (range + discount)
    minPrice: string;
    maxPrice: string;
    maxDiscountPercent: string;
    hasDiscount: boolean;
    isUniformDiscount: boolean;
    // columna 7
    // Stock
    totalStock: number;
    lowStockVariantsCount: number;
    hasLowStock: boolean;
    // columna 8
    // Status
    productStatus: RecordStatusDb;        // recordStatus
    verificationStatus: VerificationStatusDb;
    // columna 9
    // Dates 
    createdAt: Date;
    updatedAt: Date;

    // ------ INTERNAL --------
    id: number;
    publicId: string;
}


export type ProductListResponse = {
    products: ProductListItemResponse[];
    meta: MetaPagination;
}
import { RecordStatusDb } from "@/src/shared/domains/recordStatus";
import { InventoryPolicyTypeDb, InventoryStatusTypeDb, SaleStatusTypeDb } from "../../shared/catalog";


export type VariantListItemResponse = {
    id: number;
    
    recordStatus: {  id: number;  name: RecordStatusDb};
    saleStatus:SaleStatusTypeDb;
    inventoryStatus:InventoryStatusTypeDb;
    inventoryPolicy: InventoryPolicyTypeDb;

    sku: string;
    stockQuantity: number;
    stockAdjustments: {
        id: number;
        quantity: number;
        reason: string | null;
        date: Date;
        createdBy: string | null;
    }[];
    minStock: number | null;
    price: string;
    discount: number;
    isMainVariant: boolean;
    displayOrder: number;
    tags: any[]; // ProductTag
    image: {
        id: number;
        name: string;
        path: string;
    };
    properties: {
        id: number;
        valueText: string | null;
        valueNumber: number | null;
        valueBoolean: boolean | null;
        valueDate: Date | null;
        valueOptionIds: number[];
        attributeDefinition: {
            id: number;
            name: string;
            systemAttributeValue: {
                id: number;
                value: string;
            }[];
        } | null;
    }[];
};

export type VariantBaseProductResponse = {
    id: number,
    publicId: string,
    name: string,
    sku: string,
    category: {
        id: number;
        name?: string | undefined;
        paths?: {
            id: number;
            name: string;
        }[] | undefined;
        path?: string | undefined;
    }
}

export type VariantListResponse = {
    product: VariantBaseProductResponse
    variants: VariantListItemResponse[]
}

import { RecordStatusDb } from "@/src/shared/domains/recordStatus";
import { DistributionChannelDb, InventoryPolicyTypeDb, InventoryStatusTypeDb, PublicationStatusTypeDb, SaleStatusTypeDb } from "../../shared/catalog";
import { VariantFilterCounts } from "./variantFilters";
import { MetaPagination } from "@/src/shared/table/pagination";

export type VariantDiscountStatus = "NONE" | "SCHEDULED" | "ACTIVE" | "EXPIRED";

export type VariantListItemResponse = {
    id: number;

    recordStatus: { id: number; name: RecordStatusDb };
    saleStatus: SaleStatusTypeDb;
    inventoryStatus: InventoryStatusTypeDb;
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
    discountStartsAt: Date | null;
    discountEndsAt: Date | null;
    discountStatus: VariantDiscountStatus;

    isMainVariant: boolean;
    displayOrder: number;
    tags: any[]; // ProductTag
    image: {
        id: number;
        name: string;
        path: string;
    };
    attributes: {
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

    variantChannel: {
        id: number, channel: DistributionChannelDb, publicationStatus: PublicationStatusTypeDb
    }[]
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
    counts: VariantFilterCounts
    meta: MetaPagination;
}

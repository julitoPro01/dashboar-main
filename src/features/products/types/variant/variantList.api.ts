import { RecordStatusDb } from "@/src/shared/domains/recordStatus";


export type VariantListItemResponse = {
    id: number;
    recordStatus: {
        id: number;
        name: RecordStatusDb;
    };
    sku: string;
    stockQuantity: number;
    minStock: number | null;
    price: any;
    discount: any;
    isMainVariant: boolean;
    displayOrder: number;
    tags: any[]; // ProductTag
    varianAttributesValue: {
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
    name:string,
    sku:string,
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
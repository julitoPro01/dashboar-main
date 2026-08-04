import { RecordStatusDb } from "@/src/shared/domains/status";
import { CategoryAttrDisplayGroupDb } from "../../attributes/category-attributes/types";

// --------- DETAILS----------------
export interface CategoryDetailsResponse {
    id: number;
    name: string;
    description: string | null;
    slug: string;
    imageUrl: string | null;
    level: number;
    paths: { name: string; id: number }[];
    recordStatus: RecordStatusDb;

    createdAt: Date;
    updatedAt?: Date | null;

    productsCount: number;
    childCategoriesCount: number;
    attributeCount: number;
    //TODO: Opcional
    // requiredAttributesCount: number;
    // filterAttributesCount: number;
    // variantAttributesCount: number;
    // productAttributesCount: number;

    attributes: {
        id: number;
        name: string;
        isRequired: boolean;
        isFilter: boolean;
        isVariant: boolean;
        displayOrder: number | null;
        displayGroup:CategoryAttrDisplayGroupDb
    }[];
}

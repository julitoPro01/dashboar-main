import { RecordStatusDb } from "@/src/shared/domains/status/recordStatus/type";

//------------------
export type CategoryResponse = {
    id: number;
    publicId: string;
    name: string;
    recordStatus: RecordStatusDb;
    description?: string | null;
    imageUrl?: string | null;
    slug?: string | null;
    parentId?: number | null;
    level: number;
    path: string;
    hasChildren: boolean;
    hasAttributes:boolean;
};


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
    }[];
}
// ------------ EDIT --------------

export interface CategoryEditResponse {
    id: number;
    name: string;
    description: string | null;
    slug: string;
    imageUrl: string | null;
    parentId:number  | null;
    createdAt: Date;
    updatedAt: Date | null;
    recordStatusId: number;
}
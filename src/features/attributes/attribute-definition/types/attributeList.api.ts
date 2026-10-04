import { MetaPagination } from "@/src/shared/table/pagination";
import { AttributeDataTypeDb } from "./attributeForm";
//---FOR LIST DEFINITIONS---
export type AttributeDefinitionResponse = {
    id: number;
    name: string;
    values: {
        id:number;
        value: string;
        displayOrder: number | null;
    }[];
    description:string | null;
    dataType: AttributeDataTypeDb;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date | null;
}

export type AttributeDefinitionsResponse = {
    attributes: AttributeDefinitionResponse[],
    meta: MetaPagination
};


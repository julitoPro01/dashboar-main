import { MetaPagination } from "@/src/shared/table/pagination";
import { AttributeDataTypeDb } from "./attribute";
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

//---FOR  DETAILS------------
export type AttributeDetailsResponse = {
    categoryAttributeId: number;
    isFilter: boolean;
    isRequired: boolean;
    displayOrder?: number | null;
    dataType: AttributeDataTypeDb;

    key: string;
    keyId: number;
    value: string | undefined;
    valueId: number | undefined;

}

import { AttributeDataType } from "@/src/generated/prisma/enums";

export type AttributeDefinitionResponse = {
    name: string;
    description: string | null;
    createdAt: Date | null;
    id: number;
    toProduct: boolean;
    isActive: boolean;
    dataType: AttributeDataType;
    updatedAt: Date | null;
    createdBy: string;
    createdById: number | null;
    updatedBy: string | null;
    updatedById: number | null;
}

export type AttributeDefinitionsResponse = AttributeDefinitionResponse[];

//---------------


export type AttributeDetailsResponse = {
    categoryAttributeId: number;
    isFilter: boolean;
    isRequired: boolean;
    displayOrder?: number | null;
    dataType: AttributeDataType;

    key: string;
    keyId: number;
    value: string | undefined;
    valueId: number | undefined;

}
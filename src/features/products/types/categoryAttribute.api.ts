import { AttributeDataTypeDb } from "../../attributes/attribute-definition/types";
import { CategoryAttrDisplayGroupDb } from "../../attributes/category-attributes/types";


export type SystemAttributeResponse = {
    attributeDefinitionId: number;
    name: string;
    description: string | null;
    dataType: AttributeDataTypeDb;

    isRequired: boolean;
    isFilter: boolean;
    isVariant: boolean;

    displayOrder: number | null;

    systemAttributeValues?: {
        id: number;
        value: string;
        displayOrder: number | null
    }[];

    valueText: string;
    valueNumber: number;
    valueBoolean: boolean;
    valueDate: string;
    valueOptionIds: number[];
};

export type SystemAttributeGroupResponse = {
    group: CategoryAttrDisplayGroupDb;
    attributes: SystemAttributeResponse[]
}
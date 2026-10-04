// TODO: aun no se usa

import { AttributeDataTypeDb } from "./attributeForm";

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

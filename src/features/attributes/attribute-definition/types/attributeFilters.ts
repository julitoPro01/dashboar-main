import { AttributeDataTypeDb } from "./attributeForm";

export type AttributeFilters = {
    search?: string;
    dataType?: AttributeDataTypeDb;

    registeredFrom?: string;
    registeredTo?: string;

    updatedFrom?: string;
    updatedTo?: string;
}
import { AttributeDataTypeDb } from "./attribute";

export type AttributeFilters = {
    search?: string;
    dataType?: AttributeDataTypeDb;

    registeredFrom?: string;
    registeredTo?: string;

    updatedFrom?: string;
    updatedTo?: string;
}
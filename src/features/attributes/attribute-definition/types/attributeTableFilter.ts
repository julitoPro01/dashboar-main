import { AttributeDataTypeDb } from "./attribute";

export type AttributeTableFilter = {
    search?: string;
    dataType?: AttributeDataTypeDb;

    registeredFrom?: string;
    registeredTo?: string;

    updatedFrom?: string;
    updatedTo?: string;
}
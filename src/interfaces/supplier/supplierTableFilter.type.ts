import { SUPPLIER_CAPABILITY_TYPE } from "./supplierCapability.type";
import { SUPPLIER_RELATION_MODE_TYPE } from "./supplierRelationMode.type";

export type SupplierTableFilter = {
    search?:string; // publicId, name
    capabilities?: SUPPLIER_CAPABILITY_TYPE[];
    relationMode?: SUPPLIER_RELATION_MODE_TYPE;

    registeredFrom?: string;
    registeredTo?: string;
};
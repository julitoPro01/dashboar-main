import { SupplierCapabilityDb } from "./supplierCapability";
import { SupplierRelationModeDb } from "./supplierRelationModeDb";

export type SupplierFilters = {
    search?:string; // publicId, name
    capabilities?: SupplierCapabilityDb[];
    relationMode?: SupplierRelationModeDb;

    registeredFrom?: string;
    registeredTo?: string;
};
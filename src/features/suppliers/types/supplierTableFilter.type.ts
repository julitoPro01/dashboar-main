import { SupplierCapabilityDb } from "./supplierCapability.type";
import {type SupplierRelationModeDb } from "./supplierRelationMode.type";

export type SupplierTableFilter = {
    search?:string; // publicId, name
    capabilities?: SupplierCapabilityDb[];
    relationMode?: SupplierRelationModeDb;

    registeredFrom?: string;
    registeredTo?: string;
};
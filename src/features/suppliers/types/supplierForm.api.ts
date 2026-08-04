import { SupplierCapabilityDb } from "./supplierCapability";
import { SupplierRelationModeDb } from "./supplierRelationMode";

export type SupplierFormDataResponse ={
    id:number;
    name: string;
    address: string;
    description: string;
    logoUrl: string | null;
    capabilities: SupplierCapabilityDb[];
    relationMode: SupplierRelationModeDb;
}
import { RecordStatusDb } from "@/src/shared/domains/status";
import { SupplierCapabilityDb } from "./supplierCapability";
import { SupplierRelationModeDb } from "./supplierRelationMode";
import { MetaPagination } from "@/src/shared/table/pagination";

export type SupplierResponse = {
    id: number;
    publicId:string;
    name: string;
    address: string;
    logoUrl: string | null;
    relationMode: SupplierRelationModeDb;
    capabilities: SupplierCapabilityDb[];
    createdAt: Date | null;
    recordStatus: { name: RecordStatusDb };
};



export type SuppliersResponse = {
    suppliers: SupplierResponse[],
    meta: MetaPagination
};
//-------------------------


export type SupplierDetailsResponse ={
    id:number;
    name: string;
    address: string;
    description: string;
    logoUrl: string | null;
    capabilities:string[];  // SUPPLIER_CAPABILITY_TYPE_LABEL[];
    relationMode:string;    // SUPPLIER_RELATION_MODE_TYPE_LABEL;
}

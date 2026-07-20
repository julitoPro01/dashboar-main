import {type MetaPagination } from "@/src/shared/table";
import {type SupplierCapabilityDb } from "./supplierCapability.type";
import {type SupplierRelationModeDb } from "./supplierRelationMode.type";
import {type RecordStatusDb } from "@/src/shared/domains/status/recordStatus";



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


export type SupplierOption = {
    id: number;
    name: string;
    capabilities: SupplierCapabilityDb[];
}

export type SupplierOptionsResponse = SupplierOption[]

// ---For details---------------

export type SupplierDetailsResponse ={
    id:number;
    name: string;
    address: string;
    description: string;
    logoUrl: string | null;
    capabilities:string[];  // SUPPLIER_CAPABILITY_TYPE_LABEL[];
    relationMode:string;    // SUPPLIER_RELATION_MODE_TYPE_LABEL;
}

//---For Form edit
export type SupplierFormDataResponse ={
    id:number;
    name: string;
    address: string;
    description: string;
    logoUrl: string | null;
    capabilities: SupplierCapabilityDb[];
    relationMode: SupplierRelationModeDb;
}
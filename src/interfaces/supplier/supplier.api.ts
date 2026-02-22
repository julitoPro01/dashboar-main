import { RECORD_STATUS_TYPE } from "../record-status";
import { MetaPagination } from "@/src/domains/pagination";
import { SUPPLIER_CAPABILITY_TYPE, SUPPLIER_CAPABILITY_TYPE_LABEL } from "./supplierCapability.type";
import { SUPPLIER_RELATION_MODE_TYPE, SUPPLIER_RELATION_MODE_TYPE_LABEL } from "./supplierRelationMode.type";

//------For table------------
export type SupplierResponse = {
    id: number;
    publicId:string;
    name: string;
    address: string;
    logoUrl: string | null;
    relationMode: SUPPLIER_RELATION_MODE_TYPE;
    capabilities: SUPPLIER_CAPABILITY_TYPE[];
    createdAt: Date | null;
    recordStatus: { name: RECORD_STATUS_TYPE };
};



export type SuppliersResponse = {
    suppliers: SupplierResponse[],
    meta: MetaPagination
};
//-------------------------


export type SupplierOption = {
    id: number;
    name: string;
    capability: SUPPLIER_CAPABILITY_TYPE;
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
    capabilities: SUPPLIER_CAPABILITY_TYPE[];
    relationMode: SUPPLIER_RELATION_MODE_TYPE;
}
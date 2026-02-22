import { PaginationBasic } from "@/src/domains/pagination";
import { RECORD_STATUS_TYPE } from "@/src/interfaces/record-status";
import { SupplierTableFilter } from "@/src/interfaces/supplier";

export type LOADING_SUPPLIER_STATE = "loaded" | "loading" | "error";

type Options = Partial<Record<keyof SupplierTableFilter, true>>;

export type SupplierState = {
    supplierFilter: SupplierTableFilter;
    loadingSupplierState: LOADING_SUPPLIER_STATE;
    supplierPagination: { pagination: PaginationBasic<RECORD_STATUS_TYPE>, isActive: boolean };
    viewSupplierDetails:{modalOpen:boolean,id?:number};
    selectedSupplier:{id?:number,publicId?:string}
}

export type SupplierAction = {
    setSupplierFilter: (_: Partial<SupplierTableFilter>) => void;
    setLoadingSupplierState: (_: LOADING_SUPPLIER_STATE) => void;
    setSupplierPagination: (_: PaginationBasic<RECORD_STATUS_TYPE>) => void;
    setSupplierFilterAndPagination:(_: Partial<SupplierTableFilter>, q_: Partial<PaginationBasic<RECORD_STATUS_TYPE>>,options?:Options) => void;
    setViewSupplierDetails:(_:boolean,id?:number)=>void;
    setSelectSupplier:(id?:number,publicId?:string)=>void;
}

// setSupplierFilter: 
export type SupplierSlice = SupplierState & SupplierAction;
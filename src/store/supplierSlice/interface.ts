import { SupplierFilters } from "@/src/features/suppliers/types";


type Delete = Partial<Record<keyof SupplierFilters, true>>;

export type SupplierState = {
    // PAGE: INDEX
    supplierFilter: SupplierFilters;
    viewSupplierDetails:{modalOpen:boolean,id?:number};
    selectedSupplier:{id?:number,publicId?:string}
}

export type SupplierAction = {
    setSupplierFilter: (_: Partial<SupplierFilters>,del?:Delete) => void;
    setViewSupplierDetails:(_:boolean,id?:number)=>void;
    setSelectSupplier:(id?:number,publicId?:string)=>void;
}

// setSupplierFilter: 
export type SupplierSlice = SupplierState & SupplierAction;
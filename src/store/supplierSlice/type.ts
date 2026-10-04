import { SupplierFilters } from "@/src/features/suppliers/types";


type Delete = Partial<Record<keyof SupplierFilters, true>>;

export type SupplierState = {
    // PAGE: INDEX - LISTAS DE PRODUCTOS
    supplierFilter: SupplierFilters;
    
    supplierViewDetails:{modalOpen:boolean,id?:number};
    supplierSelected:{id?:number,publicId?:string}
}

export type SupplierAction = {
    setSupplierFilter: (_: Partial<SupplierFilters>,del?:Delete) => void;
    setSupplierViewDetails:(_:boolean,id?:number)=>void;
    setSupplierSelect:(id?:number,publicId?:string)=>void;
}

// setSupplierFilter: 
export type SupplierSlice = SupplierState & SupplierAction;
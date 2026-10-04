import { SupplierSlice } from "./type";
import { deleteProperties } from "@/src/shared/utils";
import { SupplierFilters } from "@/src/features/suppliers/types";
import { StateCreator } from "zustand";
import { Store } from "../store.type";



export const supplierSlice: StateCreator<Store, [], [], SupplierSlice> = (set) => ({
    
    supplierSelected: { id: undefined, publicId: undefined },
    setSupplierSelect: (id, publicId) => set({ supplierSelected: { id, publicId } }),

    supplierViewDetails: { modalOpen: false, id: undefined },
    setSupplierViewDetails: (open, id) => set((state) => ({ supplierViewDetails: { ...state.supplierViewDetails, modalOpen: open, ...(id ? { id } : {}) } })),
    
    supplierFilter: {},
    setSupplierFilter: (fil, del) => {
        set(state => {
            let currentFilters = state.supplierFilter ?? {};
            if (del && typeof del === "object") {
                const entries = Object.entries(del).filter(([_, v]) => v).map(([key]) => key as keyof SupplierFilters);
                currentFilters = deleteProperties(currentFilters, entries)
            }
            return { supplierFilter: { ...currentFilters, ...fil } }
        })
    },

})
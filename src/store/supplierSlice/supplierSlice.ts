import { combine } from "zustand/middleware";
import { SupplierAction, SupplierState } from "./interface";
import { deleteProperties } from "@/src/shared/utils";
import { SupplierTableFilter } from "@/src/features/suppliers/types/supplierTableFilter.type";

export const supplierSlice = combine<SupplierState, SupplierAction>({
    supplierFilter: {},
    viewSupplierDetails: { modalOpen: false, id: undefined },
    selectedSupplier: { id: undefined, publicId: undefined }
}, (set) => ({
    setSelectSupplier: (id, publicId) => set({ selectedSupplier: { id, publicId } }),
    setViewSupplierDetails: (open, id) => set((state) => ({ viewSupplierDetails: { ...state.viewSupplierDetails, modalOpen: open, ...(id ? { id } : {}) } })),

    setSupplierFilter: (fil, del) => {
        set(state => {
            let currentFilters = state.supplierFilter ?? {};
            if (del && typeof del === "object") {
                const entries = Object.entries(del).filter(([_, v]) => v).map(([key]) => key as keyof SupplierTableFilter);
                currentFilters = deleteProperties(currentFilters, entries)
            }
            return { supplierFilter: { ...currentFilters, ...fil } }
        })
    },

}))
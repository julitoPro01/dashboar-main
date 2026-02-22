import { combine } from "zustand/middleware";
import { SupplierAction, SupplierState } from "./interface";
import { deleteProperties } from "@/src/utils";
import { SupplierTableFilter } from "@/src/interfaces/supplier";
import { DEFAULT_PAGINATION } from "@/src/domains/pagination";

export const supplierSlice = combine<SupplierState, SupplierAction>({
    supplierFilter: {},
    supplierPagination: { pagination: { ...DEFAULT_PAGINATION, state: undefined }, isActive: false, },
    loadingSupplierState: "loaded",
    viewSupplierDetails: { modalOpen: false, id: undefined },
    selectedSupplier: { id: undefined, publicId: undefined }
}, (set) => ({
    setSelectSupplier: (id, publicId) => set({ selectedSupplier: { id, publicId } }),
    setViewSupplierDetails: (open, id) => set((state) => ({ viewSupplierDetails: { ...state.viewSupplierDetails, modalOpen: open, ...(id ? { id } : {}) } })),
    setLoadingSupplierState: (state) => set({ loadingSupplierState: state }),
    setSupplierFilterAndPagination: (filter, pag, options) => {
        set((state) => {
            let nextFilters = state.supplierFilter ?? {};

            if (options) {
                const entries = Object.entries(options).filter(([_, v]) => v).map(([key]) => key as keyof SupplierTableFilter);
                nextFilters = deleteProperties(nextFilters, entries)
            }
            return {
                supplierFilter: { ...nextFilters, ...filter },
                supplierPagination: { ...state.supplierPagination, pagination: { ...state.supplierPagination.pagination, ...pag } }
            }
        })
    },
    setSupplierFilter: (fil) => {
        set(state => ({ supplierFilter: { ...state.supplierFilter, ...fil } }))
    },
    setSupplierPagination: (pag) => {
        set((state) => ({ supplierPagination: { pagination: { ...state.supplierPagination.pagination, ...pag }, isActive: true } }))
    },

}))
import { combine } from "zustand/middleware";
import { ActionProduct, StateProduct } from "./interface";
import { DEFAULT_PAGINATION } from "@/src/domains/pagination";

export const productSlice = combine<StateProduct, ActionProduct>(
    {
        productFilters: {},
        productPagination: { pagination: { ...DEFAULT_PAGINATION }, isActive: false },
        loadingProductState: "loaded",
        selectedProduct: undefined,
        modalTypeProductDetails: { type: undefined, open: false },
        productDetailsData: undefined
    },
    (set, get) => ({
        setProductFilters: (filter) => set((state) => ({ productFilters: { ...state.productFilters, ...filter } })),
        setProductPagination: (pag) => set(state => ({ productPagination: { pagination: { ...state.productPagination.pagination, ...pag }, isActive: true } })),
        setProductFiltersAndPagination: (filter, pag) => { },
        setLoadingProductState: (state) => set({ loadingProductState: state }),
        setSelectedProduct: (state) => set({ selectedProduct: state }),

        setModalTypeProductDetails: (state) => set({ modalTypeProductDetails: { ...get().modalTypeProductDetails, ...state } }),
        setProductDetailsData: (state) => set({ productDetailsData: state })
    })
);
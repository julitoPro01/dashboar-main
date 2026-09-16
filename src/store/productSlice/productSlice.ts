import { combine } from "zustand/middleware";
import { ActionProduct, StateProduct } from "./type";
import { deleteProperties } from "@/src/shared/utils";
import { ProductFilters } from "@/src/features/products/types";
export const productSlice = combine<StateProduct, ActionProduct>(
    {
        productFilters: {},
        productLoadingState: "loaded",
        productSelected: undefined,
        productModalTypeDetails: { type: undefined, open: false },
        productDetailsData: undefined,
    },
    (set, get) => ({
        setProductFilters: (fil, del) => {

            set(state => {
                let currentFilters = state.productFilters ?? {};
                if (del && typeof del === "object") {
                    const entries = Object.entries(del).filter(([_, v]) => v).map(([key]) => key as keyof ProductFilters);
                    currentFilters = deleteProperties(currentFilters, entries)
                }
                return { productFilters: { ...currentFilters, ...fil } }
            })
        },
        setProductLoadingState: (state) => set({ productLoadingState: state }),
        setProductSelect: (state) => set({ productSelected: state }),

        setProductModalTypeDetails: (state) => set({ productModalTypeDetails: { ...get().productModalTypeDetails, ...state } }),
        setProductDetailsData: (state) => set({ productDetailsData: state }),

    })
);
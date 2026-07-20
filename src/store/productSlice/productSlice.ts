import { combine } from "zustand/middleware";
import { ActionProduct, StateProduct } from "./type";
import { deleteProperties } from "@/src/shared/utils";
import { ProductTableFilters } from "@/src/features/products";

export const productSlice = combine<StateProduct, ActionProduct>(
    {
        productFilters: {},
        loadingProductState: "loaded",
        selectedProduct: {id:undefined, publicId:undefined, lastCategoryId:undefined, to:undefined , index:undefined},
        modalTypeProductDetails: { type: undefined, open: false },
        productDetailsData: undefined
    },
    (set, get) => ({
        setProductFilters:(fil,del)=>{

            set(state => {
                        let currentFilters = state.productFilters ?? {};
                        if (del && typeof del === "object") {
                            const entries = Object.entries(del).filter(([_, v]) => v).map(([key]) => key as keyof ProductTableFilters);
                            currentFilters = deleteProperties(currentFilters, entries)
                        }
                        return { productFilters: { ...currentFilters, ...fil } }
                    })
        },
        setLoadingProductState: (state) => set({ loadingProductState: state }),
        setSelectedProduct: (state) => set({ selectedProduct: state }),

        setModalTypeProductDetails: (state) => set({ modalTypeProductDetails: { ...get().modalTypeProductDetails, ...state } }),
        setProductDetailsData: (state) => set({ productDetailsData: state })
    })
);
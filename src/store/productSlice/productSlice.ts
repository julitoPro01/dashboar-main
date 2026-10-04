
import { ProductSlice } from "./type";
import { deleteProperties } from "@/src/shared/utils";
import { ProductFilters } from "@/src/features/products/types";
import { StateCreator } from "zustand";
import { Store } from "../store.type";


export const productSlice: StateCreator<Store, [], [], ProductSlice> = (set, get) => ({

    productFilters: {},
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

    productLoadingState: "loaded",

    productSelected: undefined,
    setProductSelect: (state) => set({ productSelected: state }),

    productProperties: [],
    setProductProperties: (state) => set({ productProperties: state }),

    productOriginalLongDescription: {
        originalCreate: {
            customProperties: [],
            description: {
                type: "doc",
                content: [{ type: "paragraph" }]
            }, version: 0
        },
        originalEdit: {
            customProperties: [],
            description: {
                type: "doc",
                content: [{ type: "paragraph" }]
            }, version: 0
        }
    },
    setProductOriginalLongDescriptionEdit(state) {
        set((get) => {
            const original = get.productOriginalLongDescription;

            return {
                productOriginalLongDescription: {
                    ...original,
                    originalEdit: { ...state, version: original.originalEdit.version + 1 }
                }
            }
        })
    },
    productRefreshOriginalLongDescriptionCreate() { // Actualizamos el tiempo para reactivar el componente
        set(get => {
            const original = get.productOriginalLongDescription;
            return {
                productOriginalLongDescription: {
                    ...original,
                    originalCreate: { ...original.originalCreate, version: original.originalCreate.version + 1 }
                }
            }
        })
    }

})
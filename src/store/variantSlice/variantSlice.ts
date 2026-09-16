import { VariantSlice } from "./interface";
import { StateCreator } from "zustand";
import { Store } from "../store.type";




export const variantSlice: StateCreator<Store, [], [], VariantSlice> = (set) => ({


    isUpsertVariantModalOpen: { modalOpen: false, id: undefined, type: "create" },
    isVariantListEditing: false,
    variant: undefined,


    setUpsertVariantModalOpen: (state) => (set({ isUpsertVariantModalOpen: state })),
    setVariantListEditing: (state) => set({ isVariantListEditing: state }),
    setVariants: (state) => set({ variant: state }),

    variantBaseProduct: undefined,
    setVariantBaseProduct: (state) => set({ variantBaseProduct: state }),

    variantUpsert: undefined,
    setVariantUpsert: (state) => set({ variantUpsert: state })
})
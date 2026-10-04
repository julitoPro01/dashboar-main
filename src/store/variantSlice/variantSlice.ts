import { VariantSlice } from "./type";
import { StateCreator } from "zustand";
import { Store } from "../store.type";




export const variantSlice: StateCreator<Store, [], [], VariantSlice> = (set) => ({

    variantBaseProduct: undefined,
    setVariantBaseProduct: (state) => set({ variantBaseProduct: state }),
    
    variantUpsert: undefined,
    setVariantUpsert: (state) => set({ variantUpsert: state })
})
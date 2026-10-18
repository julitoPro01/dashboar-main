import { VariantSlice } from "./type";
import { StateCreator } from "zustand";
import { Store } from "../store.type";
import { RECORD_STATUS_VALUE } from "@/src/shared/domains/recordStatus";



export const variantSlice: StateCreator<Store, [], [], VariantSlice> = (set, get) => ({

    variantBaseProduct: undefined,
    setVariantBaseProduct: (state) => set({ variantBaseProduct: state }),

    variantUpsert: undefined,
    setVariantUpsert: (state) => set({ variantUpsert: state }),

    variantRecordStatus: RECORD_STATUS_VALUE.DRAFT,
    setVariantRecordStatus(status) {
        set({ variantRecordStatus: status })
    },

    variantTableAction: { type: "list", version: 0 },
    setVariantTableAction(type) {
        set({ variantTableAction: { type } })
    }
})
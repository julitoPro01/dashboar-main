import { combine } from "zustand/middleware";
import { ActionVariant, StateVariant } from "./interface";

export const variantSlice = combine<StateVariant, ActionVariant>(
    {
        isUpsertVariantModalOpen: {modalOpen:false, id:undefined, type:"create"},
        isVariantListEditing: false,
        variant:undefined
    },
    (set) => ({
        setUpsertVariantModalOpen: (state) => (set({ isUpsertVariantModalOpen: state })),
        setVariantListEditing: (state) => set({ isVariantListEditing: state }),
        setVariants:(state)=>set({variant: state})
    })
)
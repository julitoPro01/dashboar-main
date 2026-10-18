import { VariantTableAction } from "@/src/store/variantSlice";


export const visibilityColumnByAction: Record<VariantTableAction["type"], Record<string, boolean>> = {
    list: {
        displayOrder: false,
    },

    reorder: {
        displayOrder: true
    },
    setMain: {
        displayOrder: false
    },
    adjustStock: {
        displayOrder: false
    }
    // edit: {
    //     index: false,
    //     selection: false,
    //     order: false,
    //     orderEdit: true,
    //     selectionEdit: true
    // },
}

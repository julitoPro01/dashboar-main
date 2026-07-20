import { combine } from "zustand/middleware";
import { ActionCategory, StateCategory } from "./interface";

const init: StateCategory = {
    mainCategoryChanges: {
        lastUpdate: undefined,
        lastDeleteId: undefined
    },

    selectedMainCategory: undefined,
    selectedCategory: undefined,
    openModalEditCategory: false,
}


export const categorySlice = combine<StateCategory, ActionCategory>(
    init,
    (set) => ({
        setSelectMainCategory: state => (set({ selectedMainCategory: state })),
        setSelectCategory: state => set({ selectedCategory: state }),
        setOpenModalEditCategory: (open) => set({ openModalEditCategory: open }),

        setMainCategoryChanges: (state) => {

            if (state.type === "update")
                set(s => ({ mainCategoryChanges: { ...s.mainCategoryChanges, lastUpdate: state.values } }));
            if (state.type === "delete")
                set(s => ({ mainCategoryChanges: { ...s.mainCategoryChanges, lastDeleteId: state.id } }));

        },

        setCleanStateCategory: () => (set(init))
    })
)   
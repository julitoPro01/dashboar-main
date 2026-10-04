import { combine } from "zustand/middleware";
import { ActionCategory, StateCategory } from "./type";

const init: StateCategory = {

    isCreateCategoryFormOpen: false,
    deleteCategoryModal: undefined,

    selectedMainCategory: undefined,
    selectedCategory: undefined,
    editCategoryModal: undefined,
}


export const categorySlice = combine<StateCategory, ActionCategory>(
    init,
    (set) => ({
        setSelectMainCategory: state => (set({ selectedMainCategory: state })),
        setSelectCategory: val => { set({ selectedCategory: val }) },
        setEditCategoryModal: (val) => set({ editCategoryModal: val }),
        setDeleteCategoryModal(val) { set({ deleteCategoryModal: val }) },

        setCreateCategoryFormOpen: (open) => set({ isCreateCategoryFormOpen: open }),

        setCleanStateCategory: () => (set(init))
    })
)   
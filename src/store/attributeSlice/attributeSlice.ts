import { AttributeSlice } from "./type";
import { deleteProperties } from "@/src/shared/utils";
import { StateCreator } from "zustand";
import { Store } from "../Store.type";
import { AttributeTableFilter } from "@/src/features/attributes/attribute-definition/types";
import { CategoryAttrTableFilter } from "@/src/features/attributes/category-attributes/types";


export const attributeSlice: StateCreator<Store, [], [], AttributeSlice> = (set) => ({

    attributeFilter: {},
    selectedAttribute: undefined,
    deleteAttributeModal: undefined,
    editAttributeModal: undefined,

    categoryAttrFilter: { selection: { type: "all" }, actionType: "view" },
    categoryAttrSelectedIds: [],
    categoryAttrStoreHistory: { prevActionType: undefined },
    selectCategoryModal: { isOpen: false, paths: undefined, isParent: false },

    createAttributeModal: false,

    setAttributeFilter: (fil, del) => {
        set(state => {
            let currentFilters = state.attributeFilter ?? {};
            if (del && typeof del === "object") {
                const entries = Object.entries(del).filter(([_, v]) => v).map(([key]) => key as keyof AttributeTableFilter);
                currentFilters = deleteProperties(currentFilters, entries)
            }
            return { attributeFilter: { ...currentFilters, ...fil } }
        })
    },
    setSelectAttribute: (value) => set({ selectedAttribute: value }),
    setDeleteAttributeModal: val => set({ deleteAttributeModal: val }),
    setEditAttributeModal: val => set({ editAttributeModal: val }),
    // Despues de eliminar un atributo
    resetStateAfterAttributeDelete() {
        set({
            deleteAttributeModal: undefined,
            selectedAttribute: undefined,
            floatingPanel: { cx: 0, cy: 0, open: false, type: null, status: "success" }
        })
    },

    setCategoryAttrSelectedIds: id => set((state) => ({
        categoryAttrSelectedIds: state.categoryAttrSelectedIds.includes(id) ? state.categoryAttrSelectedIds.filter(v => v !== id) : [...state.categoryAttrSelectedIds, id]
    })),
    resetCategoryAttrSelectedIds: () => {
        set({ categoryAttrSelectedIds: [] })
    },
    setCategoryAttrFilter: (obj) => {
        set(state => {

            const rest = typeof obj === "function" ? obj(state.categoryAttrFilter) : obj

            let currentFilters = state.categoryAttrFilter ?? { actionType: "view" };
            if (rest.del && typeof rest.del === "object") {

                const entries = Object.entries(rest.del).filter(([_, v]) => v).map(([key]) => key as keyof CategoryAttrTableFilter);
                currentFilters = { ...deleteProperties(currentFilters, entries), actionType: currentFilters.actionType ?? "view" }
            }
            let prevActionType = state.categoryAttrStoreHistory.prevActionType;
            if (state.categoryAttrFilter.actionType !== rest.fil?.actionType)
                prevActionType = state.categoryAttrFilter.actionType

            return {
                categoryAttrFilter: { ...currentFilters, ...rest.fil },
                categoryAttrStoreHistory: { ...state.categoryAttrStoreHistory, prevActionType }
            }
        })
    },
    setSelectCategoryModal: (val) => set((state) => ({ selectCategoryModal: { ...state.selectCategoryModal, ...val } })),

    setCreateAttributeModal: open => set({ createAttributeModal: open })
});

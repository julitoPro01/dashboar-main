import { AttributeSlice } from "./type";
import { deleteProperties } from "@/src/shared/utils";
import { StateCreator } from "zustand";
import { AttributeFilters } from "@/src/features/attributes/attribute-definition/types";
import { CategoryAttrFilters } from "@/src/features/attributes/category-attributes/types";
import { Store } from "../store.type";


export const attributeSlice: StateCreator<Store, [], [], AttributeSlice> = (set) => ({

    attributeFilters: {},
    selectedAttribute: undefined,
    deleteAttributeModal: undefined,
    editAttributeModal: undefined,

    categoryAttrFilters: { selection: { type: "all" }, actionType: "view" },
    categoryAttrSelectedIds: [],
    categoryAttrStoreHistory: { prevActionType: undefined },
    selectCategoryModal: { isOpen: false, paths: undefined, isParent: false },

    createAttributeModal: false,

    setAttributeFilters: (fil, del) => {
        set(state => {

            let currentFilters = state.attributeFilters ?? {};
            if (del && typeof del === "object") {
                const entries = Object.entries(del).filter(([_, v]) => v).map(([key]) => key as keyof AttributeFilters);
                currentFilters = deleteProperties(currentFilters, entries)
            }
            return { attributeFilters: { ...currentFilters, ...fil } }
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
    setCategoryAttrFilters: (obj) => {
        set(state => {

            const rest = typeof obj === "function" ? obj(state.categoryAttrFilters) : obj

            let currentFilters = state.categoryAttrFilters ?? { actionType: "view" };
            if (rest.del && typeof rest.del === "object") {

                const entries = Object.entries(rest.del).filter(([_, v]) => v).map(([key]) => key as keyof CategoryAttrFilters);
                currentFilters = { ...deleteProperties(currentFilters, entries), actionType: currentFilters.actionType ?? "view" }
            }
            let prevActionType = state.categoryAttrStoreHistory.prevActionType;
            if (state.categoryAttrFilters.actionType !== rest.fil?.actionType)
                prevActionType = state.categoryAttrFilters.actionType

            return {
                categoryAttrFilters: { ...currentFilters, ...rest.fil },
                categoryAttrStoreHistory: { ...state.categoryAttrStoreHistory, prevActionType }
            }
        })
    },
    setSelectCategoryModal: (val) => set((state) => ({ selectCategoryModal: { ...state.selectCategoryModal, ...val } })),

    setCreateAttributeModal: open => set({ createAttributeModal: open })
});

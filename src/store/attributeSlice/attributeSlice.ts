import { AttributeSlice } from "./type";
import { deleteProperties } from "@/src/shared/utils";
import { StateCreator } from "zustand";
import { AttributeFilters } from "@/src/features/attributes/attribute-definition/types";
import { CategoryAttrFilters } from "@/src/features/attributes/category-attributes/types";
import { Store } from "../store.type";


export const attributeSlice: StateCreator<Store, [], [], AttributeSlice> = (set) => ({
    
    
    attributeFilters: {},
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
    attributeSelected: undefined,
    setAttributeSelect: (value) => set({ attributeSelected: value }),
    
    attributeDeleteModal: undefined,
    setAttributeDeleteModal: val => set({ attributeDeleteModal: val }),
    AttributeResetStateAfterDelete() { // Despues de eliminar un atributo
        set({
            attributeDeleteModal: undefined,
            attributeSelected: undefined,
            floatingPanel: { cx: 0, cy: 0, open: false, type: null, status: "success" }
        })
    },

    attributeEditModal: undefined,
    setAttributeEditModal: val => set({ attributeEditModal: val }),

    categoryAttrsSelectedIds: [],
    setCategoryAttrsSelectedIds: call => {
        set((state) => {
            const vals = typeof call === "function" ? call(state.categoryAttrsSelectedIds) : call
            return { categoryAttrsSelectedIds: vals }
        })
    },

    categoryAttrStoreHistory: { prevActionType: undefined },
    categoryAttrsFilters: { selection: { type: "all" }, actionType: "view" },
    setCategoryAttrsFilters: (obj) => {
        set(state => {
            
            const rest = typeof obj === "function" ? obj(state.categoryAttrsFilters) : obj
            
            let currentFilters = state.categoryAttrsFilters ?? { actionType: "view" };
            if (rest.del && typeof rest.del === "object") {
                
                const entries = Object.entries(rest.del).filter(([_, v]) => v).map(([key]) => key as keyof CategoryAttrFilters);
                currentFilters = { ...deleteProperties(currentFilters, entries), actionType: currentFilters.actionType ?? "view" }
            }
            let prevActionType = state.categoryAttrStoreHistory.prevActionType;
            if (state.categoryAttrsFilters.actionType !== rest.fil?.actionType)
                prevActionType = state.categoryAttrsFilters.actionType
            
            return {
                categoryAttrsFilters: { ...currentFilters, ...rest.fil },
                categoryAttrStoreHistory: { ...state.categoryAttrStoreHistory, prevActionType }
            }
        })
    },

    categorySelectModal: { isOpen: false, paths: undefined, isParent: false },
    setCategorySelectModal: (val) => set((state) => ({ categorySelectModal: { ...state.categorySelectModal, ...val } })),

    categoryAttrsDeleteModal:undefined,
    setCategoryAttrsDeleteModal: val => set({ categoryAttrsDeleteModal: val }),

    categoryAttrsInvalidationReason:undefined,
    setCategoryAttrsInvalidationReason: val => set({ categoryAttrsInvalidationReason: val }),
    
    attributeCreateModal: false,
    setAttributeCreateModal: open => set({ attributeCreateModal: open })
});

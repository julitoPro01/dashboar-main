import type { AttributeFilters } from "@/src/features/attributes/attribute-definition/types";
import type { ActionType, CategoryAttrFilters } from "@/src/features/attributes/category-attributes/types";

type DeleteAttr = Partial<Record<keyof AttributeFilters, true>>;
type DeleteCatgAttr = Partial<Record<keyof Omit<CategoryAttrFilters, "actionType">, true>>;

type SelectCatgModal = { isOpen: boolean; paths?: { name: string, id: number }[], isParent: boolean };
// select attriubte
type SelAttr = { id: number; name: string };
// delete attribute modal
type DelAttrModal = { id: number, name: string, open: boolean };
// Edit attribute modal
type EditAttrModal = { id: number, name: string, open: boolean };

// del Catg attr
type DelCtgAttrMd = { del: {id:number,name:string}[], updateIds: number[], open: boolean };
//
type InvalidationReason = { type: "create" | "update" | "add" | "delete" | "refresh", time: number };


export type AttributeState = {
    // Layout: para pagina 1 y pagina 2
    attributeCreateModal: boolean;

    // pagina 1: /attributes
    attributeFilters: AttributeFilters;
    attributeSelected?: SelAttr;
    attributeDeleteModal?: DelAttrModal;
    attributeEditModal?: EditAttrModal;

    // pagina 2: /attributes/category
    categoryAttrsFilters: CategoryAttrFilters;
    categoryAttrsSelectedIds: number[];
    categoryAttrStoreHistory: { prevActionType?: ActionType }
    aategorySelectModal: SelectCatgModal;
    categoryAttrsDeleteModal?: DelCtgAttrMd;
    categoryAttrsInvalidationReason?: InvalidationReason;


}

export type AttributeAction = {
    // 3
    setAttributeCreateModal: (_: boolean) => void;
    // 1
    setAttributeFilters: (_: Partial<AttributeFilters>, del?: DeleteAttr) => void;
    setAttributeSelect: (_?: SelAttr) => void;
    setAttributeDeleteModal: (_?: DelAttrModal) => void;
    setAttributeEditModal: (_?: EditAttrModal) => void;
    AttributeResetStateAfterDelete: () => void;

    // 2
    setCategoryAttrsSelectedIds: (call: ((selectedIds: number[]) => number[]) | number[]) => void;
    setCategoryAttrsFilters: (call: ((filters: CategoryAttrFilters) => {
        fil?: Partial<CategoryAttrFilters>,
        del?: DeleteCatgAttr
    }) | {
        fil?: Partial<CategoryAttrFilters>,
        del?: DeleteCatgAttr
    }) => void;
    setCategorySelectModal: (_: Partial<SelectCatgModal>) => void;
    setCategoryAttrsDeleteModal: (val?: DelCtgAttrMd) => void;
    setCategoryAttrsInvalidationReason: (val?: InvalidationReason) => void;


}

export type AttributeSlice = AttributeState & AttributeAction;
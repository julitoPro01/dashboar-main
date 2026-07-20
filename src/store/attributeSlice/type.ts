import type { AttributeDataTypeDb, AttributeTableFilter } from "@/src/features/attributes/attribute-definition/types";
import type { ActionType, CategoryAttrTableFilter } from "@/src/features/attributes/category-attributes/types";

type DeleteAttr = Partial<Record<keyof AttributeTableFilter, true>>;
type DeleteCatgAttr = Partial<Record<keyof Omit<CategoryAttrTableFilter, "actionType">, true>>;

type SelectCatgModal = { isOpen: boolean; paths?: { name: string, id: number }[], isParent: boolean };
// select attriubte
type SelAttr = { id: number; name: string };
// delete attribute modal
type DelAttrModal = { id: number, name: string, open: boolean };
// Edit attribute modal
type EditAttrModal = { id: number, name: string, open: boolean };

export type AttributeState = {
    // pagina 1: /attributes
    attributeFilter: AttributeTableFilter;
    selectedAttribute?: SelAttr;
    deleteAttributeModal?: DelAttrModal;
    editAttributeModal?: EditAttrModal;

    // pagina 2: /attributes/category
    categoryAttrFilter: CategoryAttrTableFilter;
    categoryAttrSelectedIds: number[];
    categoryAttrStoreHistory: { prevActionType?: ActionType }

    selectCategoryModal: SelectCatgModal;

    // Layout: para pagina 1 y pagina 2
    createAttributeModal: boolean;
}

export type AttributeAction = {
    // 1
    setAttributeFilter: (_: Partial<AttributeTableFilter>, del?: DeleteAttr) => void;
    setSelectAttribute: (_?: SelAttr) => void;
    setDeleteAttributeModal: (_?: DelAttrModal) => void;
    setEditAttributeModal: (_?: EditAttrModal) => void;
    resetStateAfterAttributeDelete: () => void;

    // 2
    setCategoryAttrSelectedIds: (id: number) => void;
    resetCategoryAttrSelectedIds: () => void;
    setCategoryAttrFilter: (call: ((filters: CategoryAttrTableFilter) => {
        fil?: Partial<CategoryAttrTableFilter>,
        del?: DeleteCatgAttr
    }) | {
        fil?: Partial<CategoryAttrTableFilter>,
        del?: DeleteCatgAttr
    }) => void;
    setSelectCategoryModal: (_: Partial<SelectCatgModal>) => void;

    // 3
    setCreateAttributeModal: (_: boolean) => void;
}

export type AttributeSlice = AttributeState & AttributeAction;
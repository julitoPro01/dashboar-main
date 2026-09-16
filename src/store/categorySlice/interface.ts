import { RecordStatusDb } from "@/src/shared/domains/recordStatus";

type Category = {
    id: number,
    publicId: string;
    name: string,
    hasChildren: boolean,
    hasAttributes: boolean,
    parentId?: number,
    recordStatus: RecordStatusDb,
    level: number,
    path: string,
    paths: { name: string, id: number, recordStatus: RecordStatusDb }[],

}

export type MainCategory = {
    id: number,
    path: string,
    recordStatus: RecordStatusDb,
    name: string,
    hasChildren: boolean, publicId: string, level: number, hasAttributes: boolean
    sync?: "update" | "delete"
};

type Changes = { type: "update", values: Partial<MainCategory> } | { type: "delete", id: number };

// delete category modal
type DelCatgMd = { id: number, name: string, parentId?: number, open: boolean };
// Edit modal
type EditCtgMd = { id: number, name: string, open: boolean };

export interface StateCategory {
    selectedMainCategory?: MainCategory;
    selectedCategory?: Category;
    isCreateCategoryFormOpen: boolean;
    deleteCategoryModal?: DelCatgMd;
    editCategoryModal?: EditCtgMd; 


}

export interface ActionCategory {

    setSelectMainCategory: (_?: MainCategory) => void;
    setSelectCategory: (_?: Category) => void;
    setCreateCategoryFormOpen: (open: boolean) => void;
    setDeleteCategoryModal: (val?: DelCatgMd) => void;
    setEditCategoryModal: (val?: EditCtgMd) => void;

    setCleanStateCategory: () => void;//TODO
}

export type CategorySlice = StateCategory & ActionCategory; 
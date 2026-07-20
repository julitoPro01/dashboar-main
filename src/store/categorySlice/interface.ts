import { RecordStatusDb } from "@/src/shared/domains/status";

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
    paths: { name: string, id: number, recordStatus: RecordStatusDb }[]
}

export type MainCategory = {
    id: number,
    path: string,
    recordStatus: RecordStatusDb,
    name: string,
    hasChildren: boolean, publicId: string, level: number, hasAttributes: boolean
};

type Changes = { type: "update", values: Partial<MainCategory> } | { type: "delete", id: number };

export interface StateCategory {
    selectedMainCategory?: MainCategory;
    selectedCategory?: Category;

    openModalEditCategory: boolean; // Para controlar la apertura del modal de edición de categoría

    // Historial para manejar cambios de actualización o eliminados
    mainCategoryChanges: {
        lastUpdate?: Partial<MainCategory>;
        lastDeleteId?: number;
    }
}

export interface ActionCategory {
    setSelectMainCategory: (_?: MainCategory) => void;
    setSelectCategory: (_?: Category) => void;

    setOpenModalEditCategory: (_: boolean) => void;

    setMainCategoryChanges: (_: Changes) => void;

    setCleanStateCategory: () => void;
}

export type CategorySlice = StateCategory & ActionCategory; 
import { CategoryResponse } from "./category.api.type";
import { CategoryTreeResponse } from "./categoryTree.api.type";

export type MainCategoryItem = CategoryResponse & {
    isDirty?: true;
}

//Subcategoria
export interface CategoryTreeNode extends CategoryTreeResponse{
    isCreating?:boolean;
}
import { SelectionFilter } from "@/src/shared/table/filters";

type Selection = { type: SelectionFilter, ids?: number[] }

export type ActionType = "view" | "assign" | "edit";
export type CategoryAttrFilters = {

    searchView?: string;
    searchAssign?: string;
    searchEdit?: string;
    categoryId?: number;
    selection?: Selection;
    actionType: ActionType; // Ideal para filtrar por tipo. 
}
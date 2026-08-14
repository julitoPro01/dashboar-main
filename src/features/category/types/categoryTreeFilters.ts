import { RecordStatusDb } from "@/src/shared/domains/status";

export interface CategoryTreeFilters {
    path?: string;
    notInStatus?: RecordStatusDb[];
    inStatus?: RecordStatusDb[];
}

export interface SearchCategoryTreeFilters extends Omit<CategoryTreeFilters, "path"> {
    search?:string;
}
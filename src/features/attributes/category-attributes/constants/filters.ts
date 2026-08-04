import { OptionNormalizePag, SortByType } from "@/src/shared/table/pagination";

export const CATEGORY_ATTR_SORTBY_ACCEPT_ONLY: SortByType[] = ["order"];

export const CATEGORY_ATTR_NORMALIZE_PAGINATION: OptionNormalizePag = {
    default_sortBy: "order", sortByAcceptOnly: CATEGORY_ATTR_SORTBY_ACCEPT_ONLY
}
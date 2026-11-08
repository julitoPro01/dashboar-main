import { OptionNormalizePag, SortByTypeOld } from "@/src/shared/table/pagination";

export const CATEGORY_ATTR_SORTBY_ACCEPT_ONLY: SortByTypeOld[] = ["order"];

export const CATEGORY_ATTR_PAGINATION_OPTIONS: OptionNormalizePag = {
    default_sortBy: "order", sortByAcceptOnly: CATEGORY_ATTR_SORTBY_ACCEPT_ONLY
}
import { OptionNormalizePag, SortByType } from "@/src/shared/table/pagination";

export const ATTRIBUTE_SORTBY_ACCEPT_ONLY: SortByType[] = ["created_at", "name", "order", "data_type"] as const;

export const ATTRIBUTE_NORMALIZE_PAGINATION = {
    sortByAcceptOnly: ATTRIBUTE_SORTBY_ACCEPT_ONLY,
    includeState: true, parseState: true
} satisfies OptionNormalizePag;
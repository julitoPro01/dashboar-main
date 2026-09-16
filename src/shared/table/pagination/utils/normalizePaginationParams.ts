import { normalizeRecordStatusFromURL, parseRecordStatus, RecordStatusDb, RecordStatusValue } from "@/src/shared/domains/recordStatus";
import { DEFAULT_ORDER_DESC, DEFAULT_PAGE_1, DEFAULT_PAGE_SIZE_20, DEFAULT_SORTBY_CREATED_AT, MAX_PAGE_SIZE_100 } from "../constants";
import { OptionNormalizePag, PaginationQuery, SortByType } from "../types";

type ParseStateResult<T extends boolean | undefined> = T extends true
    ? RecordStatusDb
    : RecordStatusValue;
/**
 * Normaliza el objeto query as un objeto limpio 
 * @param query 
 * @param options 
 * @returns 
 */
export const normalizePaginationParams = <O extends OptionNormalizePag>(query: Partial<PaginationQuery>, options?: O) => {

    const page = (typeof query.page !== "object")
        ? +(query.page && !isNaN(query.page) && query.page > 0
            ? query.page
            : DEFAULT_PAGE_1)
        : DEFAULT_PAGE_1;


    const pageSize = (typeof query.pageSize !== "object")
        ? +(query.pageSize && !isNaN(query.pageSize) && query.pageSize > 0 && query.pageSize <= MAX_PAGE_SIZE_100
            ? query.pageSize
            : DEFAULT_PAGE_SIZE_20)
        : DEFAULT_PAGE_SIZE_20;

    const order = (typeof query.order !== "object") ?
        query.order === "asc" || query.order === "desc"
            ? query.order
            : DEFAULT_ORDER_DESC
        : DEFAULT_ORDER_DESC;

    let state;
    if (options && options.includeState && typeof query.state !== "object") {
        state = normalizeRecordStatusFromURL(query.state);
        if (options.parseState)
            state = parseRecordStatus(state)
    }


    let sortBy;

    if (options && options.sortByAcceptOnly) {

        const acceptOnly = options.sortByAcceptOnly;
        if (typeof query?.sortBy !== "object") {
            sortBy = acceptOnly.includes(query.sortBy?.trim() as any) ? query.sortBy! : (options?.default_sortBy ?? DEFAULT_SORTBY_CREATED_AT) as SortByType
        } else
            sortBy = options?.default_sortBy ?? DEFAULT_SORTBY_CREATED_AT;
    } else {
        sortBy = query.sortBy ?? DEFAULT_SORTBY_CREATED_AT
    }

    return {
        page, pageSize, order, sortBy, ...(state && {
            state: (options?.parseState
                ? (state as RecordStatusDb)
                : (state as RecordStatusValue)) as ParseStateResult<O["parseState"]>
        })
    };
};
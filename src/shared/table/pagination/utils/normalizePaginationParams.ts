import { normalizeRecordStatusFromURL, parseRecordStatus, RecordStatusDb, RecordStatusValue } from "@/src/shared/domains/recordStatus";
import { DEFAULT_ORDER_DESC, DEFAULT_PAGE_1, DEFAULT_PAGE_SIZE_20, DEFAULT_SORTBY_ORDER, MAX_PAGE_SIZE_100 } from "../constants";
import { OptionNormalizePag, PaginationQuery, SortByTypeOld } from "../types";
import { OrderType, PaginationParams, PaginationState, SortByType } from "../types/pagination";

type ParseStateResult<T extends boolean | undefined> = T extends true
    ? RecordStatusDb
    : RecordStatusValue;
/**
 * Normaliza el objeto query as un objeto limpio 
 * @param query 
 * @param options 
 * @returns 
 */
export const normalizePaginationParamsOld = <O extends OptionNormalizePag>(query: Partial<PaginationQuery>, options?: O) => {

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
            sortBy = acceptOnly.includes(query.sortBy?.trim() as any) ? query.sortBy! : (options?.default_sortBy ?? DEFAULT_SORTBY_ORDER) as SortByTypeOld
        } else
            sortBy = options?.default_sortBy ?? DEFAULT_SORTBY_ORDER;
    } else {
        sortBy = query.sortBy ?? DEFAULT_SORTBY_ORDER
    }

    return {
        page, pageSize, order, sortBy, ...(state && {
            state: (options?.parseState
                ? (state as RecordStatusDb)
                : (state as RecordStatusValue)) as ParseStateResult<O["parseState"]>
        })
    };
};


const toPositiveInt = (value: unknown, fallback: number, max?: number): number => {
    if (typeof value !== 'string' && typeof value !== 'number') return fallback;
    const n = Number(value);
    if (!Number.isInteger(n) || n <= 0) return fallback;
    if (max !== undefined && n > max) return fallback;
    return n;
};

const toOrder = (value: unknown): OrderType =>
    value === 'asc' || value === 'desc' ? value : 'desc';

const isInArray = <T extends string>(value: string, arr: readonly T[]): value is T =>
  (arr as readonly string[]).includes(value);

export const toSortBy = <T extends string>(
  value: unknown,
  allowed: readonly T[] = [],
  fallback: T,
): T => {
  if (typeof value !== 'string') return fallback;

  const normalized = value.toLowerCase();
  return isInArray(normalized, allowed) ? normalized : fallback;
};


type Options = {
    acceptOnlySortBy?: SortByType[]
}
export const normalizePaginationParams = (searchParams: PaginationParams, options: Options = {}): PaginationState => {
    const page = toPositiveInt(searchParams.page, DEFAULT_PAGE_1);
    const pageSize = toPositiveInt(searchParams.pageSize, DEFAULT_PAGE_SIZE_20, MAX_PAGE_SIZE_100);
    const order = toOrder(searchParams.order);
    let sortBy = toSortBy(searchParams.sortBy, options.acceptOnlySortBy, DEFAULT_SORTBY_ORDER)

    return { page, pageSize, order, sortBy };
};
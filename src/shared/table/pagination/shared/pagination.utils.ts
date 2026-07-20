import { ReadonlyURLSearchParams } from "next/navigation";
import { DEFAULT_ORDER_DESC, DEFAULT_PAGE_1, DEFAULT_PAGE_SIZE_20, DEFAULT_SORTBY_CREATED_AT, MAX_PAGE_SIZE_100, SORT_BY_QUERIES } from "./pagination.constants";
import { OrderType, PaginationBasic, type PaginationQuery, type SortByType } from './pagination.type';
import { normalizeRecordStatusFromURL, parseRecordStatus, RecordStatusDb, RecordStatusValue } from "@/src/shared/domains/status";

type BaseParms = {
    basePath: string;
    searchParams: string | ReadonlyURLSearchParams;
    query?: PaginationQuery
}

interface OptionNormalizePag {
    sortByAcceptOnly?: SortByType[];
    default_sortBy?: SortByType;
    includeState?: true;
    parseState?: true;
}

interface OptionsCreateUrl extends Omit<OptionNormalizePag, "parseState"> {
    deleteState?: boolean;
}


/**
 * Crea URL con parametros de paginación
 * @param param
 * @param options 
 * @returns 
 */
export const createURLPaginationParams = ({ basePath, searchParams, query }: BaseParms, options: OptionsCreateUrl = {}): string => {

    const { deleteState, ...normalize } = options
    const params = new URLSearchParams(searchParams);

    const valPage = query?.page ?? params.get("page")?.toLowerCase();
    const valPageSize = query?.pageSize ?? params.get("pageSize")?.toLowerCase();
    const valOrder = (query?.order ?? params.get("order")?.toLowerCase()) as "asc" | "desc" | undefined;
    const valSortBy = query?.sortBy ?? params.get("sortBy")?.toLowerCase() as SortByType;
    const valState = query?.state ?? params.get("state")?.toLowerCase() as any;

    const pag = normalizePaginationParams({
        page: valPage,
        pageSize: valPageSize,
        order: valOrder,
        sortBy: valSortBy,
        state: valState
    }, { ...normalize });


    Object.entries(pag).forEach(([key, value]) => {
        if (!!value)
            params.set(key, value.toString());
    })

    if (options && options.deleteState)
        params.delete("state");

    return `${basePath}?${params.toString()}`
}

interface ParsePag extends Omit<OptionNormalizePag, "parseState"> { };
/**
 * toma la estructura desorganizada (URLSearchParams) y lo transforma a un objeto limpio y tipado.
 * @param searchParams 
 * @param options 
 * @returns ReturnParse
 */
export const parsePaginationParams = (searchParams: string | ReadonlyURLSearchParams, options: ParsePag = {}): {
    page: number;
    pageSize: number;
    order: "asc" | "desc";
    sortBy: SortByType;
    state?: RecordStatusDb;
} => {
    const params = new URLSearchParams(searchParams);

    const valPage = params.get("page")?.toLowerCase();
    const valPageSize = params.get("pageSize")?.toLowerCase();
    const valOrder = params.get("order")?.toLowerCase() as OrderType;
    const valSortBy = params.get("sortBy")?.toLowerCase() as SortByType;
    const valState = params.get("state")?.toLowerCase();

    let { page, pageSize, order, sortBy, state } = normalizePaginationParams({
        page: valPage,
        pageSize: valPageSize,
        order: valOrder,
        sortBy: valSortBy,
        state: valState
    }, { ...options, parseState: true });

    return {
        page, pageSize, order, sortBy,
        ...(state && { state: state as RecordStatusDb | undefined })
    };
}

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

interface UpdatePag extends BaseParms {
    options?: OptionsCreateUrl,
    reagent?: boolean
}

/**
 * Reemplaza al estado del historial de navegación - window.history.replaceState()
 * @param param
 */
export const updatePaginationUrl = ({ basePath, searchParams, query, options, reagent = true }: UpdatePag) => {
    const url = createURLPaginationParams({ basePath, searchParams, query }, options);
    if (reagent)
        window.history.replaceState(null, "", url);
    else
        window.history.replaceState({ ...window.history.state, as: url, url }, "", url);
}

export const getPaginationFromUrl = (options: ParsePag = {}): PaginationBasic => {
    const search = window.location.search;
    return parsePaginationParams(search, options);
}

export const buildMeta = ({
    totalItems, pageSize, totalPages, page
}: {
    totalItems: number; pageSize: number; totalPages: number; page: number;
}) => {
    return {
        totalItems,
        itemsPerPage: pageSize,
        totalPages: !!totalPages ? totalPages : 1,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null
    }
}


// TODO: no se esta usando
export const normalizeQueryParams = <T extends Record<string, string | undefined | null>>(
    query: T,
    def: Record<keyof T, string>,
    acceptOnly?: Record<keyof T, any[]>
): T => {

    let obj: Record<string, any> = {};
    Object.entries(query).forEach(([key, val]) => {

        if (acceptOnly) {
            if (acceptOnly[key].includes(val)) (obj[key] = val);
            else (obj[key] = def[key])
        }
        else if (!val) (obj[key] = def[key]);
        else (obj[key] = val);
    })
    return obj as T
}

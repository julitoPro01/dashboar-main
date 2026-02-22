import { PaginationQuery, SORTBY_TYPE } from "./pagination.type";
import { DEFAULT_ORDER_DESC, DEFAULT_PAGE_1, DEFAULT_PAGE_SIZE_20, DEFAULT_SORTBY_CREATED_AT, MAX_PAGE_SIZE_100, SORT_BY_QUERIES } from "./pagination.constants";


interface Props {
    basePath: string;
    searchParams: any;
    query?: PaginationQuery
}

interface OptionsCreat {
    deleteState?: boolean;
}

export const createURLPaginationQuery = ({ basePath, searchParams, query }: Props, options?: OptionsCreat) => {

    const params = new URLSearchParams(searchParams);

    const valPage = query?.page ?? params.get("page");
    const valPageSize = query?.pageSize ?? params.get("pageSize");
    const valOrder = (query?.order ?? params.get("order")) as "asc" | "desc" | undefined;
    const valSortBy = query?.sortBy ?? params.get("sortBy") as SORTBY_TYPE;
    const valState = query?.state ?? params.get("state") as any;

    const pag = normalizePaginationQuery({
        page: valPage,
        pageSize: valPageSize,
        order: valOrder,
        sortBy: valSortBy,
        state: valState
    });

    Object.entries(pag).forEach(([key, value]) => {
        if (!!value)
            params.set(key, value.toString());
    })

    if (options && options.deleteState)
        params.delete("state")


    return `${basePath}?${params.toString()}`
}




type OptionsNorm = {
    sortBy_acceptOnly?: SORTBY_TYPE[];
}

export const normalizePaginationQuery = (
    query: Partial<PaginationQuery>, options?: OptionsNorm
): {
    page: number, pageSize: number, order: "asc" | "desc", state?: string, sortBy: SORTBY_TYPE
} => {

    const page = +(query.page && !isNaN(query.page) && query.page > 0
        ? query.page
        : DEFAULT_PAGE_1);

    const pageSize = +(query.pageSize && !isNaN(query.pageSize) && query.pageSize > 0 && query.pageSize <= MAX_PAGE_SIZE_100
        ? query.pageSize
        : DEFAULT_PAGE_SIZE_20);

    const order = query.order === "asc" || query.order === "desc"
        ? query.order
        : DEFAULT_ORDER_DESC;

    const state = query.state
        ? query.state : undefined;

    let sortBy;
    if (options && options.sortBy_acceptOnly) {
        sortBy = (query.sortBy?.trim() && options.sortBy_acceptOnly.includes(query.sortBy) ? query.sortBy : DEFAULT_SORTBY_CREATED_AT) as SORTBY_TYPE;
    } else
        sortBy = (query.sortBy?.trim() && SORT_BY_QUERIES.includes(query.sortBy) ? query.sortBy : DEFAULT_SORTBY_CREATED_AT) as SORTBY_TYPE;

    return { page, pageSize, order, state, sortBy };
};



export const replaceStatePaginationHistory= (
    basePath:string, searchParams:string,    query?:PaginationQuery
) => {
    const newUrl = createURLPaginationQuery({ basePath, searchParams, query });
    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, "", newUrl)
}
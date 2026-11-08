import { ReadonlyURLSearchParams } from "next/navigation";
import { CreateUrlOptions, PaginationParamsOld, PaginationState, SortByTypeOld } from "../types";
import { normalizePaginationParamsOld } from "./normalizePaginationParams";

/**
 * Crea URL con parametros de paginación
 * @param param
 * @param options 
 * @returns 
 */
export const createURLPaginationParamsOld = ({ basePath, searchParams, query }: PaginationParamsOld, options: CreateUrlOptions = {}): string => {

    const { deleteState, ...normalize } = options
    const params = new URLSearchParams(searchParams);

    const valPage = query?.page ?? params.get("page")?.toLowerCase();
    const valPageSize = query?.pageSize ?? params.get("pageSize")?.toLowerCase();
    const valOrder = (query?.order ?? params.get("order")?.toLowerCase()) as "asc" | "desc" | undefined;
    const valSortBy = query?.sortBy ?? params.get("sortBy")?.toLowerCase() as SortByTypeOld;
    const valState = query?.state ?? params.get("state")?.toLowerCase() as any;

    const pag = normalizePaginationParamsOld({
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

export const createPaginationParams = (searchParams: string | ReadonlyURLSearchParams, params: Partial<PaginationState>) => {
    const search = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            search.set(key, String(value));
        }
    })

    return search;
}
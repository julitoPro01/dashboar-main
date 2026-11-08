import { ReadonlyURLSearchParams } from "next/navigation";
import { OrderTypeOld, ParsePagination, SortByTypeOld } from "../types";
import { normalizePaginationParamsOld } from "./normalizePaginationParams";
import { RecordStatusDb } from "@/src/shared/domains/recordStatus";


/**
 * toma la estructura desorganizada (URLSearchParams) y lo transforma a un objeto limpio y tipado.
 * @param searchParams 
 * @param options 
 * @returns ReturnParse
 */
export const parsePaginationParamsOld = (searchParams: string | ReadonlyURLSearchParams, options: ParsePagination = {}): {
    page: number;
    pageSize: number;
    order: "asc" | "desc";
    sortBy: SortByTypeOld;
    state?: RecordStatusDb;
} => {
    const params = new URLSearchParams(searchParams);

    const valPage = params.get("page")?.toLowerCase();
    const valPageSize = params.get("pageSize")?.toLowerCase();
    const valOrder = params.get("order")?.toLowerCase() as OrderTypeOld;
    const valSortBy = params.get("sortBy")?.toLowerCase() as SortByTypeOld;
    const valState = params.get("state")?.toLowerCase();

    let { page, pageSize, order, sortBy, state } = normalizePaginationParamsOld({
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

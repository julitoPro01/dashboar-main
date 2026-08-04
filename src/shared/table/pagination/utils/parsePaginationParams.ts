import { ReadonlyURLSearchParams } from "next/navigation";
import { OptionNormalizePag, OrderType, ParsePagination, SortByType } from "../types";
import { normalizePaginationParams } from "./normalizePaginationParams";
import { RecordStatusDb } from "@/src/shared/domains/status";



/**
 * toma la estructura desorganizada (URLSearchParams) y lo transforma a un objeto limpio y tipado.
 * @param searchParams 
 * @param options 
 * @returns ReturnParse
 */
export const parsePaginationParams = (searchParams: string | ReadonlyURLSearchParams, options: ParsePagination = {}): {
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



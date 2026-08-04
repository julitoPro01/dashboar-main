import { PaginationState, ParsePagination } from "../types";
import { parsePaginationParams } from "./parsePaginationParams";



export const getPaginationParams = (options: ParsePagination = {}): PaginationState => {
    const search = window.location.search;
    return parsePaginationParams(search, options);
}


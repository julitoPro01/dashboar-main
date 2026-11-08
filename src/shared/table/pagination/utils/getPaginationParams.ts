import { PaginationStateOld, ParsePagination } from "../types";
import { parsePaginationParamsOld } from "./parsePaginationParams";



export const getPaginationParams = (options: ParsePagination = {}): PaginationStateOld => {
    const search = window.location.search;
    return parsePaginationParamsOld(search, options);
}


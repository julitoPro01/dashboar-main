import { CreateUrlOptions, PaginationParams } from "../types";
import { createURLPaginationParams } from "./createURLPaginationParams";

interface UpdatePag extends PaginationParams {
    options?: CreateUrlOptions,
    reagent?: boolean
}

/**
 * Reemplaza al estado del historial de navegación - window.history.replaceState()
 * @param param
 */
export const updatePaginationParams = ({ basePath, searchParams, query, options, reagent = true }: UpdatePag) => {
    const url = createURLPaginationParams({ basePath, searchParams, query }, options);
    if (reagent)
        window.history.replaceState(null, "", url);
    else
        window.history.replaceState({ ...window.history.state, as: url, url }, "", url);
}

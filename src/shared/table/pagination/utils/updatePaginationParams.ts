import { CreateUrlOptions, PaginationParamsOld } from "../types";
import { createURLPaginationParamsOld } from "./createURLPaginationParams";

interface UpdatePag extends PaginationParamsOld {
    options?: CreateUrlOptions,
    reagent?: boolean
}

/**
 * Reemplaza al estado del historial de navegación - window.history.replaceState()
 * @param param
 */
export const updatePaginationParams = ({ basePath, searchParams, query, options, reagent = true }: UpdatePag) => {
    const url = createURLPaginationParamsOld({ basePath, searchParams, query }, options);
    if (reagent)
        window.history.replaceState(null, "", url);
    else
        window.history.replaceState({ ...window.history.state, as: url, url }, "", url);
}

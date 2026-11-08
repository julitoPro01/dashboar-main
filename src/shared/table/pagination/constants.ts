import { PaginationState, SortByType } from "./types";


export const DEFAULT_PAGE_1 = 1;
export const DEFAULT_PAGE_SIZE_20 = 20;
export const MAX_PAGE_SIZE_100 = 100;
export const DEFAULT_ORDER_DESC = "desc" as const;
export const DEFAULT_SORTBY_ORDER: SortByType = "order";

export const SORT_BY_PARAMS:Record<SortByType,SortByType>={
    order:"order", // Orde por id
    displayorder:"displayorder", // Orden manual
    createdat:"createdat",
    updatedat:"updatedat",
    name:"name",
    price:"price",
    datatype:"datatype",
    stock:"stock"
} as const

export const DEFAULT_PAGINATION: PaginationState = {
    page: DEFAULT_PAGE_1,
    pageSize: DEFAULT_PAGE_SIZE_20,
    order: DEFAULT_ORDER_DESC,
    sortBy: DEFAULT_SORTBY_ORDER,
} as const;


 const labels: Record<
        SortByType,
        { asc: string; desc: string; }
    > = {
        createdat: {
            asc: "Creados más antiguos",
            desc: "Creados más recientes",
        },
        price: {
            asc: "Precio menor a mayor",
            desc: "Precio mayor a menor",
        },
        name: {
            asc: "Nombre A → Z",
            desc: "Nombre Z → A",
        },
        updatedat: {
            asc: "Actualizados más antiguos",
            desc: "Actualizados más recientes",
        },
        order: { // Orden por id - manejo interno
            asc: " Ascendente",
            desc: " Descendente",
        },
        datatype: {
            asc: "Ascendente",
            desc: "Descendente"
        },
        stock: {
            asc: "Stock mínimo",
            desc: "Stock máximo"
        },
        displayorder: {
            asc: "Orden manual ascendente",
            desc: "Orden manual descendente",
        }
    }

export const getSortByLabel = (
    sortBy: SortByType,
    order: "asc" | "desc"
) => {

const fieldLabel = labels[sortBy] ?? {
    label: "Orden",
    asc: "Ascendente",
    desc: "Descendente",
};

return {
    label: `Orden:`,
    value: `${order === "asc" ? fieldLabel.asc : fieldLabel.desc}`
}
};



import { PaginationBasic, SortByType } from "./pagination.type";


export const DEFAULT_PAGE_1 = 1;
export const DEFAULT_PAGE_SIZE_20 = 20;
export const MAX_PAGE_SIZE_100 = 100;
export const DEFAULT_ORDER_DESC = "desc" as const;
export const DEFAULT_SORTBY_CREATED_AT: SortByType = "created_at";

export const SORT_BY_QUERIES: SortByType[] = [
    "created_at",
    "updated_at",
    "name",
    "price",
    "order", "data_type", "stock"] as const;

// Llaves para local store
export const PAGINATION_STORAGE_KEYS = {
    SUPPLIERS: 'pagination_suppliers',
    ATTRIBUTES: 'pagination_attributes',
    CATEGORY_ATTRIBUTES: 'pagination_category_attributes'
} as const;

export const DEFAULT_PAGINATION: PaginationBasic = {
    page: DEFAULT_PAGE_1,
    pageSize: DEFAULT_PAGE_SIZE_20,
    order: DEFAULT_ORDER_DESC,
    sortBy: DEFAULT_SORTBY_CREATED_AT,
    state: undefined
} as const;


export const getSortByLabel = (
    sortBy: SortByType,
    order: "asc" | "desc"
) => {
    const labels: Record<
        SortByType,
        { asc: string; desc: string; }
    > = {
        created_at: {
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
        updated_at: {
            asc: "Actualizados más antiguos",
            desc: "Actualizados más recientes",
        },
        order: { // Orden por id - manejo interno
            asc: "Ascendente",
            desc: "Descendente",
        },
        data_type: {
            asc: "Ascendente",
            desc: "Descendente"
        },
        stock:{
            asc:"Stock mínimo",
            desc:"Stock máximo"
        }
    };

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




export type OrderType = "asc" | "desc"
export type SortByType =
    | "order"
    | "displayorder"
    | "createdat" | "updatedat" | "price" | "name"
    | "datatype" | "stock";


export type PaginationParams = {
    page?: string;
    pageSize?: string;
    order?: string;
    sortBy?: string;
}

export type PaginationState = {
    page: number;
    pageSize: number;
    order: OrderType;
    sortBy: SortByType
}
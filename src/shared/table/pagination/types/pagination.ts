import { RecordStatusDb } from "@/src/shared/domains/status";
import { ReadonlyURLSearchParams } from "next/navigation";


export type OrderType = "asc" | "desc"
export type SortByType = "created_at" | "updated_at" | "price" | "name" | "order" | "data_type" | "stock";

export type PaginationState<S = SortByType> = {
  page: number;
  pageSize: number,
  order: OrderType;
  sortBy: S;
  state?: RecordStatusDb;
}

export type PaginationQuery = {
  page?: any // number;
  pageSize?: any // number;
  order?: OrderType;
  sortBy?: SortByType;
  state?: string | null;
}

// normalizar paginacion OPCIONS
// Ningun valor incluido por defecto
export interface OptionNormalizePag {
  sortByAcceptOnly?: SortByType[];
  default_sortBy?: SortByType;
  includeState?: true; 
  parseState?: true;
}


export type ParsePagination=Omit<OptionNormalizePag, "parseState">;

export interface CreateUrlOptions extends Omit<OptionNormalizePag, "parseState"> {
    deleteState?: true;
}

export type PaginationParams = {
    basePath: string;
    searchParams: string | ReadonlyURLSearchParams;
    query?: PaginationQuery
}

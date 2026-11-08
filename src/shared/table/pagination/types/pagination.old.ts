import { RecordStatusDb } from "@/src/shared/domains/recordStatus";
import { ReadonlyURLSearchParams } from "next/navigation";


export type OrderTypeOld = "asc" | "desc"
export type SortByTypeOld = "created_at" | "updated_at" | "price" | "name" | "order" | "data_type" | "stock";

export type PaginationStateOld<S = SortByTypeOld> = {
  page: number;
  pageSize: number,
  order: OrderTypeOld;
  sortBy: S;
  state?: RecordStatusDb;
}

export type PaginationQuery = {
  page?: any // number;
  pageSize?: any // number;
  order?: OrderTypeOld;
  sortBy?: SortByTypeOld;
  state?: string | null;
}

// normalizar paginacion OPCIONS
// Ningun valor incluido por defecto
export interface OptionNormalizePag {
  sortByAcceptOnly?: SortByTypeOld[];
  default_sortBy?: SortByTypeOld;
  includeState?: true; 
  parseState?: true;
}


export type ParsePagination=Omit<OptionNormalizePag, "parseState">;

export interface CreateUrlOptions extends Omit<OptionNormalizePag, "parseState"> {
    deleteState?: boolean;
}

export type PaginationParamsOld = {
    basePath: string;
    searchParams: string | ReadonlyURLSearchParams;
    query?: PaginationQuery
}

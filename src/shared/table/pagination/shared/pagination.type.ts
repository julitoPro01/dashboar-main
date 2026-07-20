import { RecordStatusDb } from "@/src/shared/domains/status";

export type MetaPagination ={
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

export type OrderType = "asc"|"desc"
export type SortByType="created_at"|"updated_at"|"price"|"name" | "order" | "data_type" | "stock";

export type PaginationBasic< S = SortByType> ={
  page: number;
  pageSize: number,
  order: OrderType;
  sortBy: S;
  state?: RecordStatusDb;
}

export type PaginationQuery ={
  page?: any // number;
  pageSize?: any // number;
  order?: OrderType;
  sortBy?: SortByType;
  state?: string | null;
}



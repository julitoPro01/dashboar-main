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

export type SORTBY_TYPE="created_at"|"updated_at"|"price"|"name" | "order";

export type PaginationBasic<T = string, S = SORTBY_TYPE> ={
  page: number;
  pageSize: number,
  order: "asc" | "desc";
  sortBy: S;
  state?: T
}

export type PaginationQuery ={
  page?: any // number;
  pageSize?: any // number;
  order?: "asc" | "desc";
  sortBy?: SORTBY_TYPE;
  state?: string
}



"use client"
import { shallowEqual } from "@/src/shared/utils";
import { useMemo, useRef } from "react";
import { updatePaginationParams } from "./utils";
import { PaginationState } from "./types";

export const useStableUrlPagination = <
  T extends Record<string, unknown>
>(
  pag: PaginationState,
  fil: T,
  basePath: string
) => {

  const prevFiltersRef = useRef<T>(fil);

  return useMemo(() => {


    const filtersChanged = !shallowEqual(prevFiltersRef.current, fil);

    prevFiltersRef.current = fil;

    // si cambiaron filtros -> reset page
    if (filtersChanged) {

      const currentPage = new URLSearchParams(window.location.search).get("page");
      if (currentPage !== "1") {
        updatePaginationParams({
          basePath,
          searchParams: window.location.search,
          query: { page: 1 },
          reagent: false
        })
      }

      return {
        ...pag,
        page: 1
      };
    }
    // si no cambiaron -> usa pag actual
    return pag;

  }, [pag, fil]);

};
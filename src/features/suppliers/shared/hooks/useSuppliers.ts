import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { getSuppliers } from "@/src/action";
import { useStore } from "@/src/store/useStore";
import { useDelayedFetchState } from "@/src/shared/hooks";
import { SupplierFilters } from "../../types";
import { PaginationState } from "@/src/shared/table/pagination";

export const useSuppliers = (pagination: PaginationState, filters: SupplierFilters, enabled: boolean = true) => {

    const setFetchStatus = useStore(v => v.setFetchStatus);

    const { data, isError, isFetching } = useQuery({

        queryKey: QUERY_KEYS.suppliers.list(pagination, filters),
        queryFn: () => getSuppliers(pagination, filters),
        staleTime: 60 * 1000,
        refetchOnWindowFocus: true,
        placeholderData: keepPreviousData,
        enabled
    });

    useDelayedFetchState({
        isFetching, 
        errorMsg: isError || (typeof data?.ok==="boolean" && !data.ok),
         setState: setFetchStatus, delay: 1000,
    });


    return {
        suppliers: data?.data?.suppliers ?? [],
        meta:data?.data?.meta,
        isFetching, isError
    }
}
import { PaginationState } from "@/src/shared/table/pagination";
import { ProductFilters } from "../../types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { useDelayedFetchState } from "@/src/shared/hooks";
import { useStore } from "@/src/store/useStore";
import { getProducts } from "@/src/action/product";

export const useProducts = (pag: PaginationState, fil: ProductFilters) => {

    const setFetchStatus = useStore(v => v.setFetchStatus);


    const { data, isFetching, isError } = useQuery({
        queryKey: QUERY_KEYS.products.list(pag, fil),
        queryFn: () => getProducts(pag, fil),
        staleTime: 60 * 1000,
        refetchOnWindowFocus: true,
        placeholderData: keepPreviousData,
    });

    useDelayedFetchState({
        isFetching,
        errorMsg: isError || (typeof data?.ok==="boolean" && !data.ok),
        setState: setFetchStatus,
        delay: 1000
    });

    return {
        products: data?.data?.products ?? [],
        meta: data?.data?.meta
    }

}
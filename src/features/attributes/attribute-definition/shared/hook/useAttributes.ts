import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { getAttrDefinitions } from "@/src/action/attribute";
import { PaginationState } from "@/src/shared/table/pagination";
import { AttributeFilters } from "../../types";
import { useStore } from "@/src/store/useStore";
import { useDelayedFetchState } from "@/src/shared/hooks";

export const useAttributes = (pag: PaginationState, fil: AttributeFilters, enabled?: boolean) => {

    const setFetchStatus = useStore(v => v.setFetchStatus);


    const { data, isError, isFetching } = useQuery({
        queryKey: QUERY_KEYS.attributes.list(pag, fil),
        queryFn: () => getAttrDefinitions(pag, fil),
        staleTime: 60 * 1000,
        refetchOnWindowFocus: true,
        placeholderData: keepPreviousData,
        enabled
    });

    useDelayedFetchState({
        isFetching,
        errorMsg: isError || (typeof data?.ok==="boolean" && !data.ok),
        setState: setFetchStatus,
        delay: 1000,
    });

    return {
        attributes: data?.data?.attributes ?? [],
        meta: data?.data?.meta,
    }
}
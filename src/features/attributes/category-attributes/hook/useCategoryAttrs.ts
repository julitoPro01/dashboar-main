import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { getCategoryAttrs } from "@/src/action/attribute";
import { useStore } from "@/src/store/useStore";
import { useDelayedFetchState } from "@/src/shared/hooks";

import { CategoryAttrFilters, CategoryAttrsResponse } from "../types";
import { PaginationState } from "@/src/shared/table/pagination";

export const useCategoryAttrs = (pag: PaginationState, fil: CategoryAttrFilters) => {


    const setFetchStatus = useStore(v => v.setFetchStatus);

    const { data, isFetching, isError } = useQuery({
        queryKey: QUERY_KEYS.attributes.listCatg(pag, fil),
        queryFn: async () => {
            const res = await getCategoryAttrs(pag, fil);
            // InvalidationReason | undefined
            // { type: "create" | "update" | "add" | "delete" | "refresh", time: number }
            const invalidationReason = useStore.getState().categoryAttrsInvalidationReason;
            
            return {
                ...res,
                actionType: fil.actionType,
                invalidationReason
            }
        },
        select: (res) => {
            if (!res) return null;

            return {
                data: res.data,
                ok: res.ok,
                actionType: res.actionType,
                invalidationReason: res.invalidationReason
            }
        },
        staleTime: 60 * 1000,
        enabled: !!fil.categoryId,
        // refetchOnWindowFocus: true,
        placeholderData: keepPreviousData,
    });

    const queryClient = useQueryClient();
    const updateData = (id: any, columnId: string, value: any) => {
        queryClient.setQueryData(QUERY_KEYS.attributes.listCatg(pag, fil),
            (old: { data: CategoryAttrsResponse }) => {
                if (!old) return old;
                return {
                    ...old,
                    data: {
                        meta: old.data.meta,
                        categoryAttrs: old.data.categoryAttrs.map(item => (item.id === id ? { ...item, [columnId]: value } : item))
                    }
                }
            });
    };

    // Mostramos el estado de carga (UI)
    useDelayedFetchState({
        isFetching,
        errorMsg: isError || (typeof data?.ok === "boolean" && !data.ok),
        setState: setFetchStatus,
        delay: 1000,
    });


    return {
        categoryAttrs: data?.data?.categoryAttrs ?? [],
        meta: data?.data?.meta,
        actionType: data?.actionType ?? "view",
        invalidationReason:data?.invalidationReason,
        updateData
    }
}

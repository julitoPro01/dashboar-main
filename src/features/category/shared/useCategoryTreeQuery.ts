"use client"
import { useQuery } from "@tanstack/react-query";
import { getCategoryTrees } from "@/src/action/category";
import { useEffect } from "react";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { useLoadingWithDelay } from "@/src/shared/hooks";
import { ToastError } from "@/src/shared/components/toaster";
import { errorMessages } from "@/src/shared/messages";
import { RecordStatusDb } from "@/src/shared/domains/status";

interface Props {
    notInStatus?: RecordStatusDb[];
    inStatus?: RecordStatusDb[];
}
export const useCategoryTreeQuery = (filter: Props, enabled: boolean = true) => {

    const { isPending, isError, data } = useQuery({
        queryKey: QUERY_KEYS.categories.listTree(),
        queryFn: () => getCategoryTrees(filter),
        staleTime: 60 * 1000,
        enabled
    })

    const fetchStatus = useLoadingWithDelay({
        isFetching: isPending,
        errorMsg: isError || data?.ok === false
    })

    useEffect(() => {

        if (fetchStatus.status === "error") {
            const msg = errorMessages.initState;
            ToastError({
                title: msg.title,
                description: msg.description,
                activeBtnClose: true
            }, { duration: Infinity })
        }

    }, [fetchStatus.status])


    return {
        ...fetchStatus,
        data: data?.data ?? []
    };
} 

"use client"
import { useQuery } from "@tanstack/react-query";
import { searchCategoryTrees } from "@/src/action/category";
import { useEffect } from "react";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { useDelayedLoading } from "@/src/shared/hooks";
import { ToastError } from "@/src/shared/components/toaster";
import { errorMessages } from "@/src/shared/messages";
import { SearchCategoryTreeFilters } from "../../types";


export const useSearchCategoryTrees = (filters: SearchCategoryTreeFilters = {}, enabled: boolean = true) => {


    const { isFetching, data } = useQuery({
        queryKey: QUERY_KEYS.categories.listTree(filters),
        queryFn: () => searchCategoryTrees(filters),
        staleTime: 60 * 1000,
        enabled
    })

    const isLoading = useDelayedLoading({ isFetching })

    useEffect(() => {

        if (data && !data?.ok) {
            const msg = errorMessages.initState;

            ToastError({
                title: msg.title,
                description: msg.description,
                activeBtnClose: true
            }, { duration: Infinity })
        }

    }, [data])


    return {
        isLoading,
        data: data?.ok ? data.data : []
    };
} 

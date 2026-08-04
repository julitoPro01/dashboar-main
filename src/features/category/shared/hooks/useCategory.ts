import { getCategory } from "@/src/action/category"
import { ToastError } from "@/src/shared/components/toaster";
import { useDelayedLoading } from "@/src/shared/hooks";
import { getErrorMessage } from "@/src/shared/messages";
import { QUERY_KEYS } from "@/src/shared/react-query"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from 'react';

export const useCategory = (id?: number) => {

    const { data, isFetching } = useQuery({
        queryKey: QUERY_KEYS.categories.edit(id),
        queryFn: () => getCategory({ id: id ?? 0 }),

        enabled: !!id,
        staleTime: 60 * 1000,
        gcTime: 2 * 60 * 1000
    });

    const isLoading = useDelayedLoading({
        isFetching, minLoadingTime: 1000,
    })


    useEffect(() => {

        if (data && !data.ok) {
            const msg = getErrorMessage(data.errorType)
            ToastError({
                title: msg.title,
                description: msg.description,
                activeBtnClose: true
            }, { duration: 10000 })
        }

    }, [data?.ok])


    return {
        data,
        isLoading
    }
}
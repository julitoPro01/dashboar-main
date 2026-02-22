"use client";
import { LoadingBar, ToastError } from "@/src/components/ui";
import { errorMessages } from "@/src/constants";
import { useStore } from "@/src/store/useStore";
import { useEffect } from "react";

export const LoadingSupplier = () => {

    const loadingState = useStore(v => v.loadingSupplierState);

    useEffect(() => {

        if (loadingState === "error")
            ToastError({
                title: errorMessages.loading.title,
                description: errorMessages.loading.description,
                activeBtnClose:true
            }, { duration: Infinity })

    }, [loadingState])


    return (
        <LoadingBar loading={loadingState === "loading"} />
    )
}

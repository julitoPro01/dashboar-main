"use client";

import { LoadingBar } from "@/src/shared/components/loading";
import { ToastError } from "@/src/shared/components/toaster";
import { errorMessages } from "@/src/shared/messages";
import { useStore } from "@/src/store/useStore";
import { useEffect } from "react";

export const FetchingStatus = () => {

    const fetchStatus = useStore(v => v.fetchStatus);

    const { status, titleMsg, descMsg } = fetchStatus;

    useEffect(() => {

        if (status === "error")
            ToastError({
                title: titleMsg ?? errorMessages.loading.title,
                description: descMsg ?? errorMessages.loading.description,
                activeBtnClose: true
            }, { duration: Infinity })

    }, [status]);


    return (
        <LoadingBar loading={status === "loading"} />
    )
}

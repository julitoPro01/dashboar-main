"use client"
import { createVariant } from "@/src/action/variant";
import { TOAST_STYLE, ToastError } from "@/src/shared/components/toaster";
import { errorMessages, getErrorMessage, successMessage } from "@/src/shared/messages";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { sleep } from "@/src/shared/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useCreateVariant = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createVariant,
        async onSettled() {
            await sleep(1000);
        },
        onSuccess(res) {
            if (res.ok) {

                // Invalidamos la ruta base
                queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products.all });

                const { description } = successMessage.create("variante");

                toast.success(description,{style:TOAST_STYLE.success})
            }
            else {
                const { title, description } = getErrorMessage(res.errorType);
                ToastError({
                    title, description, activeBtnClose: true
                }, { duration: 10000 })
            }
        },
        onError() {
            const { title, description } = errorMessages.server;
            ToastError({
                title, description, activeBtnClose: true
            }, { duration: 10000 })
        }
    })

}
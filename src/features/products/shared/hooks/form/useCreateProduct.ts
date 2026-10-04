"use client"
import { createProduct } from "@/src/action/product";
import { ToastError, ToastSuccess } from "@/src/shared/components/toaster";
import { errorMessages, getErrorMessage, successMessage } from "@/src/shared/messages";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { APP_ROUTES } from "@/src/shared/routes";
import { sleep } from "@/src/shared/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateProduct = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProduct,
        async onSettled() {
            await sleep(1000);
        },
        onSuccess(res) {
            if (res.ok) {

                queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products.all });

                const { title, description } = successMessage.create("producto");
                ToastSuccess({
                    title, description, activeBtnClose: true,
                    link: {
                        title: "Ver detalles",
                        href: APP_ROUTES.PRODUCTS.VIEW(res.data.publicId)
                    }
                })
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
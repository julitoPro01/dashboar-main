"use client";

import { updateVariant } from "@/src/action/variant";
import { TOAST_STYLE, ToastError } from "@/src/shared/components/toaster";
import { errorMessages, getErrorMessage } from "@/src/shared/messages";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { sleep } from "@/src/shared/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateVariant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateVariant,
        async onSettled() {
            await sleep(500);
        },
        onSuccess(result, payload) {
            if (result.ok) {
                
                
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.products.editVariantForm(payload.id),
                });

                toast.success(result.msg, { style: TOAST_STYLE.success });
                return;
            }

            const { title, description } = getErrorMessage(result.errorType);
            ToastError({
                title,
                description: result.msg || description,
                activeBtnClose: true,
            }, { duration: 10_000 });
        },
        onError() {
            const { title, description } = errorMessages.server;
            ToastError({ title, description, activeBtnClose: true }, { duration: 10_000 });
        },
    });
};

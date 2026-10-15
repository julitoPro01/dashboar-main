import { updateBasicInformation } from "@/src/action/product";
import { TOAST_STYLE, ToastError, ToastSuccess } from "@/src/shared/components/toaster";
import { errorMessages, getErrorMessage } from "@/src/shared/messages";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { sleep } from "@/src/shared/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useUpdateBasicInfo = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateBasicInformation,
        async onSettled() {
            await sleep(1000);
        },
        onSuccess(res) {
            if (res.ok) {

                queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products.all });

                toast.success("Producto actualizado", { style: TOAST_STYLE.success })

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
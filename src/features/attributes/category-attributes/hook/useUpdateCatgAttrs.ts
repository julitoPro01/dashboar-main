import { updateCategoryAttrs } from "@/src/action/attribute"
import { TOAST_STYLE, ToastError } from "@/src/shared/components/toaster";
import { errorMessages, getErrorMessage } from "@/src/shared/messages";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { sleep } from "@/src/shared/utils";
import { useStore } from "@/src/store/useStore";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useUpdateCatgAttrs = () => {

    const queryClient = useQueryClient();
    const setInvalidationReason = useStore(v => v.setCategoryAttrsInvalidationReason);


    return useMutation({
        mutationFn: updateCategoryAttrs,
        async onSettled() { await sleep(1000) },
        onSuccess: (res) => {
            if (res.ok) {
                queryClient.invalidateQueries({ queryKey: QUERY_KEYS.attributes.listCatg({}, {}) });

                setInvalidationReason({
                    time: Date.now(),
                    type: "update"
                })

                toast.success("Los valores se han actualizado correctamente", { style: TOAST_STYLE.success })
            } else {
                const { title, description } = getErrorMessage(res.errorType);
                ToastError({
                    title,
                    description,
                    activeBtnClose: true
                }, { duration: 10000 })
            }
        },
        onError() {
            const { title, description } = errorMessages.generic;
            ToastError({
                title,
                description,
                activeBtnClose: true
            }, { duration: 10000 })
        }
    })

}
import { delCategoryAttrs } from "@/src/action/attribute";
import { TOAST_STYLE, ToastError } from "@/src/shared/components/toaster";
import { errorMessages, getErrorMessage } from "@/src/shared/messages";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { sleep } from "@/src/shared/utils";
import { useStore } from "@/src/store/useStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteCatgAttrs = () => {

    const queryClient = useQueryClient()
    const setInvalidationReason = useStore(v => v.setCategoryAttrsInvalidationReason);

    //---------------
    return useMutation({
        mutationFn: delCategoryAttrs,
        async onSettled() { await sleep(1000) },
        onSuccess: (res) => {
            if (res.ok) {
                queryClient.invalidateQueries({ queryKey: QUERY_KEYS.attributes.listCatg({}, {}) });


                setInvalidationReason({
                    time: Date.now(),
                    type: "delete"
                })

                toast.success("Eliminados correctamente", { style: TOAST_STYLE.success })
            } else {
                
                if(res.errorCode ==="ENTITY_IN_USE") return;

                const msg = getErrorMessage(res.errorType);
                ToastError({
                    title: msg.title,
                    description: msg.description,
                    activeBtnClose: true
                }, { duration: 10000 })
            }
        },
        onError() {
            const msg = errorMessages.generic;
            ToastError({
                title: msg.title,
                description: msg.description,
                activeBtnClose: true
            }, { duration: Infinity })
        }
    })

}
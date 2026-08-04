import { delAttrDefinition } from "@/src/action/attribute";
import { TOAST_STYLE, ToastError } from "@/src/shared/components/toaster";
import { getErrorMessage, successMessage } from "@/src/shared/messages";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { ApiEntityInUseData, sleep } from "@/src/shared/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export const useDeleteAttribute = () => {

    const queryClient = useQueryClient();

    const [entitiesInUse, setEntitiesInUse] = useState<ApiEntityInUseData[]>([]);

    const mutation = useMutation({
        mutationFn: delAttrDefinition,
        async onSettled() {
            await sleep(1000)
        },
        onSuccess(res) {
            if (res.ok) {
                queryClient.invalidateQueries({ queryKey: QUERY_KEYS.attributes.list({}, {}) });
                toast.success(successMessage.deleted("atributo").description, { style: TOAST_STYLE.success })
            } else {
                if (res.errorCode === "ENTITY_IN_USE")
                    setEntitiesInUse(res.data ?? [])
                else {
                    const { title, description } = getErrorMessage(res.errorType);
                    ToastError({ title, description, activeBtnClose: true }, { duration: 5000 });
                }
            }
        }
    })

    return {
        ...mutation,
        entitiesInUse,
    }
}
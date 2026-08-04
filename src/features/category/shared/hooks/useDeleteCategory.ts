import { deleteCategory } from "@/src/action/category";
import { TOAST_STYLE, ToastError } from "@/src/shared/components/toaster";
import { getErrorMessage, successMessage } from "@/src/shared/messages";
import { ApiEntityInUseData, sleep } from "@/src/shared/utils";
import { useMutation } from "@tanstack/react-query"
import { useState } from "react";
import { useRemoveSubCategory } from "./query-cache/useRemoveSubCategory";
import { toast } from "sonner";

export const useDeleteCategory = (mainPath: string="", id: number) => {

    const [entitiesInUse, setEntitiesInUse] = useState<ApiEntityInUseData[]>([]);

    const removeCache = useRemoveSubCategory(mainPath)

    const mutation = useMutation({
        mutationFn: deleteCategory,
        onSuccess(res) {
            if (res.ok) {
                
                removeCache(id)
                toast.success(successMessage.deleted("categoría").description, { style: TOAST_STYLE.success })

            } else {
                if (res.errorCode === "ENTITY_IN_USE") {
                    setEntitiesInUse(res.data ?? [])
                }
                else {
                    const { title, description } = getErrorMessage(res.errorType);
                    ToastError({ title, description, activeBtnClose: true }, { duration: 5000 });
                }

            }
        },
        async onSettled() {
            await sleep(1000);
        }
    })

    return {
        ...mutation,
        entitiesInUse
    }
}

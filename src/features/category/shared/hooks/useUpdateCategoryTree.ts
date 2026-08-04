import { updateCategory } from "@/src/action/category";
import { TOAST_STYLE, ToastError } from "@/src/shared/components/toaster";
import { getErrorMessage, successMessage } from "@/src/shared/messages";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";
import { useStore } from "@/src/store/useStore";
import { useEditSubCategory } from "./query-cache/useEditSubCategory";
import { sleep } from "@/src/shared/utils";

export const useUpdateCategoryTree = (id: number=0, isParentRoot: boolean) => {

    const queryClient = useQueryClient();

    const main = useStore(v => v.selectedMainCategory);
    const setMain = useStore(v => v.setSelectMainCategory);

    const editCache = useEditSubCategory(main?.path ?? "")


    return useMutation({
        mutationFn: updateCategory,
        onSettled: async () => await sleep(1000),
        onSuccess(res) {
            if (res.ok) {

                // invalidamos el cache EDIT
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.categories.edit(id)
                })

                if (isParentRoot) {
                    setMain({
                        ...main!,
                        name: res.data.name,
                        recordStatus: res.data.recordStatus.name,
                        sync: "update"
                    })
                } 
                
                if (res.data.recordStatus.name === "ARCHIVED" || res.data.recordStatus.name === "DELETED") {
                    queryClient.invalidateQueries({
                        queryKey: QUERY_KEYS.categories.listTree({})
                    })
                }
                else {
                    editCache(id, {
                        name: res.data.name,
                        recordStatus: res.data.recordStatus
                    })
                }

                toast.success(successMessage.updated("Categoría").description, { style: TOAST_STYLE.success })


            } else {

                const msg = getErrorMessage(res.errorType);
                ToastError({
                    title: msg.title,
                    description: msg.description,
                    activeBtnClose: true
                }, { duration: 10000 })
            }
        }
    })

}
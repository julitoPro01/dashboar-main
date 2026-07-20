import { updateCategory, UpdateCategory } from "@/src/action/category";
import { TOAST_STYLE } from "@/src/shared/components/toaster";
import { errorMessages, successMessage } from "@/src/shared/messages";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useSubCategoryCache } from "./useSubCategoryCache";
import { useStore } from "@/src/store/useStore";

export const useUpdateSub = (id: number, isParent: boolean) => {

    const user = useSession().data?.user

    const queryClient = useQueryClient();

    const mainPath = useStore(v => v.selectedMainCategory?.path) ?? "";

    const setMainChanges = useStore(v => v.setMainCategoryChanges);

    const { updateSubCategoryCache, invalidateQueryList } = useSubCategoryCache(mainPath);

    const invalidateQueryEdit = () => queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.categories.edit(id)
    })

    const update = async (values: UpdateCategory, call: () => void) => {
        if (!user) return;

        const res = await updateCategory(id, values, { updateBy: user.name, updateById: +user.id })
        if (res.ok) {
            const val = res.data!;

            if (val.recordStatus?.name === "ARCHIVED" || val.recordStatus?.name === "DELETED")
                invalidateQueryList()


            if (isParent) {
                // Actualizamos la raiz
                setMainChanges({
                    type: "update",
                    values: {
                        id: val.id,
                        name: val.name,
                        recordStatus: val.recordStatus.name
                    }
                })
            }
            else { // los hijos
                // Actualizamos el arbol de categorías en cache
                updateSubCategoryCache(id, {
                    name: res.data!.name,
                    recordStatus: res.data!.recordStatus
                })
            }
            // Invalidamos el cache 
            invalidateQueryEdit()
            // Cerramos el panel flotante
            useStore.getState().setFloatingPanel({ open: false, type: null })
            // Mostramos la notificación
            toast.success(successMessage.updated("Categoría").description, { style: TOAST_STYLE.success })
            call()
        } else {
            toast.error(errorMessages.generic.description, { style: TOAST_STYLE.error })
        }
    }


    return update
}
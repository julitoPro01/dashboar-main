import { addCategory } from "@/src/action/category";
import { ToastError } from "@/src/shared/components/toaster/ToastError";
import { ToastSuccess } from "@/src/shared/components/toaster/ToastSuccess";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { createSlug } from "@/src/shared/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

interface CreateData {
    level: number;
    path: string;
    parentId: number;
    createdBy: string;
    createdById: number;
}

export const useSubCategoryCreateForm = (mainCategoryPath: string) => {

    const { setValue, getValues, register } = useForm<{ name: string }>();
    const queryClient = useQueryClient();

    const createCategoryMutation = useMutation({
        mutationFn: addCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.categories.listTree(mainCategoryPath),
            })
        }
    });


    const onCreate = (data: CreateData, call?: (ok: boolean) => void) => {

        const name = getValues("name").trim();

        createCategoryMutation.mutate({
            name,
            slug: createSlug(name),
            parentId: data.parentId,
            level: data.level + 1,
            path: data.path,
            createdBy: data.createdBy,
            createdById: data.createdById
        }, {
            onSuccess: (res) => {
                if (res.ok) {

                    toastSuccess();
                    setValue("name", "");
                    if (call) call(true);
                } else {

                    if (res.code === 400)
                        toastError(res.msg);
                    else
                        toastError();

                    if (call) call(false);
                }
            }
        });
    }

    return {
        register: register("name"),
        onCreate,
        nameValue: () => getValues("name")
    }
}

const toastSuccess = () => {
    const title = "Nueva categoría agregada"

    ToastSuccess({
        title: title,
        activeBtnClose: true,
    }, { duration: 10000 });
}

const toastError = (msgDesc: string = "") => {

    ToastError({
        title: "Error al agregar",// "Error al agregar",
        description: msgDesc ?? "No fue posible crear la categoría.",// "No se pudo conectar al servidor.",
        activeBtnClose: true,
    }, { duration: Infinity });

}
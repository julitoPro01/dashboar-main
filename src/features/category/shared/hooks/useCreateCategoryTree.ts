import { createCategory } from "@/src/action/category";
import { TOAST_STYLE } from "@/src/shared/components/toaster";
import { ToastError } from "@/src/shared/components/toaster/ToastError";
import { errorMessages, getErrorMessage } from "@/src/shared/messages";
import { sleep } from "@/src/shared/utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEditSubCategory } from "./query-cache/useEditSubCategory";


export const useCreateCategoryTree = (mainCategoryPath: string,id:number) => {


    const updateCache = useEditSubCategory(mainCategoryPath);

    return useMutation({
        // 1. Simplifica la función, deja que React Query maneje la promesa
        mutationFn: createCategory,

        // 2. Usamos onSettled para apagar estados o simular retrasos siempre (éxito o fallo)
        onSettled: async () => {
            await sleep(1000); // Tu delay de 1 segundo
        },

        // 3. Manejo del resultado del servidor
        onSuccess: async (res) => {
            if (res.ok) {

                const data = res.data;
                // console.log(data)
                updateCache(id, {
                    id: data.id,
                    name:data.name,
                    publicId: data.publicId,
                    level: data.level,
                    path: data.path,

                    isCreating: false,
                });

                toast.success("Nueva categoría agregada", { style: TOAST_STYLE.success })
                
            } else {
                const msg = getErrorMessage(res.errorType);
                ToastError(
                    { title: msg.title, description: msg.description, activeBtnClose: true },
                    { duration: 5000 }
                );
            }
        },

        // 4. Protección por si el servidor da un error de red (HTTP 500, 404, etc.)
        onError: () => {
            ToastError({
                title: errorMessages.generic.title,
                description: errorMessages.generic.description,
                activeBtnClose: true
            }, { duration: Infinity });
        }
    });

}
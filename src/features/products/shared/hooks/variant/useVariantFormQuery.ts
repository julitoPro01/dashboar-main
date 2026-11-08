import { getVariantForm } from "@/src/action/variant"
import { ToastError } from "@/src/shared/components/toaster"
import { getErrorMessage } from "@/src/shared/messages"
import { QUERY_KEYS } from "@/src/shared/react-query"
import { useQuery } from "@tanstack/react-query"

export const useVariantFormQuery = (variantId: number) => {
    return useQuery({
        queryKey: QUERY_KEYS.products.editVariantForm(variantId),
        // El query solo se activa si tenemos un ID válido
        enabled: !!variantId && variantId !== 0,

        async queryFn() {
            const res = await getVariantForm({ variantId });

            if (!res.ok) {
                const { title, description } = getErrorMessage(res.errorType);
                ToastError({ title, description, activeBtnClose: true }, { duration: Infinity });
            }

            // Retornamos los datos que irán directo al formulario
            return res;
        },
        staleTime: 0,
        gcTime: 1*60 * 1000,
        refetchOnMount: 'always',
        refetchOnWindowFocus: false,
    });
};

import { CategoryAttributesPayload, getCategoryAttributes } from "@/src/action/product";
import { ToastError } from "@/src/shared/components/toaster";
import { getErrorMessage } from "@/src/shared/messages";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { useQuery } from "@tanstack/react-query";

export const useCategoryAttributes = (params: CategoryAttributesPayload) => {

    const query = useQuery({
        queryKey: QUERY_KEYS.products.categoryAttributes(Object.values(params)),
        queryFn: async () => {
            const response = await getCategoryAttributes(params);

            if (!response.ok) {
                const { title, description } = getErrorMessage(response.errorType);
                ToastError({
                    title, description, activeBtnClose: true
                }, { duration: Infinity })
            }
            return response.data ?? [];
        },
        enabled: false
    });

    const getAttributes = async () => {
        const { data } = await query.refetch();

        return data ?? [];
    };

    return {
        getAttributes
    };
};
import { SystemAttributesPayload, getSystemAttributes } from "@/src/action/product";
import { ToastError } from "@/src/shared/components/toaster";
import { getErrorMessage } from "@/src/shared/messages";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { useQuery } from "@tanstack/react-query";

export const useSystemAttributes = (params: SystemAttributesPayload, enabled: boolean = false) => {

    const query = useQuery({
        queryKey: QUERY_KEYS.products.categoryAttributes(Object.values(params)),
        queryFn: async () => {

            const response = await getSystemAttributes(params);
            if (!response.ok) {

                const { title, description } = getErrorMessage(response.errorType);

                ToastError({
                    title, description, activeBtnClose: true
                }, { duration: Infinity })
            }
            return response.data ?? [];
        },
        enabled: enabled
    });

    const getAttributes = async () => {
        const { data } = await query.refetch();

        return data ?? [];
    };

    return {
        getAttributes,
        data: enabled ? query.data : []
    };
};
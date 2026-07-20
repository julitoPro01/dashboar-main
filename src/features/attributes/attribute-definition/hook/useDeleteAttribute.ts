import { delAttrDefinition } from "@/src/action/attribute";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteAttribute = () => {

    const queryClient = useQueryClient();

    const invalidateList = () =>
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.attributes.list({}, {}) });

    return useMutation({
        mutationFn: delAttrDefinition,
        onSuccess(res) {
            if (res.ok)
                invalidateList();
        }
    })
}
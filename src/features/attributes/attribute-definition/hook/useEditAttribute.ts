import { editAttrDefinition} from "@/src/action/attribute";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useEditAttribute = () => {
    const queryClient = useQueryClient();

    const invalidateList = () =>
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.attributes.list({}, {}) });

    return useMutation({
        mutationFn: editAttrDefinition,
        onSuccess: val => {
            if (val.ok)
                invalidateList()
        }
    })
}

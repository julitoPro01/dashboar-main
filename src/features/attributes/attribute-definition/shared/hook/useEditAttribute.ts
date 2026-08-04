import { editAttrDefinition } from "@/src/action/attribute";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { sleep } from "@/src/shared/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useEditAttribute = () => {
    const queryClient = useQueryClient();

    const invalidateList = () =>
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.attributes.list({}, {}) });

    return useMutation({
        mutationFn: editAttrDefinition,
        async onSettled() {
            await sleep(1000)
        },
        onSuccess: val => {
            if (val.ok)
                invalidateList()
        }
    })
}

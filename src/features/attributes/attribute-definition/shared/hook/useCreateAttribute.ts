import { addAttrDefinition } from "@/src/action/attribute";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { sleep } from "@/src/shared/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateAttribute = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addAttrDefinition,
        async onSettled(){
            await sleep(1000)
        },
        onSuccess: (res) => {
            if (res.ok)
                queryClient.invalidateQueries({ queryKey: QUERY_KEYS.attributes.all });
        }
    });
}
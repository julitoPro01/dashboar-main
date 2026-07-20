import { addAttrDefinition } from "@/src/action/attribute";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateAttribute = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addAttrDefinition,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: QUERY_KEYS.attributes.all }); }
    });
}
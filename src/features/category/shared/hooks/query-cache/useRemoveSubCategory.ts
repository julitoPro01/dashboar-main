import { QUERY_KEYS } from "@/src/shared/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { removeCategory } from "../../utils";

export const useRemoveSubCategory = (mainCategoryPath: string) => {

    const queryClient = useQueryClient();


    return (id: number) => queryClient.setQueryData(
        QUERY_KEYS.categories.listTree({ path: mainCategoryPath }),
        (oldData: any) => {
            if (!oldData) return oldData;
            return {
                ...oldData,
                data: removeCategory(oldData.data, id)
            };
        }
    );

};
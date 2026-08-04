import { QUERY_KEYS } from "@/src/shared/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { updateCategoryTree } from "../../utils";
import { CategoryTreeNode } from "../../../types";


export const useEditSubCategory = (mainCategoryPath: string) => {
    const queryClient = useQueryClient();


    return (id: number, value: Partial<CategoryTreeNode>) => queryClient.setQueryData(
        QUERY_KEYS.categories.listTree({path:mainCategoryPath}),
        (oldData: any) => {
            if (!oldData) return oldData;
            return {
                ...oldData,
                data: updateCategoryTree(oldData.data, id, value)
            }
        }
    )
}


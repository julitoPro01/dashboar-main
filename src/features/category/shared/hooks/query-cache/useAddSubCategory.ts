import { QUERY_KEYS } from "@/src/shared/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { CategoryTreeResponse } from "../../../types";
import { newSubCategory } from "../../utils";

type Add = {
    parentId: number,
    data: {
        id: number;
        name: string;
        level: number;
        path: string;
        publicId: string;
    },
    isCreating?: boolean,
}

export const useAddSubCategory = (mainCategoryPath: string) => {
    const queryClient = useQueryClient();

    return ({ parentId, data, isCreating }: Add) => queryClient.setQueryData(
        QUERY_KEYS.categories.listTree({ path: mainCategoryPath }),
        (oldData: { data: CategoryTreeResponse[] }) => {

            if (!oldData) return oldData;
            return {
                ...oldData,
                data: newSubCategory(
                    oldData.data,
                    parentId,
                    {
                        id: data.id,
                        name: data.name,
                        publicId: data.publicId,
                        parentId,
                        recordStatus: { name: "DRAFT" },
                        children: [],
                        level: data.level,
                        path: data.path,
                        _count: { categoryAttributes: 0 },
                        ...(isCreating && { isCreating: true })
                    }
                )
            };

        }
    );

};

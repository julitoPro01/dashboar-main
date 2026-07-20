import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useStore } from "@/src/store/useStore";
import { useShallow } from "zustand/react/shallow";
import { QUERY_KEYS } from "@/src/shared/react-query";
import { newSubCategory, removeCategory, updateCategoryTree } from "../../../utils";
import { CategoryTreeResponse } from "../../../shared/categoryTree.api.type";
import { CategoryTreeNode } from "../../../shared/category.type";



export const useSubCategoryCache = (mainCategoryPath: string) => {

    const queryClient = useQueryClient();

    const invalidateQueryList = () => queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.categories.listTree(mainCategoryPath)
    })

    const {
        setSelectMainCategory,
        setMainChanges, mainDeleteId, mainUpdate,
    } = useStore(useShallow(v => ({
        setSelectMainCategory: v.setSelectMainCategory,

        setMainChanges: v.setMainCategoryChanges,
        mainDeleteId: v.mainCategoryChanges.lastDeleteId,
        mainUpdate: v.mainCategoryChanges.lastUpdate,

    })));

    const deleteSubCategoryCache = (id: number) => {
        queryClient.setQueryData(
            QUERY_KEYS.categories.listTree(mainCategoryPath),
            (oldData: any) => {

                if (!oldData) return oldData;
                return {
                    ...oldData,
                    data: removeCategory(oldData.data, id)
                };
            }
        );

    };

    const addSubCategoryCache = (
        parentId: number,
        data: {
            id: number;
            name: string;
            level: number;
            path: string;
            publicId: string;
        },
        isCreating?: boolean
    ) => {
        queryClient.setQueryData(
            QUERY_KEYS.categories.listTree(mainCategoryPath),
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


    const updateSubCategoryCache = (id: number, value: Partial<CategoryTreeNode>) => {

            queryClient.setQueryData(
                QUERY_KEYS.categories.listTree(mainCategoryPath),
                (oldData: any) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        data: updateCategoryTree(oldData.data, id, value)
                    }
                }
            )
    }


    // Eliminamos la categoría raiz
    useEffect(() => {
        if (mainDeleteId) {
            queryClient.removeQueries({
                queryKey: QUERY_KEYS.categories.listTree(mainCategoryPath),
            });
            setSelectMainCategory();
            setMainChanges({ type: "delete", id: 0 });
        }
    }, [mainDeleteId]);


    return {
        deleteSubCategoryCache,
        addSubCategoryCache,
        updateSubCategoryCache,
        invalidateQueryList
    };

};
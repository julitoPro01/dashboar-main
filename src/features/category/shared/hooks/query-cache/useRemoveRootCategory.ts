import { QUERY_KEYS } from "@/src/shared/react-query";
import { useStore } from "@/src/store/useStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useShallow } from 'zustand/react/shallow';

//TODO: Test
export const useRemoveRootCategory = (mainCategoryPath: string) => {

    const {
        setSelectMainCategory,
        setMainChanges,
        mainDeleteId,
    } = useStore(useShallow(v => ({
        setSelectMainCategory: v.setSelectMainCategory,
        setMainChanges: v.setMainCategoryChanges,
        mainDeleteId: v.mainCategoryChanges.lastDeleteId
    })));

    const queryClient = useQueryClient();

    useEffect(() => {
        if (mainDeleteId) {
            queryClient.removeQueries({
                queryKey: QUERY_KEYS.categories.listTree({ path: mainCategoryPath }),
            });
            setSelectMainCategory();
            setMainChanges({ type: "delete", id: 0 });
        }
    }, [mainDeleteId]);

}
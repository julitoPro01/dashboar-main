import { useEffect } from "react";
import { type CategoryResponse } from "../../../types";
import { useStore } from "@/src/store/useStore";

export const useRefreshSelectedMain = (mainCategories: CategoryResponse[]) => {

    const selected = useStore(v => v.selectedMainCategory);
    const setSelect = useStore(v => v.setSelectMainCategory);

    useEffect(() => {

        if (selected) {

            const find = mainCategories.find(v => v.id === selected.id);
            if (find) {
                setSelect({
                    ...selected,
                    hasChildren: find.hasChildren,
                    hasAttributes: find.hasAttributes,
                    recordStatus:find.recordStatus
                })
            }
        }

    }, [mainCategories])


}
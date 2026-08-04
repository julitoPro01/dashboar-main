import { QUERY_KEYS } from "@/src/shared/react-query";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useStore } from "@/src/store/useStore";
import { useQueryClient } from "@tanstack/react-query";
import { ApiSuccessReturn } from "@/src/shared/utils";
import { CATEGORY_ATTR_NORMALIZE_PAGINATION, CATEGORY_ATTR_SORTBY_ACCEPT_ONLY } from "../constants/filters";
import { CategoryAttrResponse, CategoryAttrsResponse } from "../types";
import { getPaginationParams, parsePaginationParams } from "@/src/shared/table/pagination";

export const useSortableQuery = () => {

    const clientQuery = useQueryClient();

    const handleDragEnd = (event: DragEndEvent) => {
        const filter = useStore.getState().categoryAttrFilters;
        const { active, over } = event;

        const parse = getPaginationParams(CATEGORY_ATTR_NORMALIZE_PAGINATION);

        clientQuery.setQueryData(
            QUERY_KEYS.attributes.listCatg(parse, filter),
            (oldData: ApiSuccessReturn<CategoryAttrsResponse>) => {

                if (!oldData) return oldData;
                const items = oldData.data?.categoryAttrs ?? [];
                if (!over || active.id === over.id) return oldData;

                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return oldData;
                return {
                    ...oldData,
                    data: {
                        ...oldData.data,
                        categoryAttrs: arrayMove(items, oldIndex, newIndex).map((v, i) => ({ ...v, displayOrder: i+1 }))
                    }
                }
            }
        )
    }

    const undoSortable = (data: CategoryAttrResponse[]) => {
         const search = window.location.search;
        const parse = parsePaginationParams(search, { sortByAcceptOnly: CATEGORY_ATTR_SORTBY_ACCEPT_ONLY, default_sortBy: "order" })
        const filter = useStore.getState().categoryAttrFilters;

        clientQuery.setQueryData(
            QUERY_KEYS.attributes.listCatg(parse, filter),
            (oldData: ApiSuccessReturn<CategoryAttrsResponse>) => {
                 return {
                    ...oldData,
                    data: {
                        ...oldData.data,
                        categoryAttrs: data
                    }
                }
            }
        )
    }

    return { handleDragEnd, undoSortable }
};

import { QUERY_KEYS } from "@/src/shared/react-query";
import { useStore } from "@/src/store/useStore";
import { useQueryClient } from "@tanstack/react-query";
import { ApiSuccessReturn } from "@/src/shared/utils";
import { CATEGORY_ATTR_PAGINATION_OPTIONS, CATEGORY_ATTR_SORTBY_ACCEPT_ONLY } from "../constants/filters";
import { CategoryAttrResponse, CategoryAttrsResponse } from "../types";
import { getPaginationParams, parsePaginationParams } from "@/src/shared/table/pagination";
import { isSortable } from "@dnd-kit/react/sortable";
import { DragEndEvent } from "@dnd-kit/react";

export const useSortableQuery = () => {

    const clientQuery = useQueryClient();

    const handleDragEnd = (event: DragEndEvent) => {
        if (event.canceled) return;

        const { source } = event.operation;

        if (!isSortable(source)) return;

        const filter = useStore.getState().categoryAttrsFilters;
        const parse = getPaginationParams(CATEGORY_ATTR_PAGINATION_OPTIONS);

        clientQuery.setQueryData(
            QUERY_KEYS.attributes.listCatg(parse, filter),
            (oldData: ApiSuccessReturn<CategoryAttrsResponse>) => {

                if (!oldData) return oldData;

                const {
                    initialIndex: oldIndex,
                    index: newIndex
                } = source;

                if (oldIndex === newIndex) return;

                const newValues = [...oldData.data.categoryAttrs];
                const [item] = newValues.splice(oldIndex, 1);
                newValues.splice(newIndex, 0, item)

                return {
                    ...oldData,
                    data: {
                        ...oldData.data,
                        categoryAttrs: newValues.map((v, i) => ({ ...v, displayOrder: i + 1 }))
                    }
                }
            }
        )
    }

    const undoSortable = (data: CategoryAttrResponse[]) => {
        const search = window.location.search;
        const parse = parsePaginationParams(search, { sortByAcceptOnly: CATEGORY_ATTR_SORTBY_ACCEPT_ONLY, default_sortBy: "order" })
        const filter = useStore.getState().categoryAttrsFilters;

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

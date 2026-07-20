"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { parsePaginationParams } from "../../pagination/shared/pagination.utils";
import { toggleSortOrder } from "./toggleSortOrder";
import { withQueryParams } from "@/src/shared/routes";
import { SortByType } from "../../pagination/shared/pagination.type";

export const useSortOrderFilter = ( defSort: SortByType, sortByAcceptOnly: SortByType[] ) => {

    const search = useSearchParams();
    const router = useRouter();

    const parsed = parsePaginationParams(search, { sortByAcceptOnly: sortByAcceptOnly })

    const handleToggle = () => {
        
        const params = toggleSortOrder(parsed.order, defSort, parsed.sortBy);
        const url = withQueryParams("", params, search)

        router.replace(url, { scroll: false })
    }


    return {
        handleToggle,
        sortBy:parsed.sortBy,
        order:parsed.order
    }
}

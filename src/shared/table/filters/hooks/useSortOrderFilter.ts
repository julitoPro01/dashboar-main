"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { withQueryParams } from "@/src/shared/routes";
import { SortByTypeOld } from "../../pagination/types/pagination.old";
import { parsePaginationParamsOld } from "../../pagination/utils";
import { toggleSortOrder } from "../toggleSortOrder";

export const useSortOrderFilter = ( defSort: SortByTypeOld, sortByAcceptOnly: SortByTypeOld[] ) => {

    const search = useSearchParams();
    const router = useRouter();

    const parsed = parsePaginationParamsOld(search, { sortByAcceptOnly: sortByAcceptOnly })

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

import { SortOrderButton, useSortOrderFilter } from "@/src/shared/table/filters";
import { PRODUCT_SORTBY_ACCEPT_ONLY } from "../../../constants/filters";
import { CellTitle } from "@/src/shared/table/core";

const defSortBy = "stock";
export const Stock = () => {

    const { handleToggle, sortBy, order } = useSortOrderFilter(defSortBy, PRODUCT_SORTBY_ACCEPT_ONLY);

    return (
        <>
            <CellTitle title="Stock">
                <SortOrderButton active={sortBy === defSortBy} order={order} onToggle={handleToggle} />
            </CellTitle>
        </>
    )
}

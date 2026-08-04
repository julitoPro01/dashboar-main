import { SortOrderButton, useSortOrderFilter } from "@/src/shared/table/filters"
import { ATTRIBUTE_SORTBY_ACCEPT_ONLY } from "../../../constants/filters";
import { CellTitle } from "@/src/shared/table/core";

const defSortBy = "data_type";
export const DateType = () => {

    const { handleToggle, sortBy, order } = useSortOrderFilter(defSortBy, ATTRIBUTE_SORTBY_ACCEPT_ONLY);

    return (
        <CellTitle title="Tipo de dato" >
            <SortOrderButton active={defSortBy === sortBy} order={order} onToggle={handleToggle} />
        </CellTitle>
    )
}

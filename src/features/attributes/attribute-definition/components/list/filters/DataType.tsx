import { CellTitle, SortOrderButton, useSortOrderFilter } from "@/src/shared/table"
import { ATTRIBUTE_SORTBY_ACCEPT_ONLY } from "../../../constants/filters";

const defSortBy = "data_type";
export const DateType = () => {

    const { handleToggle, sortBy, order } = useSortOrderFilter(defSortBy, ATTRIBUTE_SORTBY_ACCEPT_ONLY);

    return (
        <CellTitle title="Tipo de dato" >
            <SortOrderButton active={defSortBy === sortBy} order={order} onToggle={handleToggle} />
        </CellTitle>
    )
}

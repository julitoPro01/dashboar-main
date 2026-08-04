
import { SearchInput, SortOrderButton, useSearchFilter, useSortOrderFilter } from "@/src/shared/table/filters"
import { useStore } from "@/src/store/useStore"
import { CellTitle } from "@/src/shared/table/core"
import { SORTBY_ACCEPT_ONLY } from "../../constants"

const defSortBy = "name"
export const NameBusiness = () => {

    const { handleToggle, sortBy, order } = useSortOrderFilter(defSortBy, SORTBY_ACCEPT_ONLY);

    return (
        <CellTitle title="Empresa">
            <SortOrderButton active={sortBy === defSortBy} order={order} onToggle={handleToggle} />
            <FilterName />
        </CellTitle>
    )
}


const MIN_SEARCH_CHARS = 3;
const FilterName = () => {

    const filterName = useStore(v => v.supplierFilter.search) || "";

    const setFilter = useStore(v => v.setSupplierFilter);

    const { value, handleClean, handleSearch } = useSearchFilter({
        initValue: filterName,
        onAction: setFilter,
        minSearchChars: MIN_SEARCH_CHARS
    })


    return (
        <SearchInput
            value={value}
            onClear={handleClean}
            onChange={handleSearch}
        />
    )
}
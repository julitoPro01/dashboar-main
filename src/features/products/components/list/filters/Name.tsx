import { CellTitle, SearchInput, SortOrderButton, useSearchFilter, useSortOrderFilter } from "@/src/shared/table";
import { PRODUCT_SORTBY_ACCEPT_ONLY } from "../../../shared/filters.constants";
import { useStore } from "@/src/store/useStore";

export const Name = () => {
    return (
        <CellTitle title="Producto" >
            <SortOrder />
            <Search />
        </CellTitle>
    )
}

const defSortBy = "name"
const SortOrder = () => {

    const { handleToggle, sortBy, order } = useSortOrderFilter(defSortBy, PRODUCT_SORTBY_ACCEPT_ONLY);

    return (
        <SortOrderButton active={sortBy === defSortBy} order={order} onToggle={handleToggle} />
    )
}

const MIN_SEARCH_CHARS = 3;
const Search = () => {
    const filterName = useStore(v => v.productFilters.search) || "";

    const setFilter = useStore(v => v.setProductFilters);

    const { value, handleClean, handleSearch } = useSearchFilter({
        initValue: filterName,
        onAction: setFilter,
        minSearchChars: MIN_SEARCH_CHARS
    })


    return (
        <SearchInput
            placeholder="Nombre, SKU (min. 3)"
            value={value}
            onClear={handleClean}
            onChange={handleSearch}
        />
    )
}
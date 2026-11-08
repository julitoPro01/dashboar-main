import { SearchInput, SortOrderButton, useSearchFilter, useSortOrderFilter } from "@/src/shared/table/filters";
import { useStore } from "@/src/store/useStore";
import { CellTitle } from "@/src/shared/table/core";
import { PRODUCT_SORTBY_ACCEPT_ONLY } from "@/src/features/products/constants";

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

const Search = () => {
    const filterName = useStore(v => v.productFilters.search) || "";

    const setFilter = useStore(v => v.setProductFilters);

    const { value, handleClean, handleSearch } = useSearchFilter({
        initValue: filterName,
        onAction: setFilter,
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
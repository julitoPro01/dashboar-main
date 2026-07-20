import { CellTitle, SearchInput, SortOrderButton, useSortOrderFilter } from "@/src/shared/table"
import { useDebounced } from "@/src/shared/hooks"
import { useState } from "react"
import { useStore } from "@/src/store/useStore"
import { ATTRIBUTE_SORTBY_ACCEPT_ONLY } from "../../../constants/filters";

const defSortBy = "name";
export const Name = () => {

    const {handleToggle,  sortBy, order} = useSortOrderFilter(defSortBy,ATTRIBUTE_SORTBY_ACCEPT_ONLY);

    return (
        <CellTitle title="Atributo">
            <SortOrderButton active={defSortBy=== sortBy} order={order} onToggle={handleToggle} />
            <NameSearch />
        </CellTitle>
    )
}

const MIN_SEARCH_CHARS = 3;
const NameSearch = () => {

    const filterName = useStore(v => v.attributeFilter.search) || "";
    const [name, setName] = useState({ current: filterName, applied: "" });

    const setFilter = useStore(v => v.setAttributeFilter);

    const applySearch = useDebounced({
        onAction: (val) => {
            const search = val.length >= MIN_SEARCH_CHARS ? { search: val } : {};
            const del: any = val.length < MIN_SEARCH_CHARS ? { search: true } : undefined;

            setFilter(search, del)
        }
    })

    const handleSearch = (value: string) => {

        const isOk = value.trim().length >= MIN_SEARCH_CHARS;
        setName(v => ({ ...v, current: value, applied: isOk ? value : "" }));

        if (!isOk && !name.applied) return
        if (isOk) applySearch(value)
        else applySearch("")
    }

    const handleClean = () => {
        setName({ current: "", applied: "" });
        setFilter({}, { search: true })
    }



    return (
        <SearchInput value={name.current}
            onClear={handleClean}
            onChange={handleSearch} />
    )
}

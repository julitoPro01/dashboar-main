import { CellTitle } from "@/src/shared/table/core"
import { useDebounced } from "@/src/shared/hooks"
import { useStore } from "@/src/store/useStore"
import { useEffect } from "react"
import { SearchInput } from "@/src/shared/table/filters"
import { useSearch } from "@/src/shared/form"
export const Name = () => {

    return (
        <CellTitle title="Atributo">
            <NameSearch />
        </CellTitle>
    )
}
const NameSearch = () => {

    const filterName = useStore(v => v.categoryAttrsFilters) || "";
    const actionType = useStore(v => v.categoryAttrsFilters.actionType);

    const setFilter = useStore(v => v.setCategoryAttrsFilters);

    const { name, isApplied, cleanValues, handleChange } = useSearch({
        initName: "",
        minSearchChars: 3,
        onApply: (value, isMinChars) => {
            if (isMinChars)
                applySearch({ value, actionType })
        }
    })

    const applySearch = useDebounced({
        onAction: ({ value, actionType }) => {

            const obj: Record<any, any> = {
                view: (value: string) => ({
                    search: value ? { searchView: value } : {},
                    del: !value ? { searchView: true } : undefined
                }),
                assign: (value: string) => ({
                    search: value ? { searchAssign: value } : {},
                    del: !value ? { searchAssign: true } : undefined
                }),
                edit: (value: string) => ({
                    search: value ? { searchEdit: value } : {},
                    del: !value ? { searchEdit: true } : undefined
                }),
            }
            setFilter((fil) => ({
                fil: { ...fil, ...obj[actionType](value).search },
                del: { ...obj[actionType](value).del }
            }))
        }
    })

    const handleClean = () => {
        const obj: Record<any, Record<string, true>> = {
            view: { searchView: true },
            assign: { searchAssign: true },
            edit: { searchEdit: true },
        }
        cleanValues()
        if (isApplied)
            setFilter({ del: { ...obj[actionType] } })
    }

    useEffect(() => {
        const initName = actionType === "view" ? filterName.searchView : actionType === "assign" ? filterName.searchAssign : filterName.searchEdit;
        handleChange(initName ?? "")
    }, [actionType])


    return (
        <SearchInput value={name.current}
            onClear={handleClean}
            onChange={handleChange} />
    )
}


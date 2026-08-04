import { AppliedFilterLabel, OpenFilterButton, SortOrderButton, useMinMaxFilter, useSortOrderFilter } from "@/src/shared/table/filters"
import { FloatingWrapper } from "@/src/shared/components/floating";
import { FormEvent } from "react";
import { FilterInput } from "@/src/shared/form";
import { PRODUCT_SORTBY_ACCEPT_ONLY } from "../../../constants/filters";
import { CellTitle } from "@/src/shared/table/core";

const defSortBy = "price";

export const Price = () => {

    const { handleToggle, order, sortBy } = useSortOrderFilter(defSortBy, PRODUCT_SORTBY_ACCEPT_ONLY);

    const { values, errors, isActive, filter,
        handleCancel, handleChange, handleClean, handleClose, handleOpen
    } = useMinMaxFilter();


    const handleApply = (e: FormEvent) => {
        e.preventDefault();

        console.log(filter)
        handleClose()
    }

    const labels = isActive ? [] : Object.entries(filter).map(([fil, v]) => `${fil}: S/${v}`);

    return (
        <>
            <CellTitle title="Precio">
                <SortOrderButton active={defSortBy === sortBy} order={order} onToggle={handleToggle} />

                <OpenFilterButton
                    active={isActive}
                    onClick={handleOpen}
                />
            </CellTitle>

            {!isActive && labels.length > 0 && <AppliedFilterLabel label={labels.join(" - ")} onClick={() => handleClean()} />}


            <FloatingWrapper open={isActive} onClose={handleCancel} >
                <form onSubmit={handleApply} >

                    <div className="flex px-4 py-3 bg-surface-elevated font-semibold w-60">
                        <button type="button" className=" text-xs text-text-muted hover:text-text" onClick={handleClean}>
                            Limpiar
                        </button>
                        <div className="flex-1"></div>
                        <button type="submit" className="text-xs text-primary hover:text-primary-light hover:dark:text-blue-500 hover:font-semibold">
                            Aplicar filtros
                        </button>
                    </div>

                    {/* Options */}
                    <div className="max-h-60 space-y-2 gap-2 px-5 py-4 text-start">

                        <FilterInput onChange={({ target }) => handleChange("min", target.value)}
                            label="Mínimo S/*"
                            value={values.min}
                            type="number"
                            isError={errors.min}
                        />

                        <FilterInput onChange={({ target }) => handleChange("max", target.value)}
                            label="Máximo S/*"
                            value={values.max}
                            type="number" isError={errors.max} />

                    </div>
                </form>
            </FloatingWrapper>
        </>
    )
}

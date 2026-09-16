import { AppliedFilterLabel, OpenFilterButton, SortOrderButton, useMinMaxFilter, useSortOrderFilter } from "@/src/shared/table/filters"
import { FloatingWrapper } from "@/src/shared/components/floating";
import { FormEvent } from "react";
import { Input } from "@/src/shared/form";
import { PRODUCT_SORTBY_ACCEPT_ONLY } from "../../../constants/filters";
import { CellTitle } from "@/src/shared/table/core";
import { useStore } from "@/src/store/useStore";

const defSortBy = "price";

export const Price = () => {

    const setFilter = useStore(v => v.setProductFilters);


    const { handleToggle, order, sortBy } = useSortOrderFilter(defSortBy, PRODUCT_SORTBY_ACCEPT_ONLY);

    const { values, errors, isActive, filter,
        handleCancel, handleChange, handleClean, handleClose, handleOpen
    } = useMinMaxFilter();


    const handleApply = (e: FormEvent) => {
        e.preventDefault();

        setFilter({
            priceMax: filter.max ? +filter.max : undefined,
            priceMin: filter.min ? +filter.min : undefined
        })
        handleClose()
    }

    const handleReset = () => {
        handleClean();
        setFilter({}, { priceMax: true, priceMin: true })
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

            {!isActive && labels.length > 0 && <AppliedFilterLabel label={labels.join(" - ")}
                onClick={handleReset} />}


            <FloatingWrapper open={isActive} onClose={handleCancel} >
                <form onSubmit={handleApply} >

                    <div className="flex px-4 py-3 bg-surface-elevated font-semibold w-60">
                        <button type="button" className=" text-xs text-text-muted hover:text-text"
                            onClick={handleReset}>
                            Limpiar
                        </button>
                        <div className="flex-1"></div>
                        <button type="submit" className="text-xs text-primary hover:text-primary-light hover:dark:text-blue-500 hover:font-semibold">
                            Aplicar filtros
                        </button>
                    </div>

                    {/* Options */}
                    <div className="max-h-60 space-y-2 p-4 text-start">

                        <span className="text-text-muted font-semibold text-xs tracking-wider">Mínimo</span>
                        <Input fieldClass="ps-7"
                            type="number"
                            fieldSize="sm"
                            placeholder="0.00"
                            value={values.min}
                            error={errors.min}
                            min={0}
                            step="0.01"
                            fieldIcon={"S/"}
                            onChange={({ target }) => handleChange("min", target.value)}
                        />

                        <span className="text-text-muted font-semibold text-xs tracking-wider">Máximo</span>
                        <Input fieldClass="ps-7"
                            type="number"
                            fieldSize="sm"
                            placeholder="0.00"
                            min={0}
                            step="0.01"
                            value={values.max}
                            error={errors.max}
                            fieldIcon={"S/"}
                            onChange={({ target }) => handleChange("max", target.value)}
                        />

                    </div>
                </form>
            </FloatingWrapper>
        </>
    )
}

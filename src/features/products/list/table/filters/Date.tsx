import { OpenFilterButton, useDateFilter, AppliedFilterLabel, useSortOrderFilter, SortOrderButton } from "@/src/shared/table/filters"
import { CgCalendar } from "react-icons/cg"
import { FloatingWrapper } from "@/src/shared/components/floating"
import { dateFormatter, parseLocalDate } from "@/src/shared/utils"
import { FilterInput } from "@/src/shared/form"
import { PRODUCT_SORTBY_ACCEPT_ONLY } from "../../../constants/filters"
import { CellTitle } from "@/src/shared/table/core"

const defSortBy = "created_at";
export const Date = () => {

    const { handleChange, handleClean, handleCancel, handleClose, handleOpen,
        values, errors, isActive, filter } = useDateFilter();

    const { handleToggle, order, sortBy } = useSortOrderFilter(defSortBy, PRODUCT_SORTBY_ACCEPT_ONLY);

    const handleApply = () => {

        console.log(filter)
        handleClose();
    }

    const labels = isActive ? [] : Object.values(filter).filter(v => !!v).map(v => dateFormatter.format(parseLocalDate(v)));

    return (
        <>
            <CellTitle title="Creado" reverse>
                <OpenFilterButton
                    active={isActive}
                    onClick={handleOpen}
                    icon={<CgCalendar size={16} />}
                />

                <SortOrderButton active={defSortBy === sortBy} order={order} onToggle={handleToggle} />
            </CellTitle>

            {!isActive && labels.length > 0 && <AppliedFilterLabel label={labels.join(" - ")} onClick={() => handleClean()} />}

            <FloatingWrapper open={isActive} onClose={handleCancel} positionX="right-0" >
                {/* Actions */}
                <div className="flex px-4 py-3 bg-surface-elevated font-semibold w-60">
                    <button type="button" className=" text-xs text-text-muted hover:text-text" onClick={() => handleClean()}>
                        Limpiar
                    </button>
                    <div className="flex-1"></div>
                    <button className="text-xs text-primary hover:text-primary-light hover:dark:text-blue-500 hover:font-semibold" onClick={handleApply}>
                        Aplicar filtros
                    </button>
                </div>

                {/* Options */}
                <div className="max-h-60 space-y-2 gap-2 px-5 py-4 text-start">
                    <FilterInput onChange={({ target }) => handleChange("registeredFrom", target.value)}
                        value={values.registeredFrom}
                        type="date"
                        label="Registrado desde"
                        isError={errors.registeredFrom}
                    />

                    <FilterInput onChange={({ target }) => handleChange("registeredTo", target.value)}
                        value={values.registeredTo}
                        type="date"
                        label="Registrado hasta"
                        isError={errors.registeredTo}
                    />

                </div>
            </FloatingWrapper>
        </>
    )
}

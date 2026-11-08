import { OpenFilterButton, useDateFilter, AppliedFilterLabel, useSortOrderFilter, SortOrderButton } from "@/src/shared/table/filters"
import { CgCalendar } from "react-icons/cg"
import { FloatingWrapper } from "@/src/shared/components/floating"
import { dateFormatter } from "@/src/shared/utils/date"
import { Input } from "@/src/shared/form"
import { CellTitle } from "@/src/shared/table/core"
import { useStore } from "@/src/store/useStore"
import { SURFACE_VARIANTS } from "@/src/shared/theme/surface-variant"
import { PRODUCT_SORTBY_ACCEPT_ONLY } from "@/src/features/products/constants"

const defSortBy = "created_at";
export const Date = () => {

    const setFilter = useStore(v => v.setProductFilters);

    const { handleChange, handleClean, handleCancel, handleClose, handleOpen,
        values, errors, isActive, filter } = useDateFilter();

    const { handleToggle, order, sortBy } = useSortOrderFilter(defSortBy, PRODUCT_SORTBY_ACCEPT_ONLY);

    const handleApply = () => {

        const { registeredFrom, registeredTo } = filter;
        setFilter({ registeredFrom, registeredTo });

        handleClose();
    }

    const handleReset = () => {
        handleClean();
        setFilter({}, { registeredFrom: true, registeredTo: true })
    }

    const labels = isActive
        ? ""
        : Object.values(filter).filter(v => !!v).map(v =>
            dateFormatter.format(v,"date")
        ).join(" - ");

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

            {!isActive && labels.length > 0 && <AppliedFilterLabel label={labels} onClick={handleReset} />}

            <FloatingWrapper open={isActive} onClose={handleCancel} positionX="right-0"
                className={SURFACE_VARIANTS.filter} size="sm">
                {/* Actions */}
                <div className="flex px-4 py-3 bg-surface-elevated font-semibold">
                    <button type="button" className=" text-xs text-text-muted hover:text-text"
                        onClick={handleReset}>
                        Limpiar
                    </button>
                    <div className="flex-1"></div>
                    <button className="text-xs text-primary hover:text-primary-light hover:dark:text-blue-500 hover:font-semibold" onClick={handleApply}>
                        Aplicar filtros
                    </button>

                </div>

                {/* Options */}
                <div className="space-y-3 p-4 text-start">

                    <span className="text-text-muted font-semibold tracking-wider  text-xs">Registrado desde</span>
                    <Input
                        custom={{ fieldSize: "sm", error: errors.registeredFrom }}
                        type="date"
                        value={values.registeredFrom}
                        onChange={({ target }) => handleChange("registeredFrom", target.value)}
                    />

                    <span className="text-text-muted font-semibold tracking-wider text-xs">Registrado hasta</span>
                    <Input
                        custom={{ fieldSize: "sm", error: errors.registeredTo }}
                        type="date"
                        value={values.registeredTo}
                        onChange={({ target }) => handleChange("registeredTo", target.value)}
                    />

                </div>
            </FloatingWrapper>
        </>
    )
}

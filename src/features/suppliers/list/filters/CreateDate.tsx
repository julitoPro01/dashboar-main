
import clsx from "clsx";
import { CgCalendar } from "react-icons/cg";

import { AppliedFilterLabel, OpenFilterButton, useDateFilter, useSortOrderFilter, SortOrderButton } from "@/src/shared/table/filters";
import { FloatingWrapper } from "@/src/shared/components/floating";
import { CellTitle } from "@/src/shared/table/core";
import { SORTBY_ACCEPT_ONLY } from "../../constants";
import { FIELD_STYLE } from "@/src/shared/form";

const defSortBy = "created_at";
export const CreateDate = () => {

    const { values: val, errors, isActive, filter,
        handleChange, handleClean, handleCancel, handleClose, handleOpen } = useDateFilter();

    const { handleToggle, order, sortBy } = useSortOrderFilter(defSortBy, SORTBY_ACCEPT_ONLY);

    const handleApply = () => {
        //CERRAMOS
        handleClose()
    }

    const labels = Object.values(filter).filter(v=>!!v)

    return (
        <>

            <CellTitle title="Creado" reverse>
                <OpenFilterButton
                    active={isActive}
                    onClick={handleOpen}
                    icon={<CgCalendar size={16} />}
                />

                <SortOrderButton active={sortBy === defSortBy} order={order} onToggle={handleToggle} />
            </CellTitle>

            {!isActive && labels.length > 0 && <AppliedFilterLabel label={labels.join(" - ")} onClick={() => handleClean()} />}

            <FloatingWrapper positionX="right-0" positionY="top-full" open={isActive} onClose={handleCancel}  >
                <div className="flex px-4 py-3 bg-surface-elevated font-semibold w-60">
                    <button className=" text-xs text-text-muted hover:text-text" onClick={() => handleClean()}>
                        Limpiar
                    </button>
                    <div className="flex-1"></div>
                    <button className="text-xs text-primary hover:text-primary-light hover:dark:text-blue-500 hover:font-semibold" onClick={handleApply}>
                        Aplicar filtros
                    </button>
                </div>

                {/* Options */}
                <div className="max-h-60 space-y-2 gap-2 p-2 text-start">
                    <div className="px-3 pt-2">
                        <label className={FIELD_STYLE.label}>
                            <span className="block mb-1">Registrado desde</span>
                            <input
                                value={val.registeredFrom}
                                type="date"
                                onChange={({ target }) => handleChange("registeredFrom", target.value)}
                                className={clsx(FIELD_STYLE.base, {
                                    [FIELD_STYLE.status.normal]: !errors.registeredFrom,
                                    [FIELD_STYLE.status.error]: errors.registeredFrom
                                })} />
                        </label>
                    </div>
                    <div className="px-3 pb-2">
                        <label className={FIELD_STYLE.label}>
                            <span className="block mb-1">Registrado hasta</span>
                            <input
                                value={val.registeredTo}
                                type="date"
                                onChange={({ target }) => handleChange("registeredTo", target.value)}
                                className={clsx(FIELD_STYLE.base,
                                    {
                                        [FIELD_STYLE.status.normal]: !errors.registeredTo,
                                        [FIELD_STYLE.status.error]: errors.registeredTo
                                    })} />
                        </label>
                    </div>
                </div>
            </FloatingWrapper>

        </>
    )
}

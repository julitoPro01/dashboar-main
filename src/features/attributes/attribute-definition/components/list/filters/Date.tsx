
import { CgCalendar } from "react-icons/cg";

import { AppliedFilterLabel, OpenFilterButton, CellTitle, useSortOrderFilter, SortOrderButton, useDateFilter } from "@/src/shared/table";
import { FloatingWrapper } from "@/src/shared/components/floating";
import { FilterInput } from "@/src/shared/components/input";
import { ATTRIBUTE_SORTBY_ACCEPT_ONLY } from "../../../constants/filters";


const defSortBy = "created_at"
export const Date = () => {

    const {
        handleCancel, handleChange, handleClean, handleClose, handleOpen, values, errors, isActive, filter
    } = useDateFilter();

    const { handleToggle, sortBy, order } = useSortOrderFilter(defSortBy, ATTRIBUTE_SORTBY_ACCEPT_ONLY);


    const handleApply =()=>{

        handleClose()
    }

    const labels = Object.values(filter).filter(v=>!!v);

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

            {!isActive && labels.length > 0 && <AppliedFilterLabel label={labels.join(" - ")} onClick={()=>handleClean()} />}

            <FloatingWrapper open={isActive} onClose={handleCancel} positionX="right-0" >

                {/* Actions */}
                <div className="flex px-4 py-3 bg-surface-elevated font-semibold w-60">
                    <button className=" text-xs text-text-muted hover:text-text" onClick={()=>handleClean()}>
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
                        label="Registrado desde"
                        value={values.registeredFrom}
                        type="date"
                        isError={errors.registeredFrom}
                        />
                  
                  <FilterInput onChange={({ target }) => handleChange("registeredTo", target.value)}
                        label="Registrado hasta"
                        value={values.registeredTo}
                        type="date"
                        isError={errors.registeredTo}
                        />

                </div>
            </FloatingWrapper>
        </>
    )
}


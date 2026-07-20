import { INPUT_FIELD_STYLE } from "@/src/shared/theme/inputField"
import clsx from "clsx"
import { MdExpandMore } from "react-icons/md"

export const CategorySelection = () => {
    return (
        <div>
            <div>
                <span className={INPUT_FIELD_STYLE.label + " " + INPUT_FIELD_STYLE.isRequired}>Categoría</span>

                <button className={clsx(INPUT_FIELD_STYLE.base, INPUT_FIELD_STYLE.states.normal,
                    "text-start relative")}
                    type="button"
                    >
                    Seleccionar categoría
                    <div className=" absolute right-0 pr-1 top-0 flex items-center h-full">
                        <MdExpandMore size={20} />
                    </div>
                </button>
            </div>

            <div className="flex">
                {/* CATEGORIAS SELECCIONADOS */}
            </div>
        </div>
    )
}

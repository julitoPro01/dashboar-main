import { useState } from "react"
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

export const BtnToogleActiveInactive = () => {

    const [isActive, setIsActive] = useState(false);

    const handleActive = () => {
        setIsActive(!isActive)
    }

    return (
        <button
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm
        cursor-pointer
        text-primary hover:bg-hover
        "
            onClick={handleActive}
        >
            {
                isActive
                    ? <MdCheckBox size={22} />
                    : <MdCheckBoxOutlineBlank size={22} />
            }


            <span>{isActive ? "Desactivar producto" : "Activar producto"}</span>
            </button>
    )
}

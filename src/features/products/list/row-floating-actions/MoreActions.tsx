import { FloatingCard, FloatingWrapper } from "@/src/shared/components/floating"
import { MenuItem } from "@/src/shared/components/items"
import { SURFACE_VARIANTS } from "@/src/shared/theme/surface-variant"
import { useState } from "react"
import { FiMoreHorizontal } from "react-icons/fi"
import { MdKeyboardArrowRight } from "react-icons/md"

export const MoreActions = () => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <div >
                <FloatingCard
                    open={open}
                    onOpenChange={setOpen}
                    interaction="hover"
                    
                    className={SURFACE_VARIANTS.tableActionMenu}
                    placement="right-start"
                    offsetDistance={0}
                    trigger={
                        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm
                            hover:bg-hover"
                        >
                            <FiMoreHorizontal className="size-4" />
                            <span>Mas acciones</span>
                            <MdKeyboardArrowRight className="size-5 ml-auto" />
                        </button>
                    }
                >

                    <MenuItem
                        label="Archivar producto"
                    />

                    <MenuItem
                        label="Eliminar permanentemente"
                    />
                    <MenuItem
                        label="Agregar a la papelera"
                    />
                    <MenuItem
                        label="Configuración"
                    />
                </FloatingCard>

            </div>
        </>
    )
}

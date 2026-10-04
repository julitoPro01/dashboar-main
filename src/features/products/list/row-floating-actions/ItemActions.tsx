
import { MenuItem } from "@/src/shared/components/items"
import { APP_ROUTES } from "@/src/shared/routes"
import { useStore } from "@/src/store/useStore"
import { FiMoreHorizontal, FiMoreVertical } from "react-icons/fi"
import { IoCopyOutline, IoCreateOutline, IoEyeOutline, IoTrashOutline } from "react-icons/io5"
import { MdCheckBoxOutlineBlank, MdOutlineCategory, MdOutlineInventory2 } from "react-icons/md"
import { BtnToogleActiveInactive } from "./BtnToogleActiveInactive"
import { MoreActions } from "./MoreActions"


export const ItemActions = () => {

    const selected = useStore(v => v.productSelected);

    if (!selected)
        return <p className="text-text-muted"> Ninguna producto seleccionada. </p>

    return (
        <>
            <MenuItem
                icon={<IoEyeOutline />}
                label="Ver producto"
            // onClick={() => handleAction(onView)}
            />

            <MenuItem
                icon={<IoCreateOutline />}
                label="Editar producto"
                href={APP_ROUTES.PRODUCTS.EDIT(selected.publicId)}
            />

            <MenuItem
                icon={<IoCopyOutline />}
                label="Duplicar producto"
            // onClick={() => handleAction(onDuplicate)}
            />

            <div className="my-1 border-t border-border" />

            <MenuItem
                icon={<MdOutlineInventory2 />}
                label="Gestionar variantes"
                href={APP_ROUTES.PRODUCTS.VARIANTS(selected.publicId)}
            // onClick={() => handleAction(onVariants)}
            />

            <MenuItem
                icon={<MdOutlineCategory />}
                label="Gestionar imágenes"
            // onClick={() => handleAction(onImages)}
            />


            <div className="my-1 border-t border-border" />
            <MoreActions/>
            <div className="my-1 border-t border-border" />

            <BtnToogleActiveInactive/>
        </>
    )
}

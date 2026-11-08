import { MenuItem } from "@/src/shared/components/items"
import { SIDE_MODAL_TYPE } from "@/src/store/uiSlice"
import { useStore } from "@/src/store/useStore";
import { IoCreateOutline } from "react-icons/io5"

export const EditVariantAction = ({id}:{id:number}) => {

    const setOpen = useStore(v => v.setSideModal);
    const setEditVariant = useStore(v => v.setVariantUpsert);
    const closeFloatingPanel = useStore((state) => state.setCloseFloatingPanel);



    return (
        <MenuItem
            icon={<IoCreateOutline />}
            label="Editar variante"
            onClick={() => {
                setOpen({ open: true, type: SIDE_MODAL_TYPE.PRODUCT_VARIANT_EDIT })
                setEditVariant({ type: "edit", variantId:id })
                closeFloatingPanel()
            }}
        />
    )
}

"use client"
import { SIDE_MODAL_TYPE } from "@/src/store/uiSlice"
import { useStore } from "@/src/store/useStore"
import { BiPlus } from "react-icons/bi"
import { LayoutButton } from "./LayoutButton"

type Props = { isCollapsed: boolean }
export const AddVariantButton = ({ isCollapsed }: Props) => {

    const setOpen = useStore(v => v.setSideModal);
    const setCreate = useStore(v => v.setVariantUpsert);

    const handleAdd = () => {

        const base = useStore.getState().variantBaseProduct;
        if (!base) return;

        setOpen({ open: true, type: SIDE_MODAL_TYPE.PRODUCT_VARIANT_CREATE })
        setCreate({ type: "create" })
    }

    const title = "Agregar variante";

    return (
        <LayoutButton
        title={title}
        icon={<BiPlus/>}
        isCollapsed={isCollapsed}
        onAction={handleAdd}
        />
    )
}

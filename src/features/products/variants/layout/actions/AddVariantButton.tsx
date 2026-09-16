"use client"
import { Button } from "@/src/shared/components/btn"
import { Tooltip } from "@/src/shared/components/floating"
import { SIDE_MODAL_TYPE } from "@/src/store/uiSlice"
import { useStore } from "@/src/store/useStore"
import { BiPlus } from "react-icons/bi"

export const AddVariantButton = () => {

    const setOpen = useStore(v => v.setSideModal);
    const setCreate = useStore(v => v.setVariantUpsert);

    const handleAdd = () => {

        const base = useStore.getState().variantBaseProduct;
        if (!base) return;

        setOpen({ open: true, type: SIDE_MODAL_TYPE.PRODUCT_VARIANT_CREATE })
        setCreate({ type: "create" })
    }


    return (
        <Tooltip text="Agregar variante" position="left" x="right-12" variant="banderola">
            <Button
                variant="tabLight"
                size="sm"
                rounded="full"
                padding="p-1.5"
                onClick={handleAdd}
            >
                <BiPlus size={22} />
            </Button>
        </Tooltip>
    )
}

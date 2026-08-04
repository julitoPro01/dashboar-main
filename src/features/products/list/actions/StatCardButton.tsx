"use client"
import { Button } from "@/src/shared/components/btn";
import { Tooltip } from "@/src/shared/components/floating";
import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice";
import { useStore } from "@/src/store/useStore"
import { MdOutlineSpaceDashboard } from "react-icons/md"

export const StatCardButton = () => {

    const setFloating = useStore(v => v.setFloatingPanel);
    const floating = useStore(v => v.floatingPanel)
    const isOpen = floating.open && floating.type === FLOATING_PANEL_TYPE.PRODUCT_STAT_CARD;

    const handleOpen = () => {
        setFloating({ open: true, type: FLOATING_PANEL_TYPE.PRODUCT_STAT_CARD })
    }


    return (
        <Tooltip text="Resumen" position="left" x="right-12" variant="banderola">
            <Button variant="tabLight" size="sm" padding="p-1.5" rounded="full" select="tabLight"
                active={isOpen}
                onClick={handleOpen} >
                <MdOutlineSpaceDashboard size={22} />
            </Button>
        </Tooltip>
    )
}

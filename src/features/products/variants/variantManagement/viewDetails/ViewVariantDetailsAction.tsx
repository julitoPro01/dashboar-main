"use client";

import { MenuItem } from "@/src/shared/components/items";
import { useStore } from "@/src/store/useStore";
import { SIDE_MODAL_TYPE } from "@/src/store/uiSlice";
import { IoEyeOutline } from "react-icons/io5";
import type { SelectedVariant } from "@/src/store/variantSlice";

interface Props {
    selected: SelectedVariant;
}

export const ViewVariantDetailsAction = ({ selected }: Props) => {

    const setDetailsId = useStore((state) => state.setVariantDetailsId);
    const setSideModal = useStore((state) => state.setSideModal);
    const closeFloatingPanel = useStore((state) => state.setCloseFloatingPanel);
    const setTableAction = useStore(state=>state.setVariantTableAction);


    const handleOpen = () => {
        setDetailsId(selected.id);
        setSideModal({
            open: true,
            type: SIDE_MODAL_TYPE.PRODUCT_VARIANT_DETAILS,
        });
        setTableAction("details")
        closeFloatingPanel();
    };

    return (
        <MenuItem
            icon={<IoEyeOutline />}
            label="Ver detalles"
            onClick={handleOpen}
        />
    );
};

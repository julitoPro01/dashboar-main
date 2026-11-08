"use client";

import { SideModal } from "@/src/shared/components/modal";
import { SIDE_MODAL_TYPE } from "@/src/store/uiSlice";
import { useStore } from "@/src/store/useStore";
import { ViewVariantDetails } from "./ViewVariantDetails";

export const ViewVariantDetailsSideModal = () => {
    const variantId = useStore((state) => state.variantDetailsId);
    const product = useStore((state) => state.variantBaseProduct);

    const setTableAction = useStore(s=>s.setVariantTableAction)
    const clearSelection = useStore((state) => state.setVariantSelect);


    const handleDeselect=()=>{
        clearSelection(undefined);
        setTableAction("list");
    }

    if (!variantId) return null;

    return (
        <SideModal
            sideType={SIDE_MODAL_TYPE.PRODUCT_VARIANT_DETAILS}
            title="Detalles de la variante"
            description={`Producto base: ${product?.name ?? "—"} (${product?.sku ?? "—"})`}
            keepMounted
            modal={false}
            onEffectClose={handleDeselect}
            
        >
            <ViewVariantDetails variantId={variantId} />
        </SideModal>
    );
};

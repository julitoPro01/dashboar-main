"use client";
import { FloatingPanel } from "@/src/shared/components/floating";
import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice";
import { useStore } from "@/src/store/useStore"
import { ItemActions } from "./row-floating-actions/ItemActions";
import { SURFACE_VARIANTS } from "@/src/shared/theme/surface-variant";

// Activamos el menu flotante
// Cerramos el menu flotante deseleccionando al proveedor

export const RowFloatingActions = () => {

    const setDeselect = useStore(v => v.setProductSelect);

    
    return (
        <FloatingPanel panelType={FLOATING_PANEL_TYPE.PRODUCT} placement="right-start"
            onEffectClose={() => setDeselect()}
            className={SURFACE_VARIANTS.tableActionMenu}
        >
            <ItemActions />
        </FloatingPanel >
    )

}


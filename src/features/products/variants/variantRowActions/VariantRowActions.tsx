"use client"
// Activamos el menu flotante
// Cerramos el menu flotante deseleccionando al proveedor

import { FloatingPanel } from "@/src/shared/components/floating";
import { SURFACE_VARIANTS } from "@/src/shared/theme/surface-variant";
import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice";
import { useStore } from "@/src/store/useStore";
import { ItemActions } from "./ItemActions";

export const VariantRowActions = () => {

    const setDeselect = useStore(v => v.setVariantSelect);


    return (
        <FloatingPanel
            panelType={FLOATING_PANEL_TYPE.VARIANT}
            placement="right-start"
            onEffectClose={() => setDeselect()}
            className={SURFACE_VARIANTS.tableActionMenu}
            overlay={false}
        >
            <ItemActions />
        </FloatingPanel >
    )

}
"use client";

import { Button } from "@/src/shared/components/btn";
import { FloatingPanel } from "@/src/shared/components/floating";
import { FLOATING_PANEL_TYPE } from "@/src/store/uiSlice";
import { useStore } from "@/src/store/useStore";

export const RowFloatingActions = () => {

    const setDeselect = useStore(v => v.setAttributeSelect);

    return (
        <FloatingPanel panelType={FLOATING_PANEL_TYPE.ATTRIBUTE} onEffectClose={() => setDeselect()}>
            <div className="p-2 flex flex-col" >
                <Actions />
            </div>
        </FloatingPanel>
    )
}

const Actions = () => {

    const selected = useStore(v => v.attributeSelected);
    const setDeleteModal = useStore(v => v.setAttributeDeleteModal);
    const setEditModal = useStore(v => v.setAttributeEditModal);


    if (!selected) return null;

    const handleOpenDeleteModal = () => setDeleteModal({ open: true, id: selected.id, name: selected.name });

    const handleOpenEditModal = () => setEditModal({ open: true, id: selected.id, name: selected.name })

    return (
        <>
            <Button variant="ghost" onClick={handleOpenDeleteModal} >
                Eliminar
            </Button>

            <Button variant="ghost" position="start" onClick={handleOpenEditModal} >
                Editar
            </Button>
        </>
    )
}


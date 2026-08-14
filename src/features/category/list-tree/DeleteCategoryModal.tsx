"use client";

import { DeleteConfirmDialog, DynamicModal } from "@/src/shared/components/modal"
import { useDeleteCategory } from "../shared/hooks";
import { useStore } from "@/src/store/useStore";

export const DeleteCategoryModal = () => {

    const modal = useStore(v => v.deleteCategoryModal);
    const setModal = useStore(v => v.setDeleteCategoryModal);

    return (
        <DynamicModal size="md"
            open={!!modal?.open} onClose={() => setModal()} inactiveClose>

            <RenderContent {...{
                id: modal?.id ?? 0,
                name: modal?.name ?? "",
                parentId: modal?.parentId ?? 0,
                onClose: setModal
            }} />
        </DynamicModal>
    )
}


interface R {
    id: number;
    name: string;
    parentId?: number;
    onClose: () => void;
}
const RenderContent = ({ id, name, parentId, onClose }: R) => {


    const setDeselect = useStore(v => v.setSelectCategory);
    const setCloseFloating = useStore(v => v.setFloatingPanel);

    const main = useStore(v => v.selectedMainCategory);
    const setMainCategory = useStore(v => v.setSelectMainCategory);


    const { isPending, mutate, entitiesInUse } = useDeleteCategory(main?.path, id);

    const handleConfirm = () => {

        if (!id) return

        mutate({ id, parentId },
            {
                onSuccess(res) {
                    if (res.ok) {

                        const data = res.data
                        // SI ES  RAIZ
                        if (data.isRootCategory) {
                            setMainCategory({ ...main!, sync: "delete" })
                        }
                        // SI ES RAIZ Y NO TIENE HERMANOS
                        else if (data.parentIsRootCategory && !data.hasSibling) {
                            setMainCategory({ ...main!, hasChildren: false, sync: "update" })
                        }

                        // CERRAMOS EL MODAL
                        onClose();
                        // DESELECCIONAMOS
                        setDeselect();
                        // CERRAMOS LA ACCIÓN FLOTANTE
                        setCloseFloating({ open: false, type: undefined })
                    }
                }
            }
        )
    }

    return (

        <DeleteConfirmDialog
            entity="Categoría"
            name={name}
            loading={isPending}
            entitiesInUse={entitiesInUse}
            onCloseModal={onClose}
            onConfirm={handleConfirm}
        />
    )
}
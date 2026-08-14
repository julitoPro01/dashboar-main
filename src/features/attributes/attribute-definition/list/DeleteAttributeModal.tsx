"use client"
import { DeleteConfirmDialog, DynamicModal } from "@/src/shared/components/modal"
import { useStore } from "@/src/store/useStore"
import { useDeleteAttribute } from "../shared/hook";


export const DeleteAttributeModal = () => {

    const modal = useStore(v => v.attributeDeleteModal);
    const setModal = useStore(v => v.setAttributeDeleteModal);

    const handleClose = () => setModal();

    return (
        <DynamicModal size="md"
            open={!!modal?.open} onClose={handleClose} clickBgClose inactiveClose >
            <RenderContent {...{ name: modal?.name ?? "", id: modal?.id ?? 0, onCloseModal: handleClose }} />
        </DynamicModal>
    )
}


const RenderContent = ({ id, name, onCloseModal }: { id: number, name: string, onCloseModal: () => void }) => {

    const resetState = useStore(v => v.AttributeResetStateAfterDelete);

    const { mutate: deleteAttribute, isPending, entitiesInUse } = useDeleteAttribute();


    const handleConfirm = async () => {
        if (!id) return;

        deleteAttribute(id, {
            onSuccess: async (res) => {
                if (res.ok)
                    resetState();
            }
        });
    }


    return (

       <DeleteConfirmDialog
        entity="El atributo"
        name={name}
        onCloseModal={onCloseModal}
        onConfirm={handleConfirm}
        entitiesInUse={entitiesInUse}
        loading={isPending}
       />
    )

}
"use client"
import { Button } from "@/src/shared/components/btn";
import { DynamicModal } from "@/src/shared/components/modal"
import { TOAST_STYLE, ToastError } from "@/src/shared/components/toaster";
import { getErrorMessage, successMessage } from "@/src/shared/messages";
import { sleep } from "@/src/shared/utils";
import { useStore } from "@/src/store/useStore"
import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5"
import { toast } from "sonner";
import { useDeleteAttribute } from "../../hook/useDeleteAttribute";

type ResError = { entity: string, count: number }

export const DeleteAttributeModal = () => {

    const modal = useStore(v => v.deleteAttributeModal);
    const setModal = useStore(v => v.setDeleteAttributeModal);

    const handleClose = () => setModal();

    return (
        <DynamicModal title="Eliminar Atributo" sizeTitle="xl"
            open={!!modal?.open} onClose={handleClose} clickBgClose inactiveClose >
            <RenderContent {...{ name: modal?.name ?? "", id: modal?.id ?? 0, onCloseModal: handleClose }} />
        </DynamicModal>
    )
}


const RenderContent = ({ id, name, onCloseModal }: { id: number, name: string, onCloseModal: () => void }) => {

    const resetState = useStore(v => v.resetStateAfterAttributeDelete);

    const [resError, setResError] = useState<ResError[]>([]);
    const [loading, setLoading] = useState(false);

    const deleteAttribute = useDeleteAttribute();


    const handleConfirm = async () => {
        if(!id) return;
        
        setLoading(true);

        deleteAttribute.mutate(id, {
            onSuccess: async (res) => {

                await sleep(1000);
                setLoading(false);

                if (res.ok) {
                    toast.success(successMessage.deleted("atributo").description, { style: TOAST_STYLE.success })
                    // Restablecemos el contexto
                    resetState();
                } else {

                    if (res.errorCode === "ENTITY_IN_USE")
                        setResError(res.data as ResError[])
                    else {
                        const {title,description} = getErrorMessage(res.errorType);
                        ToastError({ title, description, activeBtnClose: true }, { duration: 5000 });
                    }
                }
            }
        });
    }

    const notAvailable = resError.length > 0;


    useEffect(() => {
        return () => {
            setResError([])
        }
    }, [])


    return (
        <div className="space-y-5 p-6">


            {/* Warning */}
            <div className="flex items-start gap-3 bg-surface-elevated  p-4 rounded-lg">
                <div className="mt-0.5 text-amber-500">
                    <IoWarningOutline size={22} />
                </div>
                <div>
                    <h3 className="font-medium">
                        Esta acción no se puede deshacer
                    </h3>


                    {
                        !notAvailable
                            ? <p className="text-sm text-text-muted mt-1">
                                El atributo <strong>"{name}"</strong> se eliminara
                                permanentemente.
                            </p>
                            : <p className="text-sm text-error mt-1">
                                El atributo <strong>"{name}"</strong> está siendo utilizado
                                y no puede eliminarse.
                            </p>
                    }
                </div>
            </div>

            {/* References */}
            {notAvailable &&
                <div className=" rounded-lg  border  border-border bg-background p-4 space-y-2">
                    <span className="text-sm font-semibold">
                        Referencias encontradas:
                    </span>

                    <div className="space-y-1">
                        {
                            resError.map((v) => (
                                <div
                                    key={v.entity}
                                    className="flex justify-between text-sm"
                                >
                                    <span className="text-muted-foreground">
                                        {v.entity}
                                    </span>

                                    <span className="font-medium">
                                        {v.count}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }

            {/* Actions */}

            <div className="flex justify-end gap-3">
                <Button
                    variant="basic"
                    onClick={onCloseModal}
                >
                    Cancelar
                </Button>

                <Button onClick={handleConfirm} variant="danger"
                    loading={loading}
                    disabled={resError.length > 0}>
                    {loading ? "Eliminando" : "Confirmar"}
                </Button>
            </div>

        </div>
    )

}
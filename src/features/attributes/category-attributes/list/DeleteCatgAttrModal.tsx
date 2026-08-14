"use client";
import { ConfirmDialog, DynamicModal } from "@/src/shared/components/modal"
import { useStore } from "@/src/store/useStore";
import { useDeleteCatgAttrs } from "../hook";
import { useState } from "react";
import { ApiEntityInUseData } from "@/src/shared/utils";

export const DeleteCatgAttrModal = () => {

    const modal = useStore(v => v.categoryAttrsDeleteModal);
    const setModal = useStore(v => v.setCategoryAttrsDeleteModal);

    const handleClose = () => setModal();

    return (
        <DynamicModal open={!!modal?.open} onClose={handleClose} size="md" inactiveClose>
            <Render del={modal?.del ?? []}
                updateIds={modal?.updateIds ?? []} onClose={handleClose} />
        </DynamicModal>
    )
}

interface Props { del: { id: number, name: string }[], updateIds: number[], onClose: () => void }
const Render = ({ del, updateIds, onClose }: Props) => {


    const [erros, setErros] = useState<ApiEntityInUseData[]>([]);

    const { mutateAsync, isPending } = useDeleteCatgAttrs();

    const handleConfirm = async () => {
        if (!del.length) return;

        const res = await mutateAsync({ del, updateIds });

        if (res.ok) {
            onClose();
        } else {
            if (res.errorCode === "ENTITY_IN_USE") {
                setErros(res.data ?? [])
            }
        }
    }

    const notAvailable = erros.length > 0;

    return (
        <ConfirmDialog
            title={`Eliminar seleccionado(s): ${del.length}`}
            description={!notAvailable
                ? "Se eliminarán permanentemente. Esta acción no se puede deshacer."
                : "Algunos valores están siendo utilizados por otros registros y no se pueden eliminar."
            }
            variant={notAvailable ? "warning" : "danger"}
            confirmText="Eliminar"
            variantBtn="danger"
            loading={isPending}
            confirmDisabled={notAvailable}
            onConfirm={handleConfirm}
            onCancel={onClose}
            details={
                notAvailable && (
                    <>
                        <h4 className="mb-3 text-sm font-semibold">
                            Referencias encontradas
                        </h4>

                        <div className="space-y-2">
                            {erros.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between rounded-md bg-background px-3 py-2"
                                >
                                    <div className="flex flex-col w-full">
                                        <span className="text-text-muted text-sm inline-flex  items-center justify-between">
                                            {item.name ?? ""}
                                            {item.isOk &&
                                                <span className="text-error text-xs mx-3">Eliminado</span>
                                            }
                                        </span>
                                        <span className="text-xs text-text-subtle">
                                            {item.entity}
                                        </span>
                                    </div>

                                    <span className="rounded-md bg-surface-light px-2 py-1 text-sm font-semibold">
                                        {item.count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </>
                )
            }
        />
    )
}
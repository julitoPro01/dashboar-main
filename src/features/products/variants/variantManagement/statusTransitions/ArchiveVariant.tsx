"use client";

import { useArchiveVariant } from "@/src/features/products/shared/hooks";
import { ConfirmDialog } from "@/src/shared/components/modal";

import { StatusProps } from "./type";

export const ArchiveVariant = ({ variantId, sku, productId, onCloseModal, successAction }: StatusProps) => {

    const { archive, isPending } = useArchiveVariant();

    const handleConfirm = async () => {

        const result = await archive({
            productId,
            variantId,
        });

        if (!result.ok) return;
        successAction()

    };

    return (
        <>
            <ConfirmDialog
                title="Archivar variante"
                description={
                    <>
                        La variante <strong>{sku}</strong> dejará de estar disponible en el catálogo activo.
                        Se conservarán sus datos, inventario e historial. Si es la última variante activa, el producto
                        base también pasará a inactivo.
                    </>
                }
                variant="warning"
                variantBtn="info"
                confirmText="Archivar variante"
                loadingText="Archivando…"
                loading={isPending}
                onCancel={onCloseModal}
                onConfirm={handleConfirm}
            />
        </>
    );
};

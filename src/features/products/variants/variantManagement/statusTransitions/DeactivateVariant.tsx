"use client";

import { useDeactivateVariant } from "@/src/features/products/shared/hooks";
import { ConfirmDialog } from "@/src/shared/components/modal";
import { StatusProps } from "./type";

export const DeactivateVariant = ({ variantId, sku, productId, onCloseModal, successAction }: StatusProps) => {
    const { deactivate, isPending } = useDeactivateVariant();

    const handleConfirm = async () => {

        const result = await deactivate({
            productId,
            variantId,
        });

        if (!result.ok) return;
        successAction()
    };

    return (
        <>
            <ConfirmDialog
                title="Desactivar variante"
                description={
                    <>
                        La variante <strong>{sku}</strong> dejará de estar disponible para la venta.
                        Se conservarán su inventario y su historial. Si es la última variante activa, el producto
                        base también pasará a inactivo.
                    </>
                }
                variant="warning"
                variantBtn="info"
                confirmText="Desactivar variante"
                loadingText="Desactivando…"
                loading={isPending}
                onCancel={onCloseModal}
                onConfirm={handleConfirm}
            />
        </>
    );
};

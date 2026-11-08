"use client";

import { useRestoreArchivedVariant } from "@/src/features/products/shared/hooks";
import { ConfirmDialog } from "@/src/shared/components/modal";
import { StatusProps } from "./type";

export const RestoreArchivedVariant = ({ variantId, sku, productId, onCloseModal, successAction }: StatusProps) => {
    const { restore, isPending } = useRestoreArchivedVariant();

    const handleConfirm = async () => {
        const result = await restore({ productId, variantId });
        if (result.ok) successAction();
    };

    return (
        <ConfirmDialog
            title="Restaurar variante"
            description={
                <>
                    La variante <strong>{sku}</strong> volverá al estado inactivo para que puedas revisar su información
                    antes de activarla. Esto no cambiará el estado ni el motivo de inactividad del producto base.
                </>
            }
            variant="info"
            variantBtn="info"
            confirmText="Restaurar como inactiva"
            loadingText="Restaurando…"
            loading={isPending}
            onCancel={onCloseModal}
            onConfirm={handleConfirm}
        />
    );
};

"use client";

import { usePublishVariant } from "@/src/features/products/shared/hooks";
import { ConfirmDialog } from "@/src/shared/components/modal";
import { StatusProps } from "./type";

export const PublishVariant = ({ variantId, sku, productId, onCloseModal, successAction }: StatusProps) => {
    const { publish, isPending } = usePublishVariant();

    const handleConfirm = async () => {
        const result = await publish({ productId, variantId });
        if (result.ok) successAction();
    };

    return (
        <ConfirmDialog
            title="Publicar variante"
            description={
                <>
                    La variante <strong>{sku}</strong> pasará a estar activa en el catálogo. Si es la primera variante
                    activa del producto, también se establecerá como principal. El producto base conservará su estado
                    y su motivo de inactividad; la variante no se comercializará hasta que el producto base esté activo.
                    La publicación en cada canal seguirá dependiendo de la configuración de ese canal.
                </>
            }
            variant="info"
            variantBtn="info"
            confirmText="Publicar variante"
            loadingText="Publicando…"
            loading={isPending}
            onCancel={onCloseModal}
            onConfirm={handleConfirm}
        />
    );
};

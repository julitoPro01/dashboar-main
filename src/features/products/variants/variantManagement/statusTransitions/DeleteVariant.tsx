"use client";

import { useDeleteVariant } from "@/src/features/products/shared/hooks";
import { ConfirmDialog, } from "@/src/shared/components/modal";
import { StatusProps } from "./type";

type DeleteMode = "logical" | "physical" | null;
interface Props extends StatusProps {
    mode: DeleteMode,
}

export const DeleteVariant = ({ variantId, productId, sku, mode, onCloseModal, successAction }: Props) => {


    const { isPending, moveToDeleted, deletePermanently } = useDeleteVariant();


    const handleConfirm = async () => {

        const payload = { productId, variantId };
        const result = mode === "logical"
            ? await moveToDeleted(payload)
            : await deletePermanently(payload);

        if (!result.ok) return;

        successAction();

    };

    const isLogicalDelete = mode === "logical";

    return (
        <>

            <ConfirmDialog
                title={isLogicalDelete ? "Mover variante a eliminados" : "Eliminar variante permanentemente"}
                description={isLogicalDelete ? (
                    <>
                        La variante <strong>{sku}</strong> dejará de aparecer en la lista activa.
                        Se conservará su registro y su historial para auditoría.
                    </>
                ) : (
                    <>
                        Se borrará para siempre la variante <strong>{sku}</strong> y sus datos asociados,
                        incluidos sus movimientos de inventario. Si está en borrador, sus datos asociados se borrarán
                        junto con ella. En los demás estados, el borrado se bloqueará si aún tiene información vinculada.
                        Los pedidos y las facturas siempre se conservan; si la variante aparece en alguno, muévela a
                        eliminados para mantener su historial.
                    </>
                )}
                variant="danger"
                variantBtn="danger"
                confirmText={isLogicalDelete ? "Mover a eliminados" : "Eliminar permanentemente"}
                loadingText={isLogicalDelete ? "Actualizando..." : "Eliminando..."}
                loading={isPending}
                onCancel={onCloseModal}
                onConfirm={handleConfirm}
            />
        </>
    );
};

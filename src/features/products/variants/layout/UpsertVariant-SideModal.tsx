"use client"
import { SideModal } from "@/src/shared/components/modal";
import { SIDE_MODAL_TYPE } from "@/src/store/uiSlice";
import { useStore } from "@/src/store/useStore";
import { CreateVariant } from "./upsertVariant/CreateVariant";
import { EditVariant } from "./upsertVariant/EditVariant";

export const UpsertVariantSideModal = () => {

    const upsertVariant = useStore(v => v.variantUpsert);
    const product = useStore(v => v.variantBaseProduct);

    const desc = `Producto base: ${product?.name} (${product?.sku})`

    if (!upsertVariant) return;

    if (upsertVariant.type === "create")
        return (
            <SideModal
                sideType={SIDE_MODAL_TYPE.PRODUCT_VARIANT_CREATE}
                title="Agregar  variante"
                description={desc}
            >
                <CreateVariant />
            </SideModal>
        )

    if (upsertVariant.type === "edit")
        return (
            <SideModal
                sideType={SIDE_MODAL_TYPE.PRODUCT_VARIANT_EDIT}
                title="Actualizar  variante"
                description={desc}
            >
                <EditVariant variantId={upsertVariant.variantId} />
            </SideModal>
        )

    return null;
}

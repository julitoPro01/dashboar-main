"use client"
import { SideModal } from "@/src/shared/components/modal";
import { SIDE_MODAL_TYPE } from "@/src/store/uiSlice";
import { VariantForm } from "../../shared/components/variant-form";
import { useStore } from "@/src/store/useStore";

export const UpsertVariantSideModal = () => {

    const upsertVariant = useStore(v => v.variantUpsert);

    if (!upsertVariant) return;

    if(upsertVariant.type==="create")
        return <CreateVariant />

    if(upsertVariant.type==="edit")
       return <EditVariant variantId={upsertVariant.variantId} />

    return null;
}


const CreateVariant = ({}) => {


    return (
        <SideModal
            sideType={SIDE_MODAL_TYPE.PRODUCT_VARIANT_CREATE}
            title="Agregar  variante"
            description="Producto base: Camiseta básica (SKU...)"
        >
            <VariantForm />
        </SideModal>
    )
}


const EditVariant = ({ variantId }: { variantId: number }) => {

    return (
        <SideModal
            sideType={SIDE_MODAL_TYPE.PRODUCT_VARIANT_EDIT}
            title="Actualizar  variante"
            description="Producto base: Camiseta básica (SKU...)"
        >
            <VariantForm isEdit variantId={variantId} />
        </SideModal>
    )
}
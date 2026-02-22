
"use client";

import { useStore } from "@/src/store/useStore";
import { useForm } from "react-hook-form";
import { UpsertVariantForm } from "../../type/upsertVariantForm.type";

import { VariantForm } from "./create-variant/VariantForm";
import { VariantFormProvider } from "./create-variant/VariantFormProvider";
import { addVariant } from "@/src/action";
import { generateVariantSku } from "../../utils";
import { useRouter } from "next/navigation";
import { AttributeDetailsResponse } from "@/src/interfaces/attribute";
import { DynamicModal } from "@/src/components/modal";
import { ToastError, ToastSuccess } from "@/src/components/ui";

interface Props {
    variantStatuses: [];
    attributes: AttributeDetailsResponse[];
    totalItems: number;
    productId: number;
    user: { name: string; id: number }
}


export const CreateVariant = ({ variantStatuses, attributes, totalItems, productId, user }: Props) => {

    const router = useRouter();

    const modalOpen = useStore(v => v.isUpsertVariantModalOpen);
    const setModal = useStore(v => v.setUpsertVariantModalOpen);
    const variant = useStore(v => v.variant);

    const form = useForm<UpsertVariantForm>({
        defaultValues:
            variant ? {
                recordStatusId: 1, //TODO:
                stockQuantity: variant.stockQuantity,
                price: variant.price,
                discount: variant.discount,
                tags: variant.tags,
                images: [], // TODO: ----
                attributes: variant.attributesDetails.map(v => ({
                    categoryAttributeId: v.categoryAttributeId,
                    isFilter: v.isFilter,
                    isRequired: v.isRequired,
                    displayOrder: v.displayOrder,
                    dataType: v.dataType,
                    key: v.key,
                    keyId: v.keyId,
                    value: v.value,
                    valueId: v.valueId
                }))
            } : { attributes }
    });

    const onSubmit = async (state: UpsertVariantForm) => {

        // TODO: validar variants
        let displayOrder: number;
        let isMainVariant: boolean;

        if (totalItems > 0) {
            displayOrder = totalItems + 1;
            isMainVariant = false;
        }
        else {
            displayOrder = 1;
            isMainVariant = true
        }

        const res = await addVariant(
            {
                productId,
                recordStatusId: state.recordStatusId,
                sku: generateVariantSku(state.attributes),
                stockQuantity: state.stockQuantity,
                price: state.price,
                discount: state.discount,
                isMainVariant,
                displayOrder,
                tags: state.tags
            },
            state.attributes.map(v => ({ attributeDefinitionId: v.keyId, value: v.value ?? "" })),
            [],
            { createdBy: user.name, createdById: user.id }
        );

        if(res.ok){
            toastSuccess();
            setModal({type:"create",modalOpen:false});
            router.refresh();
            setTimeout(()=>form.reset(),1000);
        }else{
            toastError()
        }

    }

    return (

        <DynamicModal
            title={modalOpen.id ? "Actualizar variante" : "Agregar nueva variante"}
            onCloseModal={() => setModal({ modalOpen: false, type: "create" })}
            modalOpen={modalOpen.modalOpen}>

            <VariantFormProvider onSubmit={onSubmit} form={form} >
                <VariantForm variantStatuses={variantStatuses} />
            </VariantFormProvider>

        </DynamicModal>
    )
}


const toastSuccess = () => ToastSuccess({
    title: "Variante creada",
    activeBtnClose: true
}, { duration: 5000 });

const toastError = () => ToastError({
    title: "Error al crear variante",
    description: "No se pudo registrar.",
    activeBtnClose: true

}, { duration: 5000 });

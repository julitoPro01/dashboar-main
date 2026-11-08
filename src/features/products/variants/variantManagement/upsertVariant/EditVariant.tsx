"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { variantFormSchema, VariantForm as VForm } from "../../../types";
import { useUpdateVariant, useVariantFormQuery } from "../../../shared/hooks";
import { VariantForm } from "../../../shared/components/variant-form";
import { mapSystemAttributesToDb } from "../../../shared/helpers";
import { useStore } from "@/src/store/useStore";
import { getDirtyValues } from "@/src/shared/utils";
import { hasSomeValues } from "@/src/shared/utils/getHasValues";

interface Props {
    variantId: number;
}

export const EditVariant = ({ variantId }: Props) => {
    const router = useRouter();
    const product = useStore((state) => state.variantBaseProduct);

    const { data, isLoading } = useVariantFormQuery(variantId);
    const { mutateAsync } = useUpdateVariant();

    const form = useForm<VForm>({
        resolver: zodResolver(variantFormSchema),
        mode: "onChange",
    });

    const handleSubmit = async (values: VForm) => {
        if (!data?.ok || !product) return;

        const dirty = getDirtyValues(data.data, values);

        if (!hasSomeValues(dirty)) return;

        const result = await mutateAsync({
            id: variantId,
            productId: product.id,

            recordStatusId: dirty.operationStatus?.recordStatusId,
            inventoryPolicy: dirty.operationStatus?.inventoryPolicy?.type ?? values.operationStatus.inventoryPolicy.type,
            saleStatus: dirty.operationStatus?.saleStatus,

            stockQuantity: dirty.operationStatus?.inventoryPolicy?.stockQuantity,
            minStock: dirty.operationStatus?.inventoryPolicy?.minStock,
            discountStartsAt: dirty.commercialInfo?.discountStartsAt,
            discountEndsAt: dirty.commercialInfo?.discountEndsAt,

            price: dirty.commercialInfo?.basePrice,
            discount: dirty.commercialInfo?.discount,

            images: dirty.images,

            systemAttributes: mapSystemAttributesToDb(values.categorization?.systemAttributes),

            distributionChannels: dirty.distributionChannels,

        });
        if (result.ok)
             router.refresh();
    };

    //Inicializamos
    useEffect(() => {
        if (data?.ok) form.reset(data.data);
    }, [data, form]);

    return (
        
        <VariantForm
            form={form}
            onSubmit={handleSubmit}
            submitLabel="Guardar cambios"
            isEdit
            isLoading={isLoading}
        />
    );
};

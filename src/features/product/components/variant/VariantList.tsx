"use client";

import { VariantListLayout } from "./VariantListLayout";
import { useFieldArray, useForm } from "react-hook-form";
import { useSortableFieldArray } from "@/src/hooks";

import { VariantCard } from "./variants-list/VariantCard";
import { SortableItem } from "./variants-list/SortableItem";
import { useEffect } from "react";
import { VariantDetailsResponse } from "@/src/interfaces/products";
import { Sorteable } from "@/src/components/ui";

interface Props {
    variants: VariantDetailsResponse[];
}

export const VariantList = ({ variants }: Props) => {


    const { control, setValue, getValues } = useForm<InitForm>();
    const { fields, move, update } = useFieldArray({ control, name: "variants", keyName: "customId" });

    const { dragEnd } = useSortableFieldArray({ fields, move });

    // Asignamos solo una imagen como principal
    const onSelectPrimaryChange = (index: number) => {
        const variants = getValues("variants")
        setValue("variants", variants.map((variant, i) => ({
            ...variant,
            isMainVariant: i === index
        })), { shouldDirty: true })

    }



    const handleDragEnd = (event: any) => {
        dragEnd(event, ({ minIndex, maxIndex }) => {

            // Actualizar solo los órdenes afectados
            const reorderedFields = getValues("variants");

            // Solo actualizar los elementos en el rango afectado
            for (let i = minIndex; i <= maxIndex; i++) {
                update(i, { ...reorderedFields[i], displayOrder: i + 1 });
            }
        })
    }

    useEffect(() => {

        setValue("variants", variants)

    }, [variants])


    return (
        <>
            <VariantListLayout hasVariants={fields.length > 0}>
                <Sorteable handleDragEnd={handleDragEnd} items={fields.map(v => v.customId)} vertical={true} >
                    {
                        fields.map((v, i) => (
                            <SortableItem key={v.id} id={v.customId} >
                                <VariantCard
                                    variant={v}
                                    index={i}
                                    onSelectPrimaryChange={() => onSelectPrimaryChange(i)}
                                    isMainVariant={v.isMainVariant}
                                />
                            </SortableItem>
                        ))
                    }
                </Sorteable>
            </VariantListLayout>

        </>
    )
}


export interface InitForm {
    variants: VariantDetailsResponse[]
}
"use client"

import { CatalogRules } from "./CatalogoRules"
import { CommercialInfo } from "./CommercialInfo"
import { OperationalStatus } from "./OperationStatus"
import { SystemProperties } from "./SystemProperties"
import { FormActions } from "./FormActions"
import { ImageGallery } from "./ImageGallery"
import { FormProvider } from "@/src/shared/form"
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form"
import { DistributionChannel } from "./DistributionChannel"
import { Overlay } from "@/src/shared/components/floating"
import { useIsFetching } from "@tanstack/react-query"

interface Props<T extends FieldValues> {
    form: UseFormReturn<T>;
    onSubmit: SubmitHandler<T>;
    submitLabel?: string;
    isEdit?:boolean;
    isLoading?:boolean
}

export const VariantForm = <T extends FieldValues>({ form, isEdit, onSubmit, submitLabel, isLoading }: Props<T>) => {


    return (


        <FormProvider form={form} onSubmit={onSubmit} className=" relative">

            <Overlay open={isLoading ?? false} description="Cargando datos..." clickable={false} />

            <div className="py-4 px-6 space-y-6 text-sm">

                {/* 01 */}
                <SystemProperties />

                <div className="border-b border-border-subtle"></div>
                {/* 02 */}
                <CommercialInfo />
                <div className="border-b border-border-subtle"></div>
                {/* 03 */}
                <ImageGallery />
                <div className="border-b border-border-subtle"></div>
                {/* 04 */}
                <DistributionChannel isEdit={isEdit} />
                <div className="border-b border-border-subtle"></div>
                {/* 05 */}
                <OperationalStatus isEdit={isEdit} />
                <div className="border-b border-border-subtle"></div>
                {/* 06 */}

            </div>

            <FormActions submitLabel={submitLabel}
             isEdit={isEdit}
             />
        </FormProvider>
    )
}

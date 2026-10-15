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

interface Props<T extends FieldValues> {
    form: UseFormReturn<T>;
    onSubmit: SubmitHandler<T>;
}

export const VariantForm = <T extends FieldValues>({ form, onSubmit }: Props<T>) => {

    return (


        <FormProvider form={form} onSubmit={onSubmit}>

            <div className="py-4 px-6 space-y-6 text-sm">

                {/* 01 */}
                {/* {
                    props.isEdit
                        ? <SystemProperties />
                        : <SystemProperties />
                } */}
                <SystemProperties />

                <div className="border-b border-border-subtle"></div>
                {/* 02 */}
                <CommercialInfo />
                <div className="border-b border-border-subtle"></div>
                {/* 03 */}
                <ImageGallery />
                <div className="border-b border-border-subtle"></div>
                {/* 04 */}
                <DistributionChannel />
                <div className="border-b border-border-subtle"></div>
                {/* 05 */}
                <OperationalStatus />
                <div className="border-b border-border-subtle"></div>
                {/* 06 */}
                <CatalogRules />
                {/* 07 */}

            </div>

            <FormActions />
        </FormProvider>
    )
}

"use client"
import { CatalogRules } from "./CatalogoRules"
import { CommercialInfo } from "./CommercialInfo"
import { Inventory } from "./Inventory"
import { OperationalStatus } from "./OperationStatus"
import { Properties } from "./Properties"
import { FormActions } from "./FormActions"
import { ImageGallery } from "./ImageGallery"
import { FormProvider } from "@/src/shared/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { variantFormSchema } from "../../../types"
import { useStore } from "@/src/store/useStore"

type Props = { isEdit?: false } | { isEdit: true, variantId: number }

export const VariantForm = (props: Props) => {

    const { category } = useStore(v => v.variantBaseProduct)!;

    const form = useForm({
        resolver: zodResolver(variantFormSchema),
        defaultValues: {
            categorization: { category }
        }
    });

    const handleSubmit = () => {

    }

    return (


        <FormProvider form={form} onSubmit={handleSubmit}>

            <div className="py-4 px-6 space-y-6 text-sm">

                {/* 01 */}
                {
                    props.isEdit
                        ? <Properties isEdit id={props.variantId} />
                        : <Properties />
                }

                <div className="border-b border-border-subtle"></div>
                {/* 02 */}
                <CommercialInfo />
                <div className="border-b border-border-subtle"></div>
                {/* 03 */}
                <Inventory />
                <div className="border-b border-border-subtle"></div>
                {/* 04 */}
                <ImageGallery />
                <div className="border-b border-border-subtle"></div>
                {/* 05 */}
                <OperationalStatus />
                <div className="border-b border-border-subtle"></div>
                {/* 06 */}
                <CatalogRules />

            </div>

            <FormActions />
        </FormProvider>
    )
}

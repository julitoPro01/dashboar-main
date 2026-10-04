"use client"
import { CatalogRules } from "./CatalogoRules"
import { CommercialInfo } from "./CommercialInfo"
import { Inventory } from "./Inventory"
import { OperationalStatus } from "./OperationStatus"
import { SystemProperties } from "./SystemProperties"
import { FormActions } from "./FormActions"
import { ImageGallery } from "./ImageGallery"
import { FormProvider } from "@/src/shared/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { variantFormSchema } from "../../../types"
import { useStore } from "@/src/store/useStore"
import { useSystemAttributes } from "../../hooks"

type Props =
    { isEdit?: false }
    | { isEdit: true, variantId: number }

export const VariantForm = (props: Props) => {

    const { category } = useStore(v => v.variantBaseProduct)!;

    const variantId = props.isEdit ? props.variantId : undefined
    const { getAttributes } = useSystemAttributes({ categoryId: category.id, entity: "variant", id: variantId });

    const form = useForm({
        resolver: zodResolver(variantFormSchema),
        mode: "onChange",
        defaultValues: async () => {

            const data = await getAttributes();

            const mapped = data.map(v => ({
                group: v.group,
                attributes: v.attributes.map(v => ({
                    attributeDefinitionId: v.attributeDefinitionId,
                    dataType: v.dataType,
                    name: v.name,
                    systemAttributeValues: v.systemAttributeValues,

                    valueText: v.valueText,
                    valueNumber: v.valueNumber,
                    valueBoolean: v.valueBoolean,
                    valueDate: v.valueDate,
                    valueOptionIds: v.valueOptionIds,

                    isRequired: v.isRequired
                }))
            }))

            return {
                categorization: {
                    category,
                    systemAttributes: mapped
                },
                commercialInfo: undefined,
                inventory: undefined,
                images: []
            }
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
                        ? <SystemProperties />
                        : <SystemProperties />
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
